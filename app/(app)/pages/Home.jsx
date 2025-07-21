import { useEffect } from "react";
import { View } from "react-native";
import CreatePost from "../../../Components/Containers/CreatePost.jsx";
import { useUserContext } from "../../../Contexts/UserContext";
import { useGetPosts } from "../../../TanStackQurey/Querys";
import PostsContainer from "./../../../Components/Containers/PostsContainer.jsx";
const Home = () => {
  const { user } = useUserContext();
  const { data: posts, refetch, isLoading: loadingPosts } = useGetPosts(user);
  useEffect(() => {
    if (!user) return;
    refetch();
  }, [user]);
  return (
    <View className="flex-1 bg-homeFeed">
      <PostsContainer refetch={refetch} posts={posts} isLoading={loadingPosts}>
        <CreatePost
          classes="px-3 py-3 bg-gray-900"
          refetch={refetch}
          groupId=""
        />
      </PostsContainer>
    </View>
  );
};

export default Home;
