import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import axiosClient from "../../Axios/AxiosClient";
import { useMainContext } from "../../Contexts/MainContext";
import { useUserContext } from "../../Contexts/UserContext";
import SubCommentCardMenu from "../Shared/SubCommentCardMenu";
import PrimaryButton from "../Tools/PrimaryButton";
import SecondaryButton from "../Tools/SecondaryButton";

const SubCommentCard = ({ comment, setMainComment }) => {
  const [editing, setEditing] = useState(false);
  const [currentComment, setCurrentComment] = useState(comment);
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useUserContext();
  const { setSuccessMessage, setErrors } = useMainContext();
  const [sendingComment, setSendingComment] = useState(false);
  const [editingComment, setEditingComment] = useState({
    ...currentComment,
    comment: currentComment.comment.replace(/<br\s*\/?>/gi, "\n"),
  });
  const UpdateComment = () => {
    setSendingComment(true);
    axiosClient
      .put(`/comment/${comment.id}`, {
        comment: editingComment.comment,
      })
      .then((data) => {
        setShowMenu(false);
        setEditing(false);
        setCurrentComment(data.data);
        setEditingComment(data.data);
        setSuccessMessage("Comment Updated Successfully");
        setSendingComment(false);
      })
      .catch((error) => {
        setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
        setSendingComment(false);
      });
  };
  const sendCommentReaction = () => {
    axiosClient
      .post(`/comment/${comment.id}/reaction`, {
        reaction: "like",
      })
      .then(({ data }) => {
        setCurrentComment((prevComment) => ({
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
    <View className=" flex  w-full items-start justify-start flex-col relative h-fit max-h-[250px]">
      <View className="flex flex-row gap-4 justify-between items-center w-full">
        <View className="flex flex-row justify-start items-center gap-[10px] flex-1">
          <Image
            source={{ uri: currentComment.user.avatar_url }}
            alt="user_image"
            className=" rounded-full w-[40px] h-[40px] "
          />
          <View className="flex flex-col justify-start items-start gap-1">
            <Text className="text-gray-400">{currentComment.user.name}</Text>
            <View className="text-gray-700 text-[12px]">
              <Text className="text-gray-700 text-[12px]">
                {currentComment.updated_at}
              </Text>
            </View>
          </View>
        </View>
        {currentComment.user.id === user.id && (
          <SubCommentCardMenu
            openMenu={showMenu}
            setOpenMenu={setShowMenu}
            comment={currentComment}
            setComment={setMainComment}
            setEditing={setEditing}
          />
        )}
      </View>
      {!editing ? (
        <View
          className="w-full flex flex-col justify-start items-start gap-1 p-2"
          key="View"
        >
          <View
            className={`bg-gray-800 flex text-gray-300 w-fit rounded-r-md rounded-bl-md p-2 ml-8 duration-200 h-fit opacity-100`}
          >
            <Text className="text-gray-400 text-lg w-fit">
              {currentComment.comment}
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
                {currentComment.num_of_reactions}{" "}
              </Text>
              <Text className={`text-gray-400 relative`}>
                {currentComment.user_has_reactions ? (
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
            {/* <TouchableOpacity
              className="duration-200 w-[40px] h-[30px] flex flex-row justify-center items-center rounded-md hover:bg-gray-700/40 text-gray-300 gap-[4px]"
              onClick={() => {
                setShowSubComments((prev) => !prev);
              }}
            >
              <Text className="text-gray-400">{comment.num_of_comments} </Text>
              <Text className="text-gray-400">
                <FontAwesome name="commenting-o" size={24} className="mr-2" />
              </Text>
            </TouchableOpacity> */}
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
              setEditingComment((prevComment) => ({
                ...prevComment,
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
  );
};

export default SubCommentCard;
