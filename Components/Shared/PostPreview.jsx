import { FontAwesome6 } from "@expo/vector-icons";
import { Image, Modal, ScrollView, Text, View } from "react-native";
import SecondaryButton from "../Tools/SecondaryButton";
import PostCardPostBody from "./PostCardPostBody";
import PostOwnerInfo from "./PostOwnerInfo";
const PostPreview = ({
  post,
  show,
  update = false,
  attachmentsErrors,
  setShow,
  setImage,
  setShowImage,
  setImageIndex,
  onDelete,
  undoDelete = () => {},
}) => {
  // const { user } = useUserContext();

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
          // nestedScrollEnabled={true}
        >
          {post?.attachments?.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image.url }}
              className="w-full h-[400px] object-cover rounded-md"
            />
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default PostPreview;
{
  /* <View className="flex justify-between items-center w-full h-full bg-red-500">
        
        <SecondaryButton event={() => setShow(false)} classes="px-3 py-1.5">
          <Text className="text-gray-400 ">
            <FontAwesome6 name="xmark" size={24} />
          </Text>
        </SecondaryButton>
      </View>
      <PostCardPostBody content={post.body} />

      {post.attachments && (
        <>
          <View
            className={`w-full max-h-[500px] overflow-y-auto h-full flex gap-3 flex-col my-4`}
          >
            {post.attachments.map((attachment, index) => (
              <View key={index} className="relative">
                <PostAttachmentCard
                  attachment={attachment}
                  attachmentsErrors={attachmentsErrors}
                  index={index}
                  onDelete={onDelete}
                  undoDelete={undoDelete}
                  update={update}
                  setImage={setImage}
                  setImageIndex={setImageIndex}
                  setShowImage={setShowImage}
                />
              </View>
            ))}
          </View>
        </>
      )} */
}
