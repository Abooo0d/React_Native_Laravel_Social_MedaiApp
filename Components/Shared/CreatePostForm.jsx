import { FontAwesome6 } from "@expo/vector-icons";

import { useEffect, useState } from "react";
import { Modal, Text, TextInput, View } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import axiosClient from "../../Axios/AxiosClient";
import { useMainContext } from "../../Contexts/MainContext";
import { usePostContext } from "../../Contexts/PostContext";
import { useUserContext } from "../../Contexts/UserContext";
import PrimaryButton from "../Tools/PrimaryButton";
import SecondaryButton from "../Tools/SecondaryButton";
import CreatePostPostAttachments from "./CreatePostPostAttachments";

import PostPreview from "./PostPreview";
const CreatePostForm = ({ showForm, setShowForm, groupId = "", refetch }) => {
  const { setImageIndex, setShowImage } = usePostContext();
  const [showPost, setShowPost] = useState(false);
  const [attachmentsErrors, setAttachmentsErrors] = useState([]);
  const [loadingAi, setLoadingAi] = useState(false);
  const { user } = useUserContext();
  const [chosenFiles, setChosenFiles] = useState([]);
  const { setErrors, setSuccessMessage } = useMainContext();
  const [post, setLocalPost] = useState({
    body: "",
    attachments: [],
    user_id: user.id,
    group_id: groupId || "",
  });

  function close() {
    setShowForm(false);
  }

  const pickImage = () => {
    launchImageLibrary(
      { mediaType: "photo", selectionLimit: 5 },
      (response) => {
        if (response.didCancel) return;
        else if (response.errorCode) return;
        else {
          let files = response.assets;
          const updatedFiles = [...files].map((file) => {
            return { file: file, url: file.uri };
          });
          setChosenFiles((prev) => [...prev, ...updatedFiles]);
        }
      },
    );
  };

  const handleOpenCamera = () => {
    launchCamera(
      {
        mediaType: "photo",
        saveToPhotos: true,
      },
      (response) => {
        if (response.didCancel) return;
        else if (response.errorCode) return;
        else {
          setSelectedImage(response.assets[0]);
        }
      },
    );
  };

  const handelSubmit = () => {
    try {
      if (post.body.trim() !== "" || post.attachments.length !== 0) {
        const formData = new FormData();
        formData.append("body", post.body);
        formData.append("user_id", post.user_id);
        formData.append("group_id", post.group_id);
        // const finalFiles = chosenFiles.map((file) => {
        //   return file.file;
        // });
        // finalFiles.forEach((file) => {
        //   formData.append("attachments[]", file);
        // });
        axiosClient
          .post("/post", {
            user_id: user.id,
            group_id: post.group_id,
            body: post.body,
          })
          .then((data) => {
            setShowForm(false);
            refetch();
            setSuccessMessage(data?.data?.success);
          })
          .catch((err) => {
            setShowForm(false);
            console.log(err);
            setErrors([
              err?.response?.data?.message || "Some Thing Went Wrong",
            ]);
            setAttachmentsErrors([]);
            for (const key in e) {
              setAttachmentsErrors((prevErrors) => [
                ...prevErrors,
                {
                  index: key.split(".")[1],
                  message: e[key],
                },
              ]);
            }
          });
      }
    } catch (error) {
      setShowForm(false);
    }
  };

  const onDelete = (attachment, index, update) => {
    try {
      if (attachment.file) {
        setChosenFiles((prev) =>
          prev.filter((file) => file.file !== attachment.file),
        );
        setAttachmentsErrors((prevErrors) =>
          prevErrors.filter((f) => f.index != index),
        );
      } else {
        setChosenFiles((prev) =>
          prev.map((file) => ({
            ...file,
            isDeleted:
              file == attachment || file.isDeleted == true ? true : false,
          })),
        );
        setAttachmentsErrors((prevErrors) =>
          prevErrors.filter((f) => f.index != index),
        );
      }
    } catch (error) {
      setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
    }
  };

  const aiPost = () => {
    if (post.body == "") return;
    setLoadingAi(true);
    try {
      axiosClient
        .post("/post/aiPost/post", {
          message: post.body,
        })
        .then(({ data }) => {
          setLocalPost({ ...post, body: data.message });
          setLoadingAi(false);
        })
        .catch((error) => {
          setErrors([
            error?.response?.data?.message || "Some Thing Went Wrong",
          ]);
          setLoadingAi(false);
        });
    } catch (error) {
      setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
      setLoadingAi(false);
    }
  };

  useEffect(() => {
    setLocalPost({
      body: "",
      attachments: [],
      user_id: user.id,
      group_id: groupId,
    });
    setChosenFiles([]);
    setAttachmentsErrors([]);
  }, [showForm]);

  useEffect(() => {
    setLocalPost((prevPost) => {
      return {
        ...prevPost,
        attachments: chosenFiles,
      };
    });
  }, [chosenFiles]);

  return (
    <>
      <Modal
        visible={showForm}
        animationType="slide"
        transparent={false}
        navigationBarTranslucent={true}
        statusBarTranslucent={true}
        backdropColor={"#111827"}
      >
        <View
          className={`flex relative my-auto min-h-[100vh] max-h-[100vh]  min-w-[100vw] z-10 justify-start p-4 items-start overflow-hidden gap-4 bg-gray-900`}
        >
          <View className="flex flex-row justify-between items-center w-full">
            <View className="text-base/7 font-medium text-white">
              <Text className="text-base/7 font-medium text-white">
                Create Post
              </Text>
            </View>
            <SecondaryButton
              event={() => {
                close();
              }}
              classes={" py-1.5 px-3 z-[100]"}
            >
              <Text className="text-gray-400 ">
                <FontAwesome6 name="xmark" size={24} />
              </Text>
            </SecondaryButton>
          </View>
          <View className="max-h-[300px] h-full overflow-auto w-full">
            <View className="relative w-full h-full max-h-[400px]">
              <TextInput
                placeholder="Your comment"
                className="bg-gray-900 flex-1 w-full placeholder:text-gray-500 text-gray-300 px-4 text-2xl rounded-md resize-none min-h-[300px] "
                value={post.body}
                multiline
                textAlignVertical="top"
                onChangeText={(text) =>
                  setLocalPost((prev) => ({
                    ...prev,
                    body: text,
                  }))
                }
              />
            </View>
          </View>
          <CreatePostPostAttachments
            attachmentsErrors={attachmentsErrors}
            onDelete={onDelete}
            pickImage={pickImage}
            post={post}
            setShowPost={setShowPost}
          />
          <View className="mt-4 gap-2 flex flex-row justify-end items-center w-full">
            {post.attachments?.length > 0 && (
              <SecondaryButton
                classes="flex justify-center items-center text-gray-400 py-1.5 px-3"
                event={pickImage}
              >
                <Text className="text-lg text-gray-300">Add Images</Text>
              </SecondaryButton>
            )}
            <SecondaryButton
              classes="flex justify-center items-center text-gray-400 py-1.5 px-3"
              event={aiPost}
              processing={loadingAi}
            >
              <Text className="text-lg text-gray-300">Post From AI</Text>
            </SecondaryButton>
            <PrimaryButton
              classes={"py-1.5 px-3"}
              event={() => {
                handelSubmit();
              }}
            >
              <Text className="text-lg text-gray-300">Submit</Text>
            </PrimaryButton>
          </View>
        </View>
      </Modal>
      <PostPreview
        show={showPost}
        user={user}
        post={post}
        update={false}
        attachmentsErrors={attachmentsErrors}
        onDelete={onDelete}
        setShow={setShowPost}
        setShowImage={setShowImage}
        setImageIndex={setImageIndex}
      />
      {/* <ImageFullView
        image={image}
        show={showImage}
        imageIndex={imageIndex}
        post={post}
        setShowImage={setShowImage}
        setImageIndex={setImageIndex}
        update={false}
      /> */}
    </>
  );
};

export default CreatePostForm;
