import { useHeaderHeight } from "@react-navigation/elements";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PostContainer from "../../../../Components/Containers/PostsContainer";
import ProfileLoader from "../../../../Components/Tools/ProfileLoader";
import {
  useGetPostsForUser,
  useGetUser,
} from "../../../../TanStackQurey/Querys";
const Profile = () => {
  const { top, bottom } = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const screenHeight = Dimensions.get("window").height;
  const availableHeight = screenHeight - top - bottom - headerHeight;
  const [currentUser, setCurrentUser] = useState({});
  const [isFriend, setIsFriend] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [posts, setPosts] = useState({});
  const [tab, setTab] = useState("posts");
  const { username } = useLocalSearchParams();
  const { data: user, refetch, isLoading, isFetched } = useGetUser(username);
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
    setPosts(postsData);
    setPhotos(postsData?.photos);
  }, [postsData]);
  return (
    <ScrollView
      className="w-full bg-red-500"
      stye={{ height: availableHeight }}
      contentContainerStyle={{
        width: "100%",
        flexGrow: 1,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
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
            <View className="bg-gray-900 flex flex-col px-10 py-2 pl-[150px] border-b-[1px] border-b-gray-700/50 border-b-solid">
              <Text className="text-gray-300 text-2xl font-bold mb-2">
                {currentUser.email}
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
                  console.log(tab);
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
          <View
            className={`w-full h-full ${tab == "posts" ? "visible" : "invisible"}`}
          >
            <PostContainer
              isLoading={isLoadingPosts}
              posts={posts}
              refetch={refetchPosts}
            />
          </View>
          <View
            className={`w-full h-full ${tab == "photos" ? "visible" : "invisible"} bg-red-900 px-2 py-2 flex flex-col gap-2`}
          >
            {photos?.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image.url }}
                className="w-full max-h-[250px] rounded-md "
              />
            ))}
          </View>
          <View
            className={`w-full h-full ${tab == "posts" ? "visible" : "invisible"}`}
          >
            <PostContainer
              isLoading={isLoadingPosts}
              posts={posts}
              refetch={refetchPosts}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default Profile;
