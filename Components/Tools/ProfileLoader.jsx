import { View } from "react-native";
import PostLoader from "./PostLoader";

const ProfileLoader = () => {
  return (
    <View className="relative h-full w-full bg-homeFeed flex flex-col">
      <View className="w-full h-[250px] bg-gray-800 animate-pulse " />
      <View className="absolute top-[170px] left-[20px] w-[120px] h-[120px] rounded-full z-10 bg-gray-800" />
      <View className="bg-gray-900 flex flex-col px-10 py-2 pl-[150px] border-b-[1px] border-b-gray-700/50 border-b-solid">
        <View className="w-[200px] h-[4px] bg-gray-800 animate-pulse my-2" />
        <View className="w-[100px] h-[4px] bg-gray-800 animate-pulse my-1" />
        <View className="w-[120px] h-[4px] bg-gray-800 animate-pulse my-1" />
      </View>
      <View className="w-full px-16 py-2 flex flex-row gap-2 bg-gray-900">
        <View className="w-[50px] h-[35px] rounded-md bg-gray-800 animate-pulse" />
        <View className="w-[50px] h-[35px] rounded-md bg-gray-800 animate-pulse" />
        <View className="w-[50px] h-[35px] rounded-md bg-gray-800 animate-pulse" />
        <View className="w-[50px] h-[35px] rounded-md bg-gray-800 animate-pulse" />
      </View>
      <PostLoader />
    </View>
  );
};

export default ProfileLoader;
