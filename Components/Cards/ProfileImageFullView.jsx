import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { Image, Modal, Text, View } from "react-native";
import { isImage } from "../../Functions/Functions";
import SecondaryButton from "../Tools/SecondaryButton";
const ProfileImageFullView = ({ showImage, setShowImage, image }) => {
  // const [attachmentId, setAttachmentId] = useState(0);
  // const { setSuccessMessage } = useMainContext();
  // const {
  //   setShowImageFullView,
  //   showImageFullView,
  //   imageIndex,
  //   setImageIndex,
  //   post,
  // } = usePostContext();

  const downloadAttachment = async () => {
    // try {
    //   const attachment = post?.attachments[imageIndex || 0];
    //   const fileUrl = `${process.env.EXPO_PUBLIC_API_URL}/post/download/${attachment.id}`;
    //   const fileUri = FileSystem.documentDirectory + attachment.name;
    //   const { uri } = await FileSystem.downloadAsync(fileUrl, fileUri);
    //   // Optional: Share the file or open it
    //   // if (await Sharing.isAvailableAsync()) {
    //   //   await Sharing.shareAsync(uri);
    //   // } else {
    //   // alert("Download complete. File saved to device.");
    //   setSuccessMessage("Download complete. File saved to device.");
    //   // }
    // } catch (error) {
    //   console.error("Error downloading file:", error);
    //   alert("Failed to download file");
    // }
  };

  return (
    <Modal
      visible={showImage}
      animationType="slide"
      transparent={true}
      navigationBarTranslucent={true}
      statusBarTranslucent={true}
      className="z-10"
    >
      <View className="w-full h-full bg-gray-900 flex justify-start items-start relative py-8">
        <View
          className={`flex relative min-h-[100vh] max-h-[100vh] w-full h-full min-w-[100vw] z-10 justify-center items-center overflow-hidden bg pt-16 pb-8`}
        >
          <View className=" h-fit w-full absolute top-0 right-0 flex-1 flex justify-end items-end gap-2 z-[100] px-4 py-4">
            <SecondaryButton
              classes=" py-1.5 px-3 right-0 w-[46px] cursor-default z-10"
              event={() => {
                setShowImage(false);
              }}
            >
              <Text className="text-gray-400">
                <FontAwesome6 name="xmark" size={24} />
              </Text>
            </SecondaryButton>

            <SecondaryButton
              classes=" py-1.5 px-3 right-0 w-[46px] cursor-default z-10"
              event={() => {
                downloadAttachment();
              }}
            >
              <Text className="text-gray-400">
                <FontAwesome name="download" size={24} />
              </Text>
            </SecondaryButton>
          </View>
          <View
            className="relative w-full h-full flex justify-center items-center z-10 min-w-[100vw]"
            style={{
              paddingHorizontal: 20,
            }}
          >
            {isImage(image) ? (
              <Image
                source={{
                  uri: image.url || "",
                }}
                alt="Post Image"
                className={`w-full h-[400px] object-contain rounded-[10px]`}
              />
            ) : (
              <View
                className={`w-[400px] h-[400px] rounded-lg cursor-default bg-gray-800 flex justify-center items-center flex-col gap-4  absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] duration-200 `}
              >
                <Text className="text-gray-500 font-bold text-xl max-w-[80%] break-words text-center">
                  :image.name || ""
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ProfileImageFullView;
