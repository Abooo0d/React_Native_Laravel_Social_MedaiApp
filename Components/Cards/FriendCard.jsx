import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

const FriendCard = ({ data, setShowFollowerContainer }) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => {
        setShowFollowerContainer();
        router.replace(`/pages/Profile/${data.username}`);
      }}
      className="bg-red-500"
    >
      <View
        className={`relative flex-1 min-h-[80px] max-h-[80px] w-full duration-200 rounded-[10px]`}
        onPress={setShowFollowerContainer}
      >
        <Image
          source={{ uri: data.cover_url }}
          alt=""
          className="absolute inset-0 h-[80px] w-[100%] object-cover z-0 rounded-[10px] group-hover:scale-110 duration-200"
        />
        <View className="z-1 bg-black/30 backdrop-blur-sm w-[100%] h-[80px] py-2 px-4 rounded-[10px] overflow-hidden absolute inset-0 flex flex-col gap-2 justify-between items-start">
          <View className="flex flex-row gap-4 w-full justify-start items-center rounded-[10px]">
            <Image
              source={{ uri: data.avatar_url }}
              alt="follower-img"
              className="w-[60px] h-[60px] rounded-full object-cover duration-200"
            />
            <Text className="font-bold text-md dark:text-gray-200">
              {data.name}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default FriendCard;
