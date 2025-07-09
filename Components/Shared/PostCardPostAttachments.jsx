import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { usePostContext } from "../../Contexts/PostContext.jsx";
import { fullUrl, isImage } from "../../Functions/Functions.js";
const PostCardPostAttachments = ({ post }) => {
  const {
    setImage,
    setShowImage,
    showImage,
    setShowPost,
    setImageIndex,
    setPost,
  } = usePostContext();

  return (
    <>
      {post.attachments && post.attachments.length > 0 && (
        <>
          <View
            className={`w-full min-h-[200px] max-h-[350px] overflow-hidden grid gap-3 mt-2 
      ${
        post.attachments.length === 1
          ? ` grid-cols-1`
          : post.attachments.length >= 2
            ? ` grid-cols-2`
            : ""
      }
      `}
          >
            {post.attachments.length > 2 ? (
              <>
                {post.attachments.map((attachment, index) => (
                  <React.Fragment key={index}>
                    {index === 0 ? (
                      <>
                        {isImage(attachment) ? (
                          <Pressable
                            onPress={() => {
                              setImage(attachment.url);
                              setShowImage(true);
                              setImageIndex(index);
                              setPost(post);
                            }}
                          >
                            <Image
                              source={{
                                uri: fullUrl(attachment.url),
                              }}
                              className="w-full h-full max-h-[350px] object-cover rounded-lg cursor-pointer"
                            />
                          </Pressable>
                        ) : (
                          <View
                            className="w-full min-h-[200px] h-full max-h-[400px] object-cover rounded-lg cursor-pointer bg-gray-800 flex justify-center items-center flex-col gap-4"
                            onPress={() => {
                              setImage("");
                              setShowImage(true);
                              setPost(post);
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
                      </>
                    ) : (
                      index === 1 && (
                        <>
                          {isImage(attachment) ? (
                            <View
                              className="relative w-full h-full"
                              key={index}
                            >
                              <Pressable
                                onPress={() => {
                                  setImage(attachment.url);
                                  setShowImage(true);
                                  setPost(post);
                                  setImageIndex(index);
                                }}
                              >
                                <Image
                                  source={{
                                    uri: fullUrl(attachment.url),
                                  }}
                                  className="w-full h-full max-h-[350px] object-cover rounded-lg cursor-pointer"
                                />
                              </Pressable>
                              <View
                                className="absolute top-0 left-0 w-full h-full bg-gray-800/50 backdrop-blur-sm flex justify-center items-center rounded-lg cursor-pointer z-[1] group"
                                onPress={() => {
                                  setShowPost(true);
                                  setPost(post);
                                }}
                                key={index}
                              >
                                <View className="text-3xl text-gray-200 rounded-full border-[1px] border-solid border-gray-200/50 p-2 h-[60px] w-[60px] flex justify-center items-center group-hover:bg-gray-800/20 duration-200 group-hover:scale-105">
                                  <Text> +{post.attachments.length - 2}</Text>
                                </View>
                              </View>
                            </View>
                          ) : (
                            <View
                              className="w-full min-h-[200px] h-full max-h-[400px] object-cover rounded-lg cursor-pointer bg-gray-800 flex justify-center items-center flex-col gap-4"
                              onPress={() => {
                                setImage("");
                                setShowImage(true);
                                setImageIndex(index);
                              }}
                            >
                              <FaFile className="w-20 h-20 text-gray-500" />
                              <Text className="text-gray-500 font-bold text-xl max-w-[80%] break-words text-center">
                                {attachment?.name}
                              </Text>
                            </View>
                          )}
                        </>
                      )
                    )}
                  </React.Fragment>
                ))}
              </>
            ) : (
              <>
                {post.attachments.map((attachment, index) => (
                  <React.Fragment key={index}>
                    {isImage(attachment) ? (
                      <Pressable
                        onPress={() => {
                          setImage(attachment.url);
                          setShowImage(true);
                          setPost(post);
                          setImageIndex(index);
                        }}
                      >
                        <Image
                          source={{
                            uri: fullUrl(attachment.url),
                          }}
                          className="w-full h-full max-h-[350px] object-cover rounded-lg cursor-pointer"
                        />
                      </Pressable>
                    ) : (
                      <View
                        className="w-full min-h-[200px] h-full max-h-[400px] object-cover rounded-lg cursor-pointer bg-gray-800 flex justify-center items-center flex-col gap-4"
                        onPress={() => {
                          setImage("");
                          setShowImage(true);
                          setPost(post);
                          setImageIndex(index);
                        }}
                      >
                        <FaFile className="w-20 h-20 text-gray-500" />
                        <Text className="text-gray-500 font-bold text-xl max-w-[80%] break-words text-center">
                          {attachment?.name}
                        </Text>
                      </View>
                    )}
                  </React.Fragment>
                ))}
              </>
            )}
          </View>
        </>
      )}
    </>
  );
};

export default PostCardPostAttachments;
