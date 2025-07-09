import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { Image, Modal, Text, View } from "react-native";
import { usePostContext } from "../../Contexts/PostContext";
import { fullUrl, isImage } from "../../Functions/Functions";
import SecondaryButton from "../Tools/SecondaryButton";
const ImageFullView = ({ update }) => {
  const { showImage, setShowImage, imageIndex, setImageIndex, post } =
    usePostContext();
  const [attachmentId, setAttachmentId] = useState(0);

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

  return (
    <Modal visible={showImage} animationType="slide" transparent={true}>
      <BlurView
        intensity={20}
        tint="systemChromeMaterialDark"
        blurReductionFactor={5}
        experimentalBlurMethod="dimezisBlurView"
        className={`flex relative min-h-[100vh] max-h-[100vh] min-w-[100vw] z-10 justify-center items-center overflow-hidden bg`}
      >
        <View className=" h-fit w-full absolute top-0 left-0 flex-1 flex justify-end items-end gap-2 z-[100] px-4 py-4">
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
            event={() => {}}
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
        {showImage && (
          <View className="relative w-full h-full flex justify-center items-center z-10">
            {post?.attachments?.map((attachment, index) => (
              <React.Fragment key={index}>
                {isImage(attachment) ? (
                  <Image
                    source={{
                      uri: fullUrl(attachment.url),
                    }}
                    alt="Post Image"
                    className={`max-w-[90%] max-h-[90%] w-[400px] h-[400px] bg-red-500 object-contain rounded-[10px] `}
                  />
                ) : (
                  <View
                    className={`max-w-[90%] max-h-[90%] w-[400px] h-[400px] rounded-lg cursor-default bg-gray-800 flex justify-center items-center flex-col gap-4  absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] duration-200 ${
                      index === imageIndex ? `visible ` : `invisible scale-75`
                    }`}
                  >
                    {/* <FaFile className="w-20 h-20 text-gray-500" /> */}
                    <Text className="text-gray-500 font-bold text-xl max-w-[80%] break-words text-center">
                      {attachment?.file
                        ? attachment?.file?.name
                        : attachment?.name}
                    </Text>
                  </View>
                )}
              </React.Fragment>
            ))}
          </View>
        )}
      </BlurView>
    </Modal>
  );
};

export default ImageFullView;
