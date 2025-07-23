import { EvilIcons, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import { usePostContext } from "../../Contexts/PostContext";
import SecondaryButton from "../Tools/SecondaryButton";
const UpdatePostAttachmentCard = ({
  showActions = true,
  attachmentsErrors,
  attachment,
  undoDelete,
  onDelete,
  index,
  post,
}) => {
  const { setImageIndex, setShowImageFullView, setPost, setCreate, setUpdate } =
    usePostContext();
  const isImage = (attachment) => {
    let mime = attachment?.type || attachment?.mime;
    mime = mime ? mime?.split("/") : "";
    return mime[0] === "image";
  };
  return (
    <View className="relative w-full h-[300px] rounded-md">
      {showActions && (
        <View className="absolute top-[10px] right-[10px] z-10 flex flex-row justify-center items-center gap-2">
          {attachment?.isDeleted && (
            <SecondaryButton
              event={() => {
                undoDelete(attachment, true);
              }}
              classes=" px-3 py-1.5 gap-2 h-[35px] flex flex-row "
            >
              <Text className="text-gray-400 ">Deleted</Text>
              <Text className="text-gray-400 ">
                <EvilIcons name="redo" size={22} />
              </Text>
            </SecondaryButton>
          )}
          <SecondaryButton event={() => {}} classes={" px-3 py-1.5 h-[35px] "}>
            <Text className="text-gray-400 ">{index + 1}</Text>
          </SecondaryButton>
          {attachment?.file && (
            <SecondaryButton event={() => {}} classes="px-3 py-1.5 h-[35px] ">
              <Text className="text-gray-300">new</Text>
            </SecondaryButton>
          )}
          <SecondaryButton
            classes=" py-1.5 px-3 h-[35px]"
            event={() => onDelete(attachment, index, true)}
          >
            <Text className="text-gray-400 ">
              <FontAwesome6 name="xmark" size={20} />
            </Text>
          </SecondaryButton>
        </View>
      )}
      {attachmentsErrors?.map((error, index) => {
        index == parseInt(error.index) && (
          <View
            className="bg-red-500 text-white w-[200px] h-[50px]"
            key={index}
          >
            <Text className="text-white"> {error?.message}</Text>
          </View>
        );
      })}
      {isImage(attachment?.file ? attachment?.file : attachment) ? (
        <Pressable
          className="w-full h-[300px] max-h-[300px]"
          onPress={() => {
            setShowImageFullView(true);
            setImageIndex(index);
            setPost(post);
            setCreate(false);
            setUpdate(true);
          }}
        >
          {!!post?.attachments[index]?.file ? (
            <Image
              source={{
                uri: post?.attachments[index]?.url ?? "",
              }}
              alt="Post Image"
              className={`w-full h-[300px] object-contain rounded-[10px]`}
            />
          ) : (
            <Image
              source={{
                uri: post?.attachments[index]?.url ?? "",
              }}
              alt="Post Image"
              className={`w-full h-[300px] object-contain rounded-[10px]`}
            />
          )}
        </Pressable>
      ) : (
        <Pressable
          className="w-full min-h-[200px] h-full max-h-[500px] object-cover rounded-lg cursor-pointer bg-gray-800 flex justify-center items-center flex-col gap-4"
          onPress={() => {
            setShowImageFullView(true);
            setImageIndex(index);
            setPost(post);
            setCreate(false);
            setUpdate(true);
          }}
        >
          <Text className="text-gray-400">
            <FontAwesome name="file" size={24} color="black" />
          </Text>
          <Text className="text-gray-500 font-bold text-xl max-w-[80%] break-words text-center">
            {attachment?.file ? attachment?.file?.name : attachment?.name}
          </Text>
        </Pressable>
      )}
      {attachmentsErrors?.map((error, index) => (
        <View key={index}>
          {index == parseInt(error.index) && (
            <View className="bg-red-600/80 backdrop-blur-md rounded-md flex justify-center items-center absolute bottom-[10px] left-[10px] text-white w-[150px] h-[40px] cursor-default">
              <Text className="text-white"> {error.message}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default UpdatePostAttachmentCard;
