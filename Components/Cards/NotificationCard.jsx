import { EvilIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

const NotificationCard = ({
  notification,
  setShowNotificationsForm,
  refetch,
}) => {
  const Icon = () => {
    if (notification?.type?.split("|")[0] == "postReaction") return "like";
    switch (notification?.type?.split("|")[1]) {
      case "postActions":
        return "post";
      case "commentActions":
        return "comment";
      case "groupAction":
        return "group";
      case "userAction":
        return "user";
    }
  };
  const Message = () => {
    let me = notification?.type?.split("|");
    if (me[1] == "groupAction") return "Click Here To Visit The Group.";
    else if (me[1] == "userAction") return "click Here To Visit.";
    else {
      if (me[0] == "deletePost") return "Click Here To Visit The Group.";
      else return "Click Here To See The Post.";
    }
  };
  return (
    // <Link
    //   className={`rounded-lg w-full overflow-hidden`}
    //   href={notification.link}
    //   onPress={() => {
    //     setShowNotificationsForm(false);
    //     // axiosClient.post(route("read.notification", notification.id));
    //     refetch();
    //   }}
    // >
    <View
      className={`flex flex-row gap-4 justify-start items-center px-4 py-3 w-full rounded-md ${notification.read_at ? "bg-gray-900/40" : "bg-gray-900/80"}`}
    >
      <View className="relative min-w-[50px] min-h-[50px]">
        <Image
          source={{
            uri:
              notification.actor?.avatar_url ||
              "/images/default_avatar_image.png",
          }}
          alt="user Image"
          className="w-[50px] h-[50px] object-cover rounded-full "
        />
        <View className="absolute w-[30px] h-[30px] flex justify-center items-center -bottom-[5px] -right-[5px] text-gray-300 bg-gray-800/80 backdrop-blur-lg p-[5px] rounded-full border-[1px] border-gray-700 border-solid">
          {Icon() == "like" ? (
            <Text className="text-gray-300">
              <FontAwesome
                name="thumbs-up"
                size={20}
                className={`w-full h-full `}
              />
            </Text>
          ) : Icon() == "post" ? (
            <Text className="text-gray-300">
              <EvilIcons
                name="comment"
                size={20}
                className={`w-full h-full `}
              />
            </Text>
          ) : // <FaCommentAlt className="w-full h-full" />
          Icon() == "comment" ? (
            <Text className="text-gray-300">
              <FontAwesome
                name="commenting-o"
                size={20}
                className={`w-full h-full `}
              />
            </Text>
          ) : // <FaRegCommentDots className="w-full h-full" />
          Icon() == "group" ? (
            <Text className="text-gray-300">
              <FontAwesome5
                name="users"
                size={20}
                className={`w-full h-full `}
              />
            </Text>
          ) : // <FaUserGroup className="w-full h-full" />
          Icon() == "user" ? (
            <Text className="text-gray-400">
              <FontAwesome name="user" size={20} className={`w-full h-full `} />
            </Text>
          ) : (
            <></>
          )}
        </View>
      </View>
      <View className="flex">
        <Text className="text-gray-300 text-[14px] flex-col justify-start items-start">
          {notification.message}
        </Text>
        <Text className="text-gray-500 text-[13px]">{Message()}</Text>
      </View>
    </View>
    // </Link>
  );
};

export default NotificationCard;
