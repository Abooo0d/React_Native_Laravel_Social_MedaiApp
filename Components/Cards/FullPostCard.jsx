import React from "react";
import { Image, Text, View } from "react-native";
import { usePostContext } from "../../Contexts/PostContext";
import { fullUrl, isImage } from "../../Functions/Functions";
import PopupCard from "../Containers/PopupCard";
import PostCardOwnerInfo from "../Shared/PostCardOwnerInfo";
import PostCardPostBody from "../Shared/PostCardPostBody";
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
    <PopupCard showForm={showPost} setShowForm={setShowPost}>
      <View className="max-h-[650px]">
        <View className="flex flex-1 justify-between items-center">
          <PostCardOwnerInfo post={post} user={user} />
        </View>
        {post.body && <PostCardPostBody post={post} />}
        <View className="max-h-[400px] overflow-auto my-4 rounded-lg">
          {post.attachments && (
            <View className="h-full">
              <View className={`w-full h-full flex gap-3 flex-col`}>
                {post.attachments.map((attachment, index) => (
                  <React.Fragment key={index}>
                    {isImage(attachment) ? (
                      <Image
                        source={{
                          uri: fullUrl(attachment.url),
                        }}
                        className="w-full h-full max-h-[350px] object-cover rounded-lg cursor-pointer"
                        onClick={() => {
                          setImage(attachment.url);
                          setShowImage(true);
                          setImageIndex(index);
                        }}
                      />
                    ) : (
                      <View
                        className="w-full min-h-[200px] h-full max-h-[400px] object-cover rounded-lg cursor-pointer bg-gray-800 flex justify-center items-center flex-col gap-4"
                        onClick={() => {
                          setImage("");
                          setShowImage(true);
                          setImageIndex(index);
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
              </View>
            </View>
          )}
        </View>
      </View>
    </PopupCard>
  );
};

export default FullPostCard;
