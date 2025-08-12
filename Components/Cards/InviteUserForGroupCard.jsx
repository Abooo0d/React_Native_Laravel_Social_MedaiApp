import { Feather } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";
import axiosClient from "../../Axios/AxiosClient";
import { useMainContext } from "../../Contexts/MainContext";
import PrimaryButton from "../Tools/PrimaryButton";

const InviteUserForGroupCard = ({ user, group, setShowForm }) => {
  // const inviteUser = ()=> {
  const { setSuccessMessage, setErrors } = useMainContext();
  const inviteUser = () => {
    console.log("Abood");

    axiosClient
      .post(`/group/invite/${group.slug}`, { user_id: user.id })
      .then(() => {
        setSuccessMessage("User Has Been Invited Successfully");
        setShowForm(false);
      })
      .catch((err) => {
        setErrors([err.response.data.message || "Some Thing Went Wrong"]);
      });
  };

  return (
    <View className="relative min-w-[300px] h-[170px] bg-gray-700/30 rounded-[8px] border-[1px] border-solid border-gray-500/50 flex flex-col justify-end items-start overflow-hidden ">
      <Image
        source={{ uri: user.cover_url }}
        alt=""
        className="w-full min-h-[120px] bg-green-500 object-cover z-10  absolute top-0 left-0 rounded-t-lg"
      />
      <Image
        source={{ uri: user.avatar_url }}
        alt=""
        className="absolute top-[20%] left-[10%] z-10 w-[90px] h-[90px] rounded-full border-[1px] border-solid border-gray-500/50"
      />
      <View className="flex flex-row justify-between items-center w-full pr-4">
        <View>
          <Text className="text-gray-300 font-bold mt-1 w-full text-left px-4">
            {user.username}
          </Text>
          <Text className="text-gray-400 mb-2 w-full text-left px-4 text-[13px] -mt-1">
            {user.email}
          </Text>
        </View>
        {/* </Link> */}
        <View className="flex flex-row gap-2 justify-center items-center">
          <PrimaryButton
            classes="py-[5px] px-[5px] "
            event={() => inviteUser()}
          >
            <Text className="text-gray-300">
              <Feather name="user-plus" size={20} />
            </Text>
          </PrimaryButton>
        </View>
      </View>
    </View>
  );
};

export default InviteUserForGroupCard;
