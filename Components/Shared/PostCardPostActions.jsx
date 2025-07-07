import { FontAwesome } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import axiosClient from "../../Axios/AxiosClient";
import { useMainContext } from "../../Contexts/MainContext";

const PostCardPostActions = ({ post, setPost, setShowCommentSection }) => {
  const { setErrors } = useMainContext();
  const sendReaction = () => {
    axiosClient
      .post(route("post.reaction", post), {
        reaction: "like",
      })
      .then(({ data }) => {
        setPost({
          ...post,
          user_has_reaction: data.user_has_reaction,
          num_of_reactions: data.num_of_reactions,
        });
      })
      .catch((error) => {
        setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
      });
  };
  return (
    <View className="flex justify-between items-center gap-3 flex-col flex-1 mt-4">
      <View className=" flex-1 text-gray-300 w-full flex flex-row justify-between items-center">
        <View className="">
          <Text className="text-gray-600 lg:text-sm text-[13px]">
            {parseInt(post.num_of_reactions) === 0
              ? "No Reactions"
              : parseInt(post.num_of_reactions) === 1
                ? `${post.num_of_reactions} Person Reacted`
                : parseInt(post.num_of_reactions) > 1
                  ? `${post.num_of_reactions} Persons Reacted`
                  : "No Reactions"}
          </Text>
        </View>
        <View className="cursor-default text-gray-600 lg:text-sm text-[13px]">
          <Text className="text-gray-600 lg:text-sm text-[13px]">
            {post.num_of_comments === 1
              ? post.num_of_comments + " Comment"
              : post.num_of_comments > 1
                ? post.num_of_comments + " Comments"
                : "No Comments"}
          </Text>
        </View>
      </View>
      <View className="flex flex-row justify-end items-center gap-2 flex-1 w-full border-t-[1px] border-solid border-gray-500/50 pt-1">
        <TouchableOpacity
          className="flex flex-row justify-center items-center gap-2 relative rounded-lg cursor-pointer duration-200 h-[40px] flex-1"
          onPress={sendReaction}
        >
          <Text
            className={`text-gray-400 relative ${
              post.user_has_reaction ? "opacity-100 " : "scale-50 opacity-0 "
            }`}
          >
            <FontAwesome
              name="thumbs-up"
              size={24}
              className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] `}
            />
          </Text>
          <Text
            className={`text-gray-400 relative ${
              post.user_has_reaction ? "scale-50 opacity-0 " : "opacity-100 "
            }`}
          >
            <FontAwesome
              name="thumbs-o-up"
              size={24}
              className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] `}
            />
          </Text>
          <View className=" text-sm text-gray-400">
            <Text className="text-gray-400">
              {post.user_has_reaction ? "Liked" : "Like"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowCommentSection((prevState) => !prevState);
          }}
          className="flex flex-row gap-2 justify-center items-center relative rounded-lg cursor-pointer duration-200 h-[40px] flex-1"
        >
          <Text className="text-gray-400">
            <FontAwesome name="commenting-o" size={24} className="mr-2" />
          </Text>
          <Text className="text-gray-400">Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostCardPostActions;
