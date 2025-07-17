import { Entypo, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { isImage } from "../../Functions/Functions";

const CreatePostPostAttachments = ({
  pickImage,
  post,
  attachmentsErrors,
  onDelete,
  setShowImage,
  setShowPost,
  setImageIndex,
  setPost,
}) => {
  return (
    <Pressable
      className="w-full h-full flex-1 flex justify-center items-center"
      onPress={() => {
        pickImage();
      }}
    >
      {post?.attachments?.length > 0 ? (
        <>
          {post.attachments && post.attachments.length > 0 && (
            <>
              <View
                className={`w-full min-h-[300px] max-h-[350px] overflow-hidden flex gap-3 mt-2`}
                style={{ height: 300 }}
              >
                {post.attachments.length >= 2 ? (
                  <>
                    <View className="w-full h-full flex flex-row flex-wrap justify-between gap-4">
                      {isImage(post.attachments[0]) ? (
                        <Pressable
                          onPress={() => {
                            setShowImage(true);
                            setImageIndex(0);
                            setPost(post);
                          }}
                          className="w-[50%] flex-1 h-full relative"
                        >
                          <TouchableOpacity
                            className="absolute w-[20px] h-[20px] top-[10px] right-[10px] z-10 bg-gray-800/50 border-gray-600/40 border-[1px] border-solid flex justify-center items-center rounded-md"
                            onPress={() => {
                              onDelete(post.attachments[0], 0);
                            }}
                          >
                            <Text className="text-gray-400">
                              <FontAwesome6 name="xmark" size={18} />
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity className="absolute w-[20px] h-[20px] top-[10px] right-[35px] z-10 bg-gray-800/50 border-gray-600/40 border-[1px] border-solid flex justify-center items-center rounded-md">
                            <Text className="text-gray-400">1</Text>
                          </TouchableOpacity>
                          <Image
                            source={{
                              uri: post.attachments[0].url,
                            }}
                            className=" h-full object-cover rounded-lg cursor-pointer"
                          />
                        </Pressable>
                      ) : (
                        <View
                          className=" flex-1 h-full object-cover rounded-lg cursor-pointer bg-gray-800 flex justify-center items-center flex-col gap-4"
                          onPress={() => {
                            setShowImage(true);
                            setPost(post);
                            setImageIndex(0);
                          }}
                        >
                          <FontAwesome name="file" size={24} color="black" />
                          <Text className="text-gray-500 font-bold text-xl max-w-[80%] break-words text-center">
                            {post.attachments[0]?.name}
                          </Text>
                        </View>
                      )}
                      {isImage(post.attachments[1]) ? (
                        <Pressable
                          onPress={() => {
                            if (post.attachments.length > 2) setShowPost(true);
                            else setShowImage(true);
                            setImageIndex(1);
                            setPost(post);
                          }}
                          className="w-[50%] flex-1 h-full relative overflow-hidden"
                        >
                          <Image
                            source={{
                              uri: post.attachments[1].url,
                            }}
                            className=" h-full object-cover rounded-lg cursor-pointer"
                          />
                          {post?.attachments?.length > 2 ? (
                            <View className="w-full h-full absolute top-0 left-0 bg-gray-800/90 rounded-lg">
                              <View
                                className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full border-[1px] border-gray-400 border-solid px-10 flex justify-center items-center"
                                style={{
                                  height: 100,
                                  width: 100,
                                  borderColor: "white",
                                  borderWidth: 1,
                                }}
                              >
                                <Text
                                  className=" font-bold "
                                  style={{
                                    fontSize: 35,
                                    color: "white",
                                    height: 100,
                                    width: 100,
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  +{post.attachments.length - 2}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <>
                              <TouchableOpacity
                                className="absolute w-[20px] h-[20px] top-[10px] right-[10px] z-10 bg-gray-800/50 border-gray-600/40 border-[1px] border-solid flex justify-center items-center rounded-md"
                                onPress={() => {
                                  onDelete(post.attachments[1], 1);
                                }}
                              >
                                <Text className="text-gray-400">
                                  <FontAwesome6 name="xmark" size={18} />
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity className="absolute w-[20px] h-[20px] top-[10px] right-[35px] z-10 bg-gray-800/50 border-gray-600/40 border-[1px] border-solid flex justify-center items-center rounded-md">
                                <Text className="text-gray-400">2</Text>
                              </TouchableOpacity>
                            </>
                          )}
                        </Pressable>
                      ) : (
                        <View
                          className="w-[50%] relative flex-1 h-full object-cover rounded-lg cursor-pointer bg-gray-800 flex justify-center items-center flex-col gap-4"
                          onPress={() => {
                            // setShowImage(true);
                            // setPost(post);
                            // setImageIndex(1);
                          }}
                        >
                          <FontAwesome name="file" size={24} color="black" />
                          <Text className="text-gray-500 font-bold text-xl max-w-[80%] break-words text-center">
                            {post.attachments[1]?.name}
                          </Text>
                          <BlurView
                            intensity={30}
                            tint="dark"
                            blurReductionFactor={10}
                            experimentalBlurMethod="dimezisBlurView"
                            className={`absolute top-0 left-0 w-full h-full flex justify-center items-center `}
                          >
                            <View
                              className=" rounded-full border-[1px] border-gray-400 border-solid px-10 flex justify-center items-center"
                              style={{
                                height: 100,
                                width: 100,
                                borderColor: "#d1d5db55",
                                borderWidth: 1,
                              }}
                            >
                              <Text
                                className=" font-bold"
                                style={{ fontSize: 35, color: "#9ca3af" }}
                              >
                                + {post.attachments.length - 2}
                              </Text>
                            </View>
                          </BlurView>
                        </View>
                      )}
                    </View>
                  </>
                ) : (
                  <>
                    {isImage(post.attachments[0]) ? (
                      <Pressable
                        onPress={() => {
                          setShowImage(true);
                          setImageIndex(0);
                          setPost(post);
                        }}
                        className="w-full flex-1 relative"
                        style={{ height: 300 }}
                      >
                        <TouchableOpacity
                          className="absolute w-[20px] h-[20px] top-[10px] right-[10px] z-10 bg-gray-800/50 border-gray-600/40 border-[1px] border-solid flex justify-center items-center rounded-md"
                          onPress={() => {
                            onDelete(post.attachments[0], 0);
                          }}
                        >
                          <Text className="text-gray-400">
                            <FontAwesome6 name="xmark" size={18} />
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="absolute w-[20px] h-[20px] top-[10px] right-[35px] z-10 bg-gray-800/50 border-gray-600/40 border-[1px] border-solid flex justify-center items-center rounded-md">
                          <Text className="text-gray-400">1</Text>
                        </TouchableOpacity>
                        <Image
                          source={{
                            uri: post.attachments[0].url,
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
                        <Text className="text-gray-500 font-bold text-xl max-w-[80%] break-words text-center">
                          {post.attachments[0]?.name}
                        </Text>
                      </View>
                    )}
                  </>
                )}
              </View>
            </>
          )}
        </>
      ) : (
        <View className="w-full h-full flex-1 flex justify-center items-center bg-homeFeed/20 border-[1px] border-solid border-gray-800/50 rounded-md">
          <Text className="text-gray-600">
            <Entypo name="images" size={80} />
          </Text>
          <Text className="text-gray-600 text-[25px] text-center">
            Click Here To Add Attachments
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default CreatePostPostAttachments;
