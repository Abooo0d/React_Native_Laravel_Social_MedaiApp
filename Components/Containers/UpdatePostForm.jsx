import { FontAwesome6 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, Text, TextInput, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import axiosClient from "../../Axios/AxiosClient";
import { useMainContext } from "../../Contexts/MainContext";
import Notifications from "../Shared/Notifications";
import UpdatePostPostAttachments from "../Shared/UpdatePostPostAttachments";
import PrimaryButton from "../Tools/PrimaryButton";
import SecondaryButton from "../Tools/SecondaryButton";
const UpdatePostForm = ({ post, showForm, setShowForm, refetch }) => {
  const { setSuccessMessage, setErrors } = useMainContext();

  const [loadingAi, setLoadingAi] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [chosenFiles, setChosenFiles] = useState([]);
  const [attachmentsErrors, setAttachmentsErrors] = useState([]);

  const [postData, setPostData] = useState(post);
  const [finalPost, setFinalPost] = useState({
    ...post,
    attachments: [],
    deletedFilesIds: [],
  });

  function close() {
    setShowForm(false);
  }

  const handelSubmit = () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("id", finalPost.id);
      formData.append("body", finalPost.body);
      formData.append("user_id", finalPost.user.id);
      formData.append("group_id", finalPost.group ? finalPost.group.id : "");
      const ids = finalPost.deletedFilesIds;

      ids.forEach((id) => {
        formData.append("deletedFilesIds[]", id);
      });
      const attachments = finalPost.attachments;
      console.log(attachments);

      attachments.forEach((attachment, index) => {
        formData.append("attachments[]", {
          uri: attachment.uri,
          name: attachment.fileName || `file_${index}.jpg`,
          type: attachment.type || "image/jpeg",
        });
      });

      if (finalPost.body !== "" || finalPost.attachments.length !== 0) {
        axiosClient
          .post(`/post/${post.id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((data) => {
            refetch();
            setSuccessMessage("The Post Updated Successfully");
            setShowForm(false);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            setAttachmentsErrors([]);
            for (const key in err) {
              setAttachmentsErrors((prevErrors) => [
                ...prevErrors,
                {
                  index: key.split(".")[1],
                  message: err[key],
                },
              ]);
            }
            setErrors([
              err?.response?.data?.message || "Some Thing Went Wrong",
            ]);
          });
      }
    } catch (error) {
      console.log(error);

      setIsLoading(false);
      console.log(error);
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
          setPostData({ ...post, body: data.message });
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
          for (const f of updatedFiles) {
            setPostData((prev) => ({
              ...prev,
              attachments: [f, ...prev.attachments],
            }));
            setFinalPost((prev) => ({
              ...prev,
              attachments: [f.file, ...prev.attachments],
            }));
          }
        }
      },
    );
  };

  const onDelete = (attachment, index, update) => {
    if (attachment.file) {
      setPostData((prevPost) => ({
        ...prevPost,
        attachments: prevPost.attachments.filter((f) => f !== attachment),
      }));
      if (update) {
        setFinalPost((prevPost) => ({
          ...prevPost,
          attachments: prevPost.attachments.filter(
            (f) => f !== attachment.file,
          ),
        }));
      }
      setAttachmentsErrors((prevErrors) =>
        prevErrors.filter((f) => f.index != index),
      );
    } else {
      setPostData((prevPost) => ({
        ...prevPost,
        attachments: prevPost.attachments.map((f) => ({
          ...f,
          isDeleted: f === attachment || f.isDeleted === true ? true : false,
        })),
      }));
      if (update) {
        setFinalPost((prevPost) => ({
          ...prevPost,
          deletedFilesIds: [...prevPost.deletedFilesIds, attachment.id],
        }));
      }
      setAttachmentsErrors((prevErrors) =>
        prevErrors.filter((f) => f.index != index),
      );
    }
  };

  const undoDelete = (attachment, update) => {
    setPostData((prevPost) => ({
      ...prevPost,
      attachments: prevPost.attachments.map((f) => ({
        ...f,
        isDeleted: f === attachment ? false : f.isDeleted,
      })),
    }));
    if (update) {
      setFinalPost((prevPost) => ({
        ...prevPost,
        deletedFilesIds: [
          ...prevPost.deletedFilesIds.filter((f) => f !== attachment.id),
        ],
      }));
    }
  };

  useEffect(() => {
    setPostData(post);
    setFinalPost({
      ...post,
      attachments: [],
      deletedFilesIds: [],
    });
    setAttachmentsErrors([]);
  }, [showForm]);

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
                Update Post
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
                value={postData?.body}
                multiline
                textAlignVertical="top"
                onChangeText={(text) => {
                  setPostData((prev) => ({ ...prev, body: text }));
                  setFinalPost((prev) => ({ ...prev, body: text }));
                }}
              />
            </View>
          </View>
          <UpdatePostPostAttachments
            attachmentsErrors={attachmentsErrors}
            pickImage={pickImage}
            post={postData}
            onDelete={onDelete}
            undoDelete={undoDelete}
          />
          <View className="mt-4 gap-2 flex flex-row justify-end items-center w-full">
            {post?.attachments?.length > 0 && (
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

export default UpdatePostForm;
