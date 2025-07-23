import { FontAwesome6 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, Text, TextInput, View } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import axiosClient from "../../Axios/AxiosClient";
import { useMainContext } from "../../Contexts/MainContext";
import { usePostContext } from "../../Contexts/PostContext";
import { useUserContext } from "../../Contexts/UserContext";
import Notifications from "../Shared/Notifications";
import PrimaryButton from "../Tools/PrimaryButton";
import SecondaryButton from "../Tools/SecondaryButton";
import CreatePostPostAttachments from "./CreatePostPostAttachments";
const CreatePostForm = ({ showForm, setShowForm, groupId = "", refetch }) => {
  const { setImageIndex, setShowImage } = usePostContext();
  const [showPost, setShowPost] = useState(false);
  const [attachmentsErrors, setAttachmentsErrors] = useState([]);
  const [loadingAi, setLoadingAi] = useState(false);
  const { user } = useUserContext();
  const [chosenFiles, setChosenFiles] = useState([]);
  const { setErrors, setSuccessMessage } = useMainContext();
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      if (post.body.trim() !== "" || post.attachments.length !== 0) {
        const formData = new FormData();
        formData.append("body", post.body);
        formData.append("user_id", post.user_id);
        formData.append("group_id", post.group_id);
        chosenFiles.forEach((item, index) => {
          formData.append("attachments[]", {
            uri: item.file.uri,
            name: item.file.fileName || `file_${index}.jpg`,
            type: item.file.type || "image/jpeg",
          });
        });

        axiosClient
          .post("/post", formData, {
            headers: {
              // 'Authorization': 'Bearer YOUR_TOKEN',
              // 'Accept': 'application/json',
              "Content-Type": "multipart/form-data",
            },
          })
          .then((data) => {
            setShowForm(false);
            refetch();
            setSuccessMessage(data?.data?.success);
            setIsLoading(false);
          })
          .catch((err) => {
            setErrors([
              err?.response?.data?.message || "Some Thing Went Wrong",
            ]);
            setIsLoading(false);
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
      setIsLoading(false);
      setErrors(error);
      console.log(error);
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
          className={`flex relative my-auto min-h-[100vh] max-h-[100vh]  min-w-[100vw] z-10 justify-between p-4 items-start overflow-hidden gap-4 bg-gray-900`}
        >
          <Notifications />
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
          <View className="max-h-[250px] h-full overflow-auto w-full">
            <View className="relative w-full h-full max-h-[400px]">
              <TextInput
                placeholder="Your comment"
                className="bg-gray-900 flex-1 w-full placeholder:text-gray-500 text-gray-300 px-4 text-2xl rounded-md resize-none min-h-[250px] "
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
            setShowPost={setShowPost}
            pickImage={pickImage}
            onDelete={onDelete}
            post={post}
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
            <PrimaryButton
              classes="flex justify-center items-center text-gray-400 py-1.5 px-3"
              event={aiPost}
              processing={loadingAi}
            >
              <Text className="text-lg text-gray-300">AI Post</Text>
            </PrimaryButton>
            <PrimaryButton
              classes={"py-1.5 px-3"}
              event={() => {
                handelSubmit();
              }}
              processing={isLoading}
            >
              <Text className="text-lg text-gray-300">Submit</Text>
            </PrimaryButton>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CreatePostForm;
