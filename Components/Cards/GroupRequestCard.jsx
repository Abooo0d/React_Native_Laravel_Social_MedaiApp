import { Image, Text, TouchableOpacity, View } from "react-native";
import { useMainContext } from "../../Contexts/MainContext";

const GroupRequestCard = ({ request, group, setRequestsData }) => {
  const { setSuccessMessage, setErrors } = useMainContext();
  const approve = () => {
    // axiosClient
    //   .post(route("group.approveRequest", group), { user_id: request.id })
    //   .then((data) => {
    //     setSuccessMessage(data.data.message);
    //     setRequestsData((prev) => prev.filter((req) => req.id !== request.id));
    //   });
  };
  const reject = () => {
    // axiosClient
    //   .post(route("group.rejectRequest", group), { user_id: request.id })
    //   .then((data) => {
    //     setSuccessMessage(data.data.message);
    //     setRequestsData((prev) => prev.filter((req) => req.id !== request.id));
    //   })
    //   .catch((data) => {
    //     setErrors([data.data.message]);
    //   });
  };
  return (
    <View className="group relative min-w-[300px] bg-gray-700/30 backdrop-blur-sm rounded-[8px] border-[1px] border-solid border-gray-500/50 flex flex-col justify-between items-center cursor-pointer duration-200 hover:bg-gray-600/50 hover:border-gray-500 overflow-hidden drop-shadow-2xl">
      <Image
        source={{ uri: request.avatar_url }}
        alt=""
        className="absolute top-[20%] left-[10%] z-10 w-[90px] h-[90px] rounded-full border-[1px] border-solid border-gray-500/50"
      />
      <Image
        source={{ uri: request.cover_url }}
        alt=""
        className="w-full h-[120px] "
      />
      <View className="flex flex-row justify-between items-center w-full pr-4">
        {/* <Link
          className="flex flex-col justify-start items-start w-full"
          href={route("profile.view", request.name)}
        > */}
        <View>
          <Text className="text-gray-300 font-bold mt-1 w-full text-left px-4">
            {request.username}
          </Text>
          <Text className="text-gray-400 mb-2 w-full text-left px-4 text-[13px] -mt-1">
            {request.email}
          </Text>
        </View>
        {/* </Link> */}
        <View className="flex flex-row gap-2 justify-center items-center">
          <TouchableOpacity
            className="py-[5px] px-[5px] bg-emerald-500/40 hover:bg-emerald-600/90 border-[1px] border-solid border-emerald-400 text-gray-300 rounded-md text-[12px] duration-200 "
            OnPress={() => approve()}
          >
            <Text className="text-gray-300">Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-[5px] px-[5px] bg-red-600/40 hover:bg-red-600/70 border-[1px] border-solid border-red-400 text-gray-300 rounded-md text-[12px] duration-200 "
            onPress={() => reject()}
          >
            <Text className="text-gray-300">Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text className="absolute top-[10px] right-[10px] backdrop-blur-md border-[1px] border-solid pl-[6px] px-[5px] py-[2px] rounded-sm text-gray-300 text-[10px] opacity-100 duration-200 bg-blue-600/30 border-blue-600">
        Pending
      </Text>
    </View>
  );
};

export default GroupRequestCard;
