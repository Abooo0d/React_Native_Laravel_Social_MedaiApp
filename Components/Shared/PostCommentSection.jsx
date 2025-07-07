import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import axiosClient from "../../Axios/AxiosClient";
import { useMainContext } from "../../Contexts/MainContext";
import { useUserContext } from "../../Contexts/UserContext";
import CommentCard from "../Cards/CommentCard";
import SecondaryButton from "../Tools/SecondaryButton";
const PostCommentSection = ({ show, post, setPost }) => {
  const { user } = useUserContext();
  const [comment, setComment] = useState("");
  const { setSuccessMessage, setErrors } = useMainContext();
  const createComment = () => {
    axiosClient
      .post(route("post.commentCreate", post), {
        comment: comment,
        parent_id: null,
      })
      .then((data) => {
        setPost((prevPost) => ({
          ...prevPost,
          comments: [...prevPost.comments, data.data[0]],
          num_of_comments: prevPost.num_of_comments + 1,
        }));
        setComment("");
        setSuccessMessage("Comment Posted Successfully");
      })
      .catch((error) => {
        setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
      });
  };
  return (
    <>
      <View
        className={`flex justify-start items-center flex-col gap-4 max-h-[500px] overflow-auto border-gray-800 border-t-[2px] border-solid py-2 ${
          show ? " opacity-100 h-fit" : " opacity-0 h-0"
        }`}
      >
        {post.comments.length > 0 ? (
          post.comments.map((comment, index) => {
            return (
              <View
                className="flex flex-col w-full h-full items-center"
                key={index}
              >
                <CommentCard
                  currentComment={comment}
                  post={post}
                  setPost={setPost}
                  currentUser={user}
                />
                {post.comments.length > 1 &&
                  index < post.comments.length - 1 && (
                    <View className="w-[80%] h-[1px] bg-gray-700/20" />
                  )}
              </View>
            );
          })
        ) : (
          // <View className="">
          <Text className="w-full text-gray-600 text-center pt-4">
            No Comments On This Post
          </Text>
          // </View>
        )}
      </View>
      <View
        className={`flex flex-row justify-between items-start gap-2 pt-2 w-full duration-200 text-gray-400 border-t-[1px] border-solid border-gray-700 mt-0 overflow-hidden  ${
          show ? " opacity-100 h-[100px]" : " opacity-0 h-[0px]"
        }`}
      >
        <Image
          source={{ uri: user.avatar_url }}
          alt="Avatar Image"
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
        <View className="relative flex-1 flex justify-center items-center">
          <TextInput
            placeholder="Your comment"
            className="flex-1 px-2 py-1 w-full bg-gray-700/50 text-gray-400 resize-none pr-[50px] placeholder:text-gray-500 h-[80px] border border-gray-800 rounded-md outline-none focus:border-gray-600 caret-gray-500"
            value={comment}
            multiline
            textAlignVertical="top"
            onChangeText={setComment}
          />
          <SecondaryButton
            classes={
              "px-2 py-1.5 absolute top-[5px] right-[5px] bg-transparent border-none"
            }
            event={() => createComment()}
          >
            {/* <BiSolidSend className="text-gray-400" /> */}
            <Text className="text-gray-400">
              <FontAwesome name="send" size={24} />
            </Text>
          </SecondaryButton>
        </View>
      </View>
    </>
  );
};

export default PostCommentSection;
