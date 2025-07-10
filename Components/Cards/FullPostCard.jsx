import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Image, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { usePostContext } from "../../Contexts/PostContext";
import { fullUrl, isImage } from "../../Functions/Functions";
import PostCardOwnerInfo from "../Shared/PostCardOwnerInfo";
import PostCardPostBody from "../Shared/PostCardPostBody";
import SecondaryButton from "../Tools/SecondaryButton";
const FullPostCard = () => {
  const {
    post,
    showPost,
    setShowPost,
    setImage,
    setShowImage,
    user,
    setImageIndex,
  } = usePostContext();

  return (
    <Modal visible={showPost} animationType="slide" transparent={true}>
      <View className="w-full h-full px-4 py-4 bg-gray-900 flex justify-start items-start relative">
        <SecondaryButton
          event={() => {
            setShowPost(false);
          }}
          classes="px-2 py-2 absolute top-[20px] right-[20px]"
        >
          <Text className="text-gray-400">
            <FontAwesome6 name="xmark" size={24} />
          </Text>
        </SecondaryButton>
        <View className="flex flex-1 justify-between items-center w-full">
          <PostCardOwnerInfo post={post} user={user} />
        </View>
        {post.body && <PostCardPostBody post={post} />}
        <ScrollView
          className=" my-4 rounded-lg w-full h-[80%] bg-gray-900 "
          // style={{}}
          contentContainerStyle={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          {post?.attachments?.map((attachment, index) => (
            <React.Fragment key={index}>
              {isImage(attachment) ? (
                <Pressable
                  onPress={() => {
                    setShowImage(true);
                    setImageIndex(0);
                    setPost(post);
                  }}
                  className="w-full flex-1"
                  style={{ height: 300 }}
                >
                  <Image
                    source={{
                      uri: fullUrl(attachment.url),
                    }}
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                  />
                </Pressable>
              ) : (
                <View
                  className="w-full flex-1 h-full object-cover rounded-lg cursor-pointer bg-gray-800 flex justify-center items-center flex-col gap-4"
                  onPress={() => {
                    setShowImage(true);
                    setPost(post);
                    setImageIndex(0);
                  }}
                >
                  <FontAwesome name="file" size={24} color="black" />
                  {/* <FaFile className="w-20 h-20 text-gray-500" /> */}
                  <Text className="text-gray-500 font-bold text-xl max-w-[80%] break-words text-center">
                    {attachment?.name}
                  </Text>
                </View>
              )}
            </React.Fragment>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default FullPostCard;
