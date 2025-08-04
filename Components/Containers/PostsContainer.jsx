import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import PostCard from "../Cards/PostCard";
import PostLoader from "../Tools/PostLoader";
const PostsContainer = ({ posts, refetch, isLoading, children }) => {
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
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        maxHeight: "auto",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 6,
        paddingVertical: 6,
        paddingBottom: 20,
      }}
    >
      {children}
      {isLoading ? (
        <PostLoader />
      ) : (
        <>
          {posts?.posts?.data?.length > 0 ? (
            <>
              {allPosts?.length > 0 ? (
                <>
                  {allPosts?.length > 0 &&
                    allPosts?.map((post, index) => (
                      <PostCard post={post} key={index} refetch={refetch} />
                    ))}
                  {allData?.meta?.current_page < allData?.meta?.last_page ? (
                    <View className="w-full flex justify-center items-center">
                      <ActivityIndicator size="large" color="#6b7280" />
                    </View>
                  ) : (
                    <View className="w-full py-4 px-4 flex justify-center items-center ">
                      <Text className="text-gray-600">No More Posts</Text>
                    </View>
                  )}
                </>
              ) : (
                <>
                  <PostLoader />
                </>
              )}
            </>
          ) : (
            <>
              {!!posts ? (
                <></>
              ) : (
                <View className="w-full py-4  px-4">
                  <Text className="text-gray-600 text-center">
                    No Posts To Show
                  </Text>
                </View>
              )}
              <PostLoader />
            </>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default PostsContainer;
