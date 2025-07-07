import { useRouter } from "expo-router";
import { View } from "react-native";
import PostsContainer from "../../../Components/Containers/PostsContainer";
import { useMainContext } from "../../../Contexts/MainContext";
import { useGetPosts } from "../../../TanStackQurey/Querys";
const Home = () => {
  const router = useRouter();
  const { setSuccessMessage, setErrors } = useMainContext();
  const { data: posts, refetch, isLoading: loadingPosts } = useGetPosts();

  return (
    <View className="flex-1 bg-homeFeed">
      <PostsContainer refetch={refetch} posts={posts} />
    </View>
  );
};

export default Home;
