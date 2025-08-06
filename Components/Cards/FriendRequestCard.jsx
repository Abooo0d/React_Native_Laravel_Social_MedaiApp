import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import axiosClient from "../../Axios/AxiosClient";
import { useMainContext } from "../../Contexts/MainContext";
import { useUserContext } from "../../Contexts/UserContext";

const FriendRequestCard = ({ request }) => {
  const { setSuccessMessage, setErrors } = useMainContext();
  const { setUser } = useUserContext();
  const acceptRequest = () => {
    console.log("Abood");

    axiosClient
      .post("/user/acceptRequest", {
        request_id: request.request_id,
        request_owner_id: request.friend_id,
      })
      .then(({ data }) => {
        setSuccessMessage(data.message);
        setUser(data.user);
      })
      .catch((error) => {
        setErrors([error?.response?.data?.message || "Some Thing Wend Wrong"]);
      });
  };
  return (
    <View className="relative w-full h-[200px] bg-gray-700/30 backdrop-blur-sm rounded-[8px] border-[1px] border-solid border-gray-500/50 flex flex-col justify-between items-center cursor-pointer duration-200 hover:bg-gray-600/50 hover:border-gray-500 overflow-hidden drop-shadow-2xl">
      <Image
        source={{ uri: request.avatar_url }}
        alt=""
        className="absolute top-[20%] left-[10%] z-10 w-[90px] max-h-[90px] h-full object-cover rounded-full"
      />
      <Image
        source={{ uri: request.cover_url }}
        alt=""
        className="w-full h-[80%] max-h-[150px] object-cover "
      />
      <View className="flex flex-1 flex-row justify-between items-center w-full px-4 py-0 h-[40px]">
        <Link
          href={
            request?.username == request.username
              ? "/pages/MyProfile"
              : `/pages/Profile/${request.username}`
          }
        >
          <View className="flex flex-col justify-start items-start max-w-[200px] w-[200px]">
            <Text className="text-gray-300 font-bold mt-1 w-full text-left px-4">
              {request.username}
            </Text>
            <Text className="text-gray-400 mb-2 w-full text-left px-4 text-[13px] -mt-1">
              {request.email}
            </Text>
          </View>
        </Link>
        <View className="flex flex-row gap-2 justify-end items-center min-w-[150px]">
          <TouchableOpacity
            className="py-[2px] px-[5px] bg-emerald-500/40 hover:bg-emerald-600/90 border-[1px] border-solid border-emerald-400 text-gray-300 rounded-sm text-[12px] duration-200 "
            onPress={() => acceptRequest()}
          >
            <Text className="text-gray-300"> Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-[2px] px-[5px] bg-red-600/40 hover:bg-red-600/70 border-[1px] border-solid border-red-400 text-gray-300 rounded-sm text-[12px] duration-200 "
            onClick={() => {}}
          >
            <Text className="text-gray-300"> Decline</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FriendRequestCard;
