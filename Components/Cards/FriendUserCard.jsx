import { Link, useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import { useUserContext } from "../../Contexts/UserContext";

const FriendUserCard = ({ friend }) => {
  const { user } = useUserContext();
  const router = useRouter();
  return (
    <View
    // href={route("profile.view", friend.username)}
    >
      <View className="group relative bg-gray-700/30 backdrop-blur-sm rounded-[8px] border-[1px] border-solid border-gray-500/50 flex flex-col justify-between items-center cursor-pointer duration-200 hover:bg-gray-600/50 hover:border-gray-500 overflow-hidden drop-shadow-2xl">
        <Image
          source={{ uri: friend.avatar_url }}
          className="absolute top-[10%] left-[10%] w-[90px] h-[90px] z-[10] rounded-full border-[1px] border-solid border-gray-500/50 object-cover"
        />
        <Image
          source={{ uri: friend.cover_url }}
          className="w-full  min-h-[120px] max-h-[120px] h-[120px] object-cover"
        />
        <Link
          href={
            friend?.username == user.username
              ? "/pages/MyProfile"
              : `/pages/Profile/${friend.username}`
          }
          className=" hover:no-underline"
        >
          <View className="flex flex-row justify-between items-center w-full pr-4">
            <View className="flex flex-col justify-start items-start w-full">
              <Text className="text-gray-300 font-bold mt-1 w-full text-left px-4">
                {friend.name}
              </Text>
              <Text className="text-gray-400 mb-2 w-full text-left px-4 text-[13px] -mt-1">
                {friend.email}
              </Text>
            </View>
          </View>
        </Link>
      </View>
    </View>
  );
};

export default FriendUserCard;
