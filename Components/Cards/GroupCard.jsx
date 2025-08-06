import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { capitalizeFirstLetter } from "../../Functions/Functions";

const GroupCard = ({ data, setShowGroupContainer }) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => {
        setShowGroupContainer();
        router.push("/");
      }}
    >
      <View
        className={`min-h-[100px] min-w-full relative gap-3 duration-200 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer bg-red-800 rounded-[10px] group overflow-hidden `}
        // href={route("group.profile", data.slug)}
      >
        <Image
          source={{ uri: data.cover_url }}
          alt="groupCoverImage"
          className="absolute inset-0 w-[full] h-[100px] object-cover z-0"
        />
        <View className="z-10 bg-gray-900/50 py-2 px-4 rounded-[10px] overflow-hidden absolute top-0 left-0 w-full h-full flex flex-col justify-start items-start gap-2">
          <View
            className={`absolute top-[10px] right-[10px] backdrop-blur-md border-[1px] border-solid pl-[6px] px-[5px] py-[2px] rounded-sm text-gray-300 text-[10px] duration-200
        ${
          data.status === "approved"
            ? data.role === "admin"
              ? "bg-emerald-600/70 border-emerald-300"
              : "bg-blue-600/70 border-blue-300"
            : "bg-yellow-600/70 border-yellow-300"
        }
        `}
          >
            <Text className="text-gray-300">
              {data.status === "approved"
                ? capitalizeFirstLetter(data.role)
                : capitalizeFirstLetter(data.status)}
            </Text>
          </View>
          <View className="flex flex-row gap-2 w-fit justify-center items-center">
            <Image
              source={{ uri: data.thumbnail_url }}
              alt="groupeThumbnailImage"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <Text className="font-bold text-md dark:text-gray-200">
              {data.name}
            </Text>
          </View>
          <Text className=" text-gray-700 text-[14px] dark:text-gray-400 h-[100%] max-h-[40px] overflow-hidden">
            {data.description}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default GroupCard;
