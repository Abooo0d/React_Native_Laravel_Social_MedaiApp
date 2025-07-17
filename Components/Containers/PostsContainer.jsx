import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import PostCard from "../Cards/PostCard";
import CreatePost from "./CreatePost";
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
      nestedScrollEnabled={true}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 6,
        paddingVertical: 6,
        paddingBottom: 20,
      }}
    >
      <CreatePost
        classes="px-3 py-3 bg-gray-900"
        refetch={refetch}
        groupId=""
      />
      {allPosts?.length > 0 &&
        allPosts?.map((post, index) => (
          <PostCard post={post} key={index} refetch={refetch} />
        ))}
    </ScrollView>
  );
};

export default PostsContainer;
