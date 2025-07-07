import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import axiosClient from "../../Axios/AxiosClient";
import { useMainContext } from "../../Contexts/MainContext";
import { useUserContext } from "../../Contexts/UserContext";
import SecondaryButton from "../Tools/SecondaryButton";

const CommentCard = ({ currentComment, post, setPost }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [editing, setEditing] = useState(false);
  const [comment, setComment] = useState(currentComment);
  const [showSubComments, setShowSubComments] = useState(false);
  const [editingComment, setEditingComment] = useState({
    ...currentComment,
    comment: currentComment.comment.replace(/<br\s*\/?>/gi, "\n"),
  });
  const { user } = useUserContext();
  const { setSuccessMessage, setErrors } = useMainContext();
  const UpdateComment = () => {
    axiosClient
      .put(route("comment.edit", comment.id), {
        comment: editingComment.comment,
      })
      .then((data) => {
        setShowMenu(false);
        setEditing(false);
        setComment(data.data);
        setPost((prevPost) => ({
          ...prevPost,
          comments: prevPost.comments.map((com, index) => {
            if (com.id !== data.data.id) return com;
            else return data.data;
          }),
        }));
        setEditingComment(data.data);
        setSuccessMessage("Comment Updated Successfully");
      })
      .catch((error) => {
        setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
      });
  };
  const sendCommentReaction = () => {
    axiosClient
      .post(route("comment.reaction", comment.id), {
        reaction: "like",
      })
      .then(({ data }) => {
        setComment((prevComment) => ({
          ...prevComment,
          user_has_reactions: data.user_has_reactions,
          num_of_reactions: data.num_of_reactions,
        }));
      })
      .catch((error) => {
        setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
      });
  };
  return (
    <View className="flex justify-center items-center flex-col h-full max-h-[500px] w-full cursor-default duration-200 relative p-2">
      <View
        className={`absolute top-[70px] left-[37px] h-[calc(100%-107px)] w-[2px] bg-[#1d2533] duration-200
        ${
          showSubComments && comment.comments.length > 0
            ? " opacity-100"
            : " opacity-0"
        }`}
      />
      <View className="flex justify-start items-start w-full h-fit flex-col">
        <View className="flex justify-between w-full px-4">
          <View className="flex gap-4 justify-center items-center">
            <Image
              source={{ uri: comment.user.avatar_url }}
              alt="user_image"
              className=" rounded-full w-[40px] h-[40px] "
            />
            <View className="flex flex-col  justify-start items-start gap-1">
              <Text className="text-gray-400">{comment.user.name}</Text>
              <Text className="text-gray-700 text-[12px]">
                {comment.updated_at}
              </Text>
            </View>
          </View>
          {/* {comment.user.id === user.id && (
            <CommentMenu
              openMenu={showMenu}
              setOpenMenu={setShowMenu}
              post={post}
              comment={comment}
              setPost={setPost}
              setEditing={setEditing}
            />
          )} */}
        </View>
        {!editing ? (
          <View className="w-full flex flex-col gap-1 p-2">
            <View
              className={`bg-gray-700/30 text-gray-300 w-fit max-w-[80%] rounded-r-md rounded-bl-md p-2 ml-8 duration-200 ${
                editing ? "h-0 opacity-0" : " h-full opacity-100"
              }`}
            />
            <Text>{comment.comment}</Text>
            <View
              className={`flex justify-start items-center w-full gap-[30px] pl-[50px] duration-200  ${
                editing ? " opacity-0 h-0" : " opacity-100 h-full"
              }`}
            >
              <TouchableOpacity
                className="duration-200 relative w-[45px] h-[30px] flex justify-start pl-2 items-center rounded-md hover:bg-gray-700/40 text-gray-300 gap-[4px] px-1"
                onPress={() => sendCommentReaction()}
              >
                {comment.num_of_reactions}{" "}
                <Text
                  className={`text-gray-400 relative ${
                    post.user_has_reaction
                      ? "opacity-100 "
                      : "scale-50 opacity-0 "
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
                    post.user_has_reaction
                      ? "scale-50 opacity-0 "
                      : "opacity-100 "
                  }`}
                >
                  <FontAwesome
                    name="thumbs-o-up"
                    size={24}
                    className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] `}
                  />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="duration-200 w-[40px] h-[30px] flex justify-center items-center rounded-md hover:bg-gray-700/40 text-gray-300 gap-[4px]"
                onClick={() => {
                  setShowSubComments((prev) => !prev);
                }}
              >
                <Text className="text-gray-400">
                  {comment.num_of_comments}{" "}
                </Text>
                <Text className="text-gray-400">
                  <FontAwesome name="commenting-o" size={24} className="mr-2" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            className={`flex flex-col gap-[2px] justify-end items-end w-full duration-200 px-4 ${
              editing ? "h-full opacity-100" : "h-0 opacity-0"
            }`}
          >
            <TextInput
              placeholder="Your comment"
              className="flex-1 px-2 py-1 bg-gray-700/50 text-gray-400 resize-none overflow-scroll h-[80px] border-gray-800 rounded-md outline-none focus:border-gray-600 ring-0 focus:ring-0 duration-200 cursor-pointer w-full"
              value={editingComment.comment}
              onChangeText={(e) =>
                setEditingComment((prevCOmment) => ({
                  ...prevCOmment,
                  comment: e.text,
                }))
              }
            ></TextInput>
            <View className="mt-2 flex gap-[4px]">
              <SecondaryButton
                children="Cancel"
                classes="px-2 py-1 text-sm"
                event={() => setEditing(false)}
              />
              <PrimaryButton
                children="Post"
                classes="px-2 py-1 text-sm"
                event={() => {
                  UpdateComment();
                }}
              />
            </View>
          </View>
        )}
      </View>
      {/* {showSubComments && (
        <SubCommentsSection
          show={showSubComments}
          comments={comment.comments}
          post={post}
          comment={comment}
          setComment={setComment}
        />
      )} */}
    </View>
  );
};

export default CommentCard;
