import { Entypo } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import UpdatePostAttachmentCard from "../Cards/UpdatePostAttachmentCard";
const UpdatePostPostAttachments = ({
  post,
  pickImage,
  attachmentsErrors,
  onDelete,
  undoDelete,
}) => {
  return (
    <>
      {post?.attachments?.length > 0 ? (
        <>
          <View className="w-full max-h-[400px] h-full flex flex-col gap-2">
            <ScrollView
              className={`flex flex-1 w-full`}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 16,
                paddingHorizontal: 8,
                paddingVertical: 8,
              }}
              scrollEnabled={true}
              automaticallyAdjustKeyboardInsets={true}
            >
              {post?.attachments?.map((attachment, index) => (
                <UpdatePostAttachmentCard
                  attachmentsErrors={attachmentsErrors}
                  attachment={attachment}
                  undoDelete={undoDelete}
                  showActions={true}
                  onDelete={onDelete}
                  index={index}
                  post={post}
                  key={index}
                />
              ))}
            </ScrollView>
          </View>
        </>
      ) : (
        <Pressable
          className="w-full h-full flex-1 flex justify-center items-center"
          onPress={() => {
            pickImage();
          }}
        >
          <View className="w-full h-full flex-1 flex justify-center items-center bg-homeFeed/20 border-[1px] border-solid border-gray-800/50 rounded-md">
            <Text className="text-gray-600">
              <Entypo name="images" size={80} />
            </Text>
            <Text className="text-gray-600 text-[25px] text-center">
              Click Here To Add Attachments
            </Text>
          </View>
        </Pressable>
      )}
    </>
  );
};

export default UpdatePostPostAttachments;
