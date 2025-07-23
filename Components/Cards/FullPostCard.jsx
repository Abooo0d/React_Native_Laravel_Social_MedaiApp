import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Image, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { usePostContext } from "../../Contexts/PostContext";
import { isImage } from "../../Functions/Functions";
import PostCardOwnerInfo from "../Shared/PostCardOwnerInfo";
import PostCardPostBody from "../Shared/PostCardPostBody";
import SecondaryButton from "../Tools/SecondaryButton";
const FullPostCard = () => {
  const {
    setPost,
    post,
    setShowFullPostCard,
    showFullPostCard,
    setShowImageFullView,
    setImageIndex,
    setCreate,
    setUpdate,
  } = usePostContext();
  return (
    <>
      <Modal
        visible={showFullPostCard}
        animationType="slide"
        transparent={true}
        navigationBarTranslucent={true}
        statusBarTranslucent={true}
      >
        <View className="w-full h-full px-4 pt-16 py-8 bg-gray-900 flex justify-start items-start relative">
          <View className="flex flex-1 flex-row justify-between items-center w-full">
            <PostCardOwnerInfo post={post} />
            <SecondaryButton
              event={() => {
                setShowFullPostCard(false);
              }}
              classes="px-2 py-2 "
            >
              <Text className="text-gray-400">
                <FontAwesome6 name="xmark" size={24} />
              </Text>
            </SecondaryButton>
          </View>
          {post.body && <PostCardPostBody post={post} />}
          <ScrollView
            className=" my-4 rounded-lg w-full h-[80%] bg-gray-900 "
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
                      setShowImageFullView(true);
                      setImageIndex(index);
                      setPost(post);
                      setCreate(false);
                      setUpdate(false);
                    }}
                    className="w-full flex-1"
                    style={{ height: 300 }}
                  >
                    <Image
                      source={{
                        uri: attachment.url,
                      }}
                      className="w-full h-full object-cover rounded-lg cursor-pointer"
                    />
                  </Pressable>
                ) : (
                  <View
                    className="w-full flex-1 h-full object-cover rounded-lg cursor-pointer bg-gray-800 flex justify-center items-center flex-col gap-4"
                    onPress={() => {
                      setShowImageFullView(true);
                      setPost(post);
                      setImageIndex(index);
                      setCreate(false);
                      setUpdate(false);
                    }}
                  >
                    <FontAwesome name="file" size={24} color="black" />
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
    </>
  );
};

export default FullPostCard;
