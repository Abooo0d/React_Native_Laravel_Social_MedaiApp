import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import { Image, Modal, Text, View } from "react-native";
import { usePostContext } from "../../Contexts/PostContext";
import { fullUrl, isImage } from "../../Functions/Functions";
import SecondaryButton from "../Tools/SecondaryButton";
import { useMainContext } from "./../../Contexts/MainContext";
const ImageFullView = ({ update }) => {
  const { showImage, setShowImage, imageIndex, setImageIndex, post } =
    usePostContext();
  const [attachmentId, setAttachmentId] = useState(0);
  const { setSuccessMessage } = useMainContext();
  const next = (index) => {
    if (index < post?.attachments?.length - 1) {
      setImageIndex(index + 1);
      setAttachmentId(post?.attachments[index + 1]);
    } else {
      setImageIndex(0);
      setAttachmentId(post?.attachments[0]);
    }
  };
  const back = (index) => {
    if (index > 0) {
      setImageIndex(index - 1);
      setAttachmentId(post?.attachments[index - 1]);
    } else {
      setImageIndex(post?.attachments?.length - 1);
      setAttachmentId(post?.attachments[post?.attachments?.length - 1]);
    }
  };

  const downloadAttachment = async () => {
    try {
      const attachment = post?.attachments[imageIndex];
      const fileUrl = `http://192.168.1.107:8000/api/post/download/${attachment.id}`;

      const fileUri = FileSystem.documentDirectory + attachment.name;

      const { uri } = await FileSystem.downloadAsync(fileUrl, fileUri);

      // Optional: Share the file or open it
      // if (await Sharing.isAvailableAsync()) {
      //   await Sharing.shareAsync(uri);
      // } else {
      // alert("Download complete. File saved to device.");
      console.log("ABood");

      setSuccessMessage("Download complete. File saved to device.");
      // }
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download file");
    }
  };

  return (
    <Modal visible={showImage} animationType="slide" transparent={true}>
      {/* <View className="w-full h-full px-4 py-4 bg-gray-900 flex justify-start items-start relative"> */}
      <View
        className={`flex relative min-h-[100vh] max-h-[100vh] min-w-[100vw] z-10 justify-center items-center overflow-hidden bg px-40 bg-gray-900`}
      >
        <View className=" h-fit w-full absolute top-0 right-0 flex-1 flex justify-end items-end gap-2 z-[100] px-4 py-4">
          <SecondaryButton
            classes=" py-1.5 px-3 right-0 w-[46px] cursor-default z-10"
            event={() => {
              setShowImage(false);
            }}
          >
            <Text className="text-gray-400">
              <FontAwesome6 name="xmark" size={24} />
            </Text>
          </SecondaryButton>
          <SecondaryButton
            classes=" py-1.5 px-3 right-0 w-[46px] cursor-default z-10"
            event={() => {
              downloadAttachment();
            }}
          >
            <Text className="text-gray-400">
              <FontAwesome name="download" size={24} />
            </Text>
          </SecondaryButton>
          <SecondaryButton
            classes=" py-1.5 px-3 right-0 w-[46px] cursor-default z-10"
            event={() => {}}
          >
            <Text className="text-gray-400">
              {imageIndex ? imageIndex + 1 : 1}
            </Text>
          </SecondaryButton>
        </View>
        <View
          className="relative w-full h-full flex justify-center items-center z-10 min-w-[100vw]"
          style={{
            paddingHorizontal: 20,
            // width: "100%",
          }}
        >
          {post?.attachments && (
            <>
              {isImage(post?.attachments[imageIndex] ?? {}) ? (
                <Image
                  source={{
                    uri: fullUrl(post?.attachments[imageIndex]?.url ?? ""),
                  }}
                  alt="Post Image"
                  className={`w-full h-[400px] object-contain rounded-[10px]`}
                />
              ) : (
                <View
                  className={`w-[400px] h-[400px] rounded-lg cursor-default bg-gray-800 flex justify-center items-center flex-col gap-4  absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] duration-200 `}
                >
                  <Text className="text-gray-500 font-bold text-xl max-w-[80%] break-words text-center">
                    {(post.attachments[imageIndex]?.file ?? "")
                      ? (post.attachments[imageIndex]?.file?.name ?? "")
                      : (post.attachments[imageIndex]?.name ?? "")}
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      </View>
      {/* </View> */}
    </Modal>
  );
};

export default ImageFullView;
