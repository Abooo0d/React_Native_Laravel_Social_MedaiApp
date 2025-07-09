import { View } from "react-native";
import PostsContainer from "../../../Components/Containers/PostsContainer";
import { useGetPosts } from "../../../TanStackQurey/Querys";
const Home = () => {
  const { data: posts, refetch, isLoading: loadingPosts } = useGetPosts();

  return (
    <View className="flex-1 bg-homeFeed">
      <PostsContainer refetch={refetch} posts={posts} />
    </View>
  );
};

export default Home;
