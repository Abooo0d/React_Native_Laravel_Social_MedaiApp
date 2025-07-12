import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import axiosClient from "../../Axios/AxiosClient";
import { useMainContext } from "../../Contexts/MainContext";
import { useUserContext } from "../../Contexts/UserContext";
import SubCommentCard from "../Cards/SubCommentCard";
import SecondaryButton from "../Tools/SecondaryButton";

const SubCommentsSection = ({ show, comments, post, comment, setComment }) => {
  const { user } = useUserContext();
  const { setSuccessMessage, setErrors } = useMainContext();
  const [newComment, setNewComment] = useState("");
  const [sendingComment, setSendingComment] = useState(false);
  const createComment = () => {
    axiosClient
      .post(`/post/${post.id}/comment`, {
        comment: newComment,
        parent_id: comment.id,
      })
      .then((data) => {
        setComment((prevComment) => ({
          ...prevComment,
          comments: [...prevComment.comments, data.data[0]],
          num_of_comments: prevComment.num_of_comments + 1,
        }));
        setNewComment("");
        setSuccessMessage("Comment Posted Successfully");
      })
      .catch((error) => {
        setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
      });
  };
  return (
    <View className="pl-[50px] w-full flex-1 flex justify-start items-start overflow-auto">
      <View className="relative flex p-2 flex-row justify-start items-start w-full gap-[10px] mb-4">
        <Image
          source={{
            uri: user.avatar_url,
          }}
          alt="Avatar Image"
          className="w-[40px] h-[40px] rounded-full"
        />
        <View className="relative w-[80%] flex h-[40px]">
          <TextInput
            placeholder="Your comment"
            className="flex-1 px-2 py-1 w-full bg-gray-700/50 text-gray-400 placeholder:text-gray-500 h-[40px] border border-gray-800 rounded-md outline-none focus:border-gray-600 caret-gray-500"
            value={newComment}
            multiline
            textAlignVertical="top"
            onChangeText={(text) => {
              setNewComment(text);
            }}
          />
          <SecondaryButton
            classes={"px-2 py-1.5 absolute top-[5px] right-[5px]"}
            event={() => createComment()}
          >
            {sendingComment ? (
              <ActivityIndicator size="small" color="#6b7280" />
            ) : (
              <Text className="text-gray-400">
                <FontAwesome name="location-arrow" size={18} />
              </Text>
            )}
          </SecondaryButton>
        </View>
      </View>
      {comments.length > 0 && (
        <ScrollView
          style={{ maxHeight: 200 }}
          className={`flex flex-1 w-full ${
            show ? " opacity-100 h-full py-2" : " opacity-0 h-0 py-0"
          }`}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 16,
            paddingHorizontal: 8,
            paddingVertical: 16,
            paddingBottom: 20,
          }}
          scrollEnabled={true}
          automaticallyAdjustKeyboardInsets={true}
          nestedScrollEnabled={true}
        >
          {comments.map((comment, index) => (
            <React.Fragment key={index}>
              <SubCommentCard
                key={index}
                comment={comment}
                setMainComment={setComment}
              />
              {comments.length > 1 && index < comments.length - 1 && (
                <View className="w-[80%] h-[1px] bg-gray-700/20" />
              )}
            </React.Fragment>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default SubCommentsSection;
