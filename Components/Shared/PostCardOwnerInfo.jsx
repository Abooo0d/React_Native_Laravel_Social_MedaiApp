import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";
import { useUserContext } from "../../Contexts/UserContext";
import { formatRelativeTime } from "../../Functions/Functions";

const PostCardOwnerInfo = ({ post }) => {
  const { user } = useUserContext();
  return (
    <View className=" relative flex flex-1 flex-row gap-2 w-full h-[60px] justify-start items-center ">
      <Image
        // source={post.user.avatar_url}
        source={{
          uri: post.user?.avatar_url,
        }}
        className="w-[60px] h-[60px] min-w-[60px] rounded-full border-[1px] border-gray-600/50 hover:border-gray-600 duration-200 object-cover"
      />
      <View className="flex flex-col gap-0 ">
        <Text className=" flex justify-start items-center gap-2 dark:text-gray-400 lg:text-[18px] text-[16px] text-gray-900 duration-200">
          {post?.user && (
            <Link
              href={
                user?.username == post.user.username
                  ? "/pages/MyProfile"
                  : `/pages/Profile/${post.user.username}`
              }
              className=" hover:no-underline"
            >
              {post.user?.name}
            </Link>
          )}

          {post && (
            <>
              {post.group && (
                <>
                  <Text className="text-gray-500">
                    {" "}
                    <FontAwesome name="angle-right" size={20} />{" "}
                  </Text>
                  <Link href={"/pages/Home"}>{post.group.name}</Link>
                </>
              )}
            </>
          )}
        </Text>
        {/* {post.create_at && ( */}
        <Text className="text-gray-500 text-sm">
          {/* {post.create_at.slice(" ")[0]} */}
          {formatRelativeTime(post.updated_at)}
        </Text>
        {/* )} */}
      </View>
    </View>
  );
};

export default PostCardOwnerInfo;
