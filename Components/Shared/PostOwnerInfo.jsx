import { Image, Text, View } from "react-native";
import { useUserContext } from "../../Contexts/UserContext";

const PostOwnerInfo = () => {
  const { user } = useUserContext();
  return (
    <View className=" relative flex flex-row gap-2 w-fit max-h-[60px] justify-start items-center ">
      <Image
        // source={post.user.avatar_url}
        source={{
          uri: user?.avatar_url,
        }}
        className="w-[60px] h-[60px] min-w-[60px] rounded-full border-[1px] border-gray-600/50 hover:border-gray-600 duration-200 object-cover"
      />
      <View className="flex flex-col gap-0 ">
        <Text className=" flex justify-start items-center dark:text-gray-400 lg:text-[18px] text-[16px] text-gray-900 duration-200">
          <Text> {user?.name} </Text>

          {/* {post && (
            <>
              {post.group && (
                <>
                  <Text>
                    <FontAwesome name="angle-right" size={24} color="black" />
                  </Text>
                  <Text>{post.group.name}</Text>
                </>
              )}
            </>
          )} */}
        </Text>
      </View>
    </View>
  );
};

export default PostOwnerInfo;
