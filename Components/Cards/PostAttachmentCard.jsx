import { EvilIcons, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";
import SecondaryButton from "../Tools/SecondaryButton";

const PostAttachmentCard = ({
  index,
  attachment,
  attachmentsErrors,
  onDelete,
  setImage,
  setShowImage,
  setImageIndex,
  showActions = true,
  update = false,
  undoDelete = () => {},
}) => {
  const isImage = (attachment) => {
    let mime = attachment.type || attachment.mime;
    mime = mime ? mime.split("/") : "";
    return mime[0] === "image";
  };
  return (
    <>
      {showActions && (
        <>
          <SecondaryButton
            classes="absolute top-[10px] right-[10px] py-1.5 px-3 h-[40px]"
            event={() => onDelete(attachment, index, update)}
          >
            <Text className="text-gray-400 ">
              <FontAwesome6 name="xmark" size={24} />
            </Text>
          </SecondaryButton>
          <SecondaryButton
            event={() => {}}
            classes={
              "absolute right-[60px] top-[10px] px-3 py-1.5 h-[40px] cursor-default"
            }
          >
            {index + 1}
          </SecondaryButton>
          {attachment.file && (
            <SecondaryButton
              event={() => {}}
              classes="px-3 py-1.5 absolute top-[10px] right-[100px] h-[40px]"
            >
              new
            </SecondaryButton>
          )}
          {attachment.isDeleted && (
            <SecondaryButton
              event={() => {
                undoDelete(attachment, update);
              }}
              classes="absolute top-[60px] right-[10px] px-3 py-1.5 gap-2"
            >
              Deleted
              <Text className="text-gray-400 ">
                <EvilIcons name="redo" size={24} color="black" />
              </Text>
            </SecondaryButton>
          )}
        </>
      )}
      {attachmentsErrors?.map((error, index) => {
        index == parseInt(error.index) && (
          <View
            className="bg-red-500 text-white w-[200px] h-[50px]"
            key={index}
          >
            <Text className="text-white"> {error.message}</Text>
          </View>
        );
      })}
      {isImage(attachment.file ? attachment.file : attachment) ? (
        <View className="w-full h-full max-h-[500px]">
          <Image
            key={index}
            source={{ uri: attachment.url }}
            className=" h-full object-cover rounded-lg cursor-pointer"
            onClick={() => {
              setImage(attachment.url);
              setShowImage(true);
              setImageIndex(index);
            }}
          />
        </View>
      ) : (
        <View
          className="w-full min-h-[200px] h-full max-h-[500px] object-cover rounded-lg cursor-pointer bg-gray-800 flex justify-center items-center flex-col gap-4"
          onClick={() => {
            setShowImage(true);
            setImageIndex(index);
          }}
        >
          <Text className="text-gray-400">
            <FontAwesome name="file" size={24} color="black" />
          </Text>
          <Text className="text-gray-500 font-bold text-xl max-w-[80%] break-words text-center">
            {attachment?.file ? attachment?.file?.name : attachment?.name}
          </Text>
        </View>
      )}
      {attachmentsErrors?.map((error, inx) => (
        <View key={inx}>
          {index == parseInt(error.index) && (
            <View className="bg-red-600/80 backdrop-blur-md rounded-md flex justify-center items-center absolute bottom-[10px] left-[10px] text-white w-[150px] h-[40px] cursor-default">
              <Text className="text-white"> {error.message}</Text>
            </View>
          )}
        </View>
      ))}
    </>
  );
};

export default PostAttachmentCard;
