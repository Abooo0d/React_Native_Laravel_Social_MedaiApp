import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import PostCard from "../Cards/PostCard";
import CreatePostForm from "./../Shared/CreatePostForm";
const PostsContainer = ({ posts, refetch }) => {
  const [allData, setAllData] = useState(posts?.posts);
  const [allPosts, setAllPosts] = useState(posts?.posts?.data);
  useEffect(() => {
    setAllData(posts?.posts);
    setAllPosts(posts?.posts?.data);
  }, [posts]);
  return (
    <ScrollView
      scrollEnabled
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 8,
        padding: 8,
        paddingBottom: 20,
      }}
    >
      <CreatePostForm />
      {allPosts?.length > 0 &&
        allPosts?.map((post, index) => <PostCard post={post} key={index} />)}
    </ScrollView>
  );
};

export default PostsContainer;
