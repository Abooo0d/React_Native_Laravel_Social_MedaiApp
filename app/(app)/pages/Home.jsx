import { View } from "react-native";
import CreatePost from "../../../Components/Containers/CreatePost";
import PostsContainer from "../../../Components/Containers/PostsContainer";
import { useGetPosts } from "../../../TanStackQurey/Querys";
const Home = () => {
  const { data: posts, refetch, isLoading: loadingPosts } = useGetPosts();
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
