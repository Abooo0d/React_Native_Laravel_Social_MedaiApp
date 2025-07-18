import { FontAwesome6 } from "@expo/vector-icons";
import { Modal, ScrollView, Text, View } from "react-native";
import { usePostContext } from "../../Contexts/PostContext";
import PostAttachmentCard from "../Cards/PostAttachmentCard";
import SecondaryButton from "../Tools/SecondaryButton";
import PostCardPostBody from "./PostCardPostBody";
import PostOwnerInfo from "./PostOwnerInfo";
const PostPreview = ({
  post,
  show,
  update = false,
  attachmentsErrors,
  setShow,
  onDelete,
  undoDelete = () => {},
}) => {
  // const { user } = useUserContext();
  const { setShowImage, setImageIndex, setPost } = usePostContext();
  return (
    <Modal
      visible={show}
      animationType="slide"
      transparent={false}
      navigationBarTranslucent={true}
      statusBarTranslucent={true}
      backdropColor={"#111827"}
    >
      <View className="flex justify-start items-start min-h-[100vh] min-w-[100vw] my-auto px-4 py-4 gap-4">
        <View className="flex flex-row justify-between items-center px-4 w-full">
          <PostOwnerInfo />
          <SecondaryButton event={() => setShow(false)} classes="px-3 py-1.5">
            <Text className="text-gray-400 ">
              <FontAwesome6 name="xmark" size={24} />
            </Text>
          </SecondaryButton>
        </View>
        <PostCardPostBody content={post?.body} />
        <ScrollView
          className={`flex flex-1 w-full`}
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
        >
          {post.attachments.map((attachment, index) => (
            <PostAttachmentCard
              post={post}
              attachment={attachment}
              attachmentsErrors={attachmentsErrors}
              index={index}
              onDelete={onDelete}
              undoDelete={undoDelete}
              update={update}
              setImageIndex={setImageIndex}
              setShowImage={setShowImage}
              showActions={true}
            />
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default PostPreview;
