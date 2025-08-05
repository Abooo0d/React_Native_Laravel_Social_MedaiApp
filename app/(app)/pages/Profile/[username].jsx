import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import FriendUserCard from "../../../../Components/Cards/FriendUserCard";
import PostCard from "../../../../Components/Cards/PostCard";
import ProfileImageFullView from "../../../../Components/Cards/ProfileImageFullView";
import PostLoader from "../../../../Components/Tools/PostLoader";
import ProfileLoader from "../../../../Components/Tools/ProfileLoader";
import {
  useGetPostsForUser,
  useGetUser,
} from "../../../../TanStackQurey/Querys";
const Profile = () => {
  const [showImageFullView, setShowImageFullView] = useState(false);
  const [image, setImage] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isFriend, setIsFriend] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [allData, setAllData] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [tab, setTab] = useState("posts");
  const { username } = useLocalSearchParams();

  const { data: user, refetch, isLoading } = useGetUser(username);
  const {
    data: postsData,
    isLoading: isLoadingPosts,
    refetch: refetchPosts,
  } = useGetPostsForUser(username);

  useEffect(() => {
    if (!!user) {
      setCurrentUser(user.user);
      setIsFriend(user.isFriend);
    }
  }, [user]);

  useEffect(() => {
    setAllData(postsData?.posts);
    setAllPosts(postsData?.posts?.data);
    setPhotos(postsData?.photos);
  }, [postsData]);

  return (
    <>
      <ScrollView
        className="w-full h-fit bg-homeFeed "
        contentContainerStyle={{
          width: "100%",
          flexGrow: 1,
          height: "auto",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 8,
        }}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <ProfileLoader />
        ) : (
          <>
            <View className="max-h-[345px] h-full w-full relative bg-gray-900">
              <Image
                className="w-full h-[200px] object-cover"
                source={{ uri: currentUser?.cover_url }}
              />
              <Image
                className="absolute top-[170px] left-[20px] w-[120px] h-[120px] rounded-full z-10"
                source={{ uri: currentUser?.avatar_url }}
              />
              <View className="bg-gray-900 flex flex-col px-10 py-2 pl-[160px] border-b-[1px] border-b-gray-700/50 border-b-solid">
                <Text className="text-gray-300 text-2xl font-bold mb-2">
                  {currentUser.name}
                </Text>
                <Text className="text-gray-500 text-[20px] font-bold ">
                  {currentUser.email}
                </Text>
                <Text className="text-gray-500 text-[20px] font-bold ">
                  @{currentUser.username}
                </Text>
              </View>
              <View className="w-full flex flex-row gap-2 py-1 px-8">
                <Pressable
                  onPress={() => {
                    setTab("posts");
                  }}
                >
                  <View
                    className={`py-2 px-3 border-b-gray-700/50 border-b-solid border-b-[2px] ${
                      tab == "posts"
                        ? "border-b-gray-700/50"
                        : "border-transparent"
                    }`}
                  >
                    <Text className="text-gray-400">Posts</Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setTab("photos");
                  }}
                >
                  <View
                    className={`py-2 px-3 border-b-gray-700/50 border-b-solid border-b-[2px] ${
                      tab == "photos"
                        ? "border-b-gray-700/50"
                        : "border-transparent"
                    }`}
                  >
                    <Text className="text-gray-400">Photos</Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setTab("friends");
                  }}
                >
                  <View
                    className={`py-2 px-3 border-b-gray-700/50 border-b-solid border-b-[2px] ${
                      tab == "friends"
                        ? "border-b-gray-700/50"
                        : "border-transparent"
                    }`}
                  >
                    <Text className="text-gray-400">Friends</Text>
                  </View>
                </Pressable>
              </View>
            </View>
            {tab == "posts" && (
              <View className={`w-full h-fit flex flex-col gap-[8px]`}>
                {isLoadingPosts ? (
                  <PostLoader />
                ) : (
                  <>
                    {postsData?.posts && (
                      <>
                        {postsData?.posts?.data?.length > 0 ? (
                          <>
                            {allPosts?.length > 0 ? (
                              <>
                                {allPosts?.length > 0 &&
                                  allPosts?.map((post, index) => (
                                    <PostCard
                                      post={post}
                                      key={index}
                                      refetch={refetchPosts}
                                    />
                                  ))}
                                {allData?.meta?.current_page <
                                allData?.meta?.last_page ? (
                                  <View className="w-full flex justify-center items-center">
                                    <ActivityIndicator
                                      size="large"
                                      color="#6b7280"
                                    />
                                  </View>
                                ) : (
                                  <View className="w-full py-4 px-4 flex justify-center items-center ">
                                    <Text className="text-gray-600">
                                      No More Posts
                                    </Text>
                                  </View>
                                )}
                              </>
                            ) : (
                              <PostLoader />
                            )}
                          </>
                        ) : (
                          <>
                            {!!!postsData && (
                              <View className="w-full py-4  px-4">
                                <Text className="text-gray-600 text-center">
                                  No Posts To Show
                                </Text>
                              </View>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </View>
            )}
            {tab == "friends" && (
              <View
                className={`w-full h-fit flex flex-col gap-[8px] px-2 pb-8`}
              >
                {currentUser.friends?.map((friend, index) => (
                  <FriendUserCard friend={friend} key={index} />
                ))}
              </View>
            )}
            {tab == "photos" && (
              <View
                className={`w-full h-fit flex flex-col gap-[8px] px-2 pb-8`}
              >
                {photos?.map((image, index) => (
                  <Pressable
                    onPress={() => {
                      setImage(image);
                      setShowImageFullView(true);
                    }}
                    key={index}
                    className="flex min-w-full min-h-[250px] max-h-[250px] rounded-md overflow-hidden"
                  >
                    <Image
                      source={{ uri: image.url }}
                      className="min-w-full max-h-[250px] min-h-[250px] rounded-md"
                    />
                  </Pressable>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
      <ProfileImageFullView
        showImage={showImageFullView}
        setShowImage={setShowImageFullView}
        image={image}
      />
    </>
  );
};

export default Profile;
