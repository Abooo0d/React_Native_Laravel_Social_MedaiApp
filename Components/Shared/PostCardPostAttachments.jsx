import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image, Pressable, Text, View } from "react-native";
import { usePostContext } from "../../Contexts/PostContext.jsx";
import { isImage } from "../../Functions/Functions.js";
const PostCardPostAttachments = ({ post }) => {
  const {
    setShowImageFullView,
    setShowFullPostCard,
    setImageIndex,
    setPost,
    setCreate,
    setUpdate,
  } = usePostContext();

  return (
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
                        setShowImageFullView(true);
                        setShowFullPostCard(false);
                        setImageIndex(0);
                        setPost(post);
                        setCreate(false);
                        setUpdate(false);
                      }}
                      className="w-[50%] flex-1 h-full"
                    >
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
                        setShowImageFullView(true);
                        setShowFullPostCard(false);
                        setImageIndex(0);
                        setPost(post);
                        setCreate(false);
                        setUpdate(false);
                      }}
                    >
                      <FontAwesome name="file" size={24} color="black" />
                      {/* <FaFile className="w-20 h-20 text-gray-500" /> */}
                      <Text className="text-gray-500 font-bold text-xl max-w-[80%] break-words text-center">
                        {post.attachments[0]?.name}
                      </Text>
                    </View>
                  )}
                  {isImage(post.attachments[1]) ? (
                    <Pressable
                      onPress={() => {
                        if (post.attachments.length > 2) {
                          setShowFullPostCard(true);
                          setShowImageFullView(false);
                        } else {
                          setShowImageFullView(true);
                          setShowFullPostCard(false);
                        }
                        setImageIndex(1);
                        setPost(post);
                        setCreate(false);
                      }}
                      className="w-[50%] flex-1 h-full relative"
                    >
                      <Image
                        source={{
                          uri: post.attachments[1].url,
                        }}
                        className=" h-full object-cover rounded-lg cursor-pointer"
                      />
                      {post?.attachments?.length > 2 && (
                        <View
                          intensity={30}
                          tint="dark"
                          blurReductionFactor={10}
                          experimentalBlurMethod="dimezisBlurView"
                          className={`absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-700/50 `}
                        >
                          <View
                            className=" rounded-full border-[1px] border-gray-300 border-solid px-10 flex justify-center items-center"
                            style={{
                              height: 100,
                              width: 100,
                              borderColor: "#d1d5db55",
                              borderWidth: 1,
                            }}
                          >
                            <Text
                              className=" font-bold text-gray-300"
                              style={{
                                fontSize: 35,
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
                      )}
                    </Pressable>
                  ) : (
                    <View
                      className="w-[50%] relative flex-1 h-full object-cover rounded-lg cursor-pointer bg-gray-800 flex justify-center items-center flex-col gap-4"
                      onPress={() => {
                        setShowImageFullView(true);
                        setShowFullPostCard(false);
                        setImageIndex(1);
                        setPost(post);
                        setCreate(false);
                        setUpdate(false);
                      }}
                    >
                      <FontAwesome name="file" size={24} color="black" />
                      {/* <FaFile className="w-20 h-20 text-gray-500" /> */}
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
                      setShowImageFullView(true);
                      setShowFullPostCard(false);
                      setImageIndex(0);
                      setPost(post);
                      setCreate(false);
                      setUpdate(false);
                    }}
                    className="w-full flex-1"
                    style={{ height: 300 }}
                  >
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
                      setShowImageFullView(true);
                      setShowFullPostCard(false);
                      setImageIndex(0);
                      setPost(post);
                      setCreate(false);
                      setUpdate(false);
                    }}
                  >
                    <Text className="text-gray-400">
                      <FontAwesome name="file" size={24} color="black" />
                    </Text>
                    {/* <FaFile className="w-20 h-20 text-gray-500" /> */}
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
  );
};

export default PostCardPostAttachments;
