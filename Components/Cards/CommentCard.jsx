import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import axiosClient from "../../Axios/AxiosClient";
import { useMainContext } from "../../Contexts/MainContext";
import { useUserContext } from "../../Contexts/UserContext";
import CommentMenu from "../Shared/CommentMenu";
import SubCommentsSection from "../Shared/SubCommentsSection";
import PrimaryButton from "../Tools/PrimaryButton";
import SecondaryButton from "../Tools/SecondaryButton";

const CommentCard = ({ currentComment, post, setPost }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [editing, setEditing] = useState(false);
  const [comment, setComment] = useState(currentComment);
  const [showSubComments, setShowSubComments] = useState(false);
  const [sendingComment, setSendingComment] = useState(false);
  const [editingComment, setEditingComment] = useState({
    ...currentComment,
    comment: currentComment.comment.replace(/<br\s*\/?>/gi, "\n"),
  });

  const { user } = useUserContext();
  const { setSuccessMessage, setErrors } = useMainContext();
  const UpdateComment = () => {
    setSendingComment(true);
    axiosClient
      .put(`/comment/${comment.id}`, {
        comment: editingComment.comment,
      })
      .then((data) => {
        setShowMenu(false);
        setEditing(false);
        setComment(data.data);
        setPost((prevPost) => ({
          ...prevPost,
          comments: prevPost.comments.map((com) => {
            if (com.id !== data.data.id) return com;
            else return data.data;
          }),
        }));
        setEditingComment(data.data);
        setSuccessMessage("Comment Updated Successfully");
        setSendingComment(false);
      })
      .catch((error) => {
        setSendingComment(false);
        setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
      });
  };
  const sendCommentReaction = () => {
    axiosClient
      .post(`/comment/${comment.id}/reaction`, {
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
        console.log(error);

        setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
      });
  };
  useEffect(() => {
    setEditingComment({
      ...currentComment,
      comment: currentComment.comment.replace(/<br\s*\/?>/gi, "\n"),
    });
  }, [editing]);

  return (
    <View className="flex flex-col items-start justify-start w-full cursor-default duration-200 relative p-2">
      <View
        className={`absolute top-[70px] left-[37px] h-[calc(100%-107px)] w-[2px] bg-[#1d2533] duration-200
        ${
          showSubComments && comment.comments.length > 0
            ? " opacity-100"
            : " opacity-0"
        }`}
      ></View>
      <View className="flex justify-start items-start w-full h-fit flex-col ">
        <View className="flex flex-row justify-between items-center w-full ">
          <View className="flex flex-row gap-4 justify-center items-center  w-fit">
            <Image
              source={{
                uri: comment.user.avatar_url,
              }}
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
          {comment.user.id === user.id && (
            <CommentMenu
              openMenu={showMenu}
              setOpenMenu={setShowMenu}
              post={post}
              comment={comment}
              setPost={setPost}
              setEditing={setEditing}
            />
          )}
        </View>
        <View className="w-full h-fit">
          {!editing ? (
            <View
              className="w-full flex flex-col justify-start items-start gap-1 p-2"
              key="View"
            >
              <View
                className={`bg-gray-800 flex text-gray-300 w-fit rounded-r-md rounded-bl-md p-2 ml-8 duration-200 h-fit opacity-100`}
              >
                <Text className="text-gray-400 text-lg w-fit">
                  {comment.comment}
                </Text>
              </View>
              <View
                className={`flex flex-row justify-start items-center w-full gap-[30px] pl-[50px] duration-200 opacity-100 h-fit`}
              >
                <TouchableOpacity
                  className="duration-200 relative w-[45px] h-[30px] flex flex-row justify-start items-center pl-2 rounded-md hover:bg-gray-700/40 text-gray-300 gap-[4px] px-1"
                  onPress={() => sendCommentReaction()}
                >
                  <Text className="text-gray-400">
                    {comment.num_of_reactions}{" "}
                  </Text>
                  <Text className={`text-gray-400 relative`}>
                    {comment.user_has_reactions ? (
                      <FontAwesome
                        name="thumbs-up"
                        size={24}
                        className={`absolute top-0 left-0 translate-x-[-50%] translate-y-[-50%] scale-50 opacity-0 `}
                      />
                    ) : (
                      <FontAwesome
                        name="thumbs-o-up"
                        size={24}
                        className={`absolute top-0 left-0 translate-x-[-50%] translate-y-[-50%] opacity-100`}
                      />
                    )}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="duration-200 w-[40px] h-[30px] flex flex-row justify-center items-center rounded-md hover:bg-gray-700/40 text-gray-300 gap-[4px]"
                  onPress={() => {
                    setShowSubComments((prev) => !prev);
                  }}
                >
                  <Text className="text-gray-400">
                    {comment.num_of_comments}{" "}
                  </Text>
                  <Text className="text-gray-400">
                    <FontAwesome
                      name="commenting-o"
                      size={24}
                      className="mr-2"
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View
              className={`flex flex-col gap-[2px] justify-end items-end w-full h-[100px] duration-200 px-4 opacity-100`}
              key="Editing"
            >
              <TextInput
                placeholder="Your comment"
                className="flex-1 px-2 py-1 w-full bg-gray-700/50 text-gray-400 placeholder:text-gray-500 h-[80px] border border-gray-800 rounded-md outline-none focus:border-gray-600 caret-gray-500"
                value={editingComment.comment}
                multiline
                textAlignVertical="top"
                onChangeText={(text) => {
                  setEditingComment((prevCOmment) => ({
                    ...prevCOmment,
                    comment: text,
                  }));
                }}
              />

              <View className="mt-2 flex flex-row justify-end items-center gap-[4px] text-gray-500">
                <SecondaryButton
                  children="Cancel"
                  classes="px-2 py-1 text-sm"
                  event={() => setEditing(false)}
                >
                  <Text className="text-gray-400">Cancel</Text>
                </SecondaryButton>
                <PrimaryButton
                  children="Post"
                  classes="px-2 py-1 text-sm "
                  event={() => {
                    UpdateComment();
                  }}
                  processing={sendingComment}
                >
                  <Text className="text-gray-400">Post</Text>
                </PrimaryButton>
              </View>
            </View>
          )}
        </View>
      </View>
      {showSubComments && (
        <SubCommentsSection
          show={showSubComments}
          comments={comment.comments}
          post={post}
          comment={comment}
          setComment={setComment}
        />
      )}
    </View>
  );
};

export default CommentCard;
