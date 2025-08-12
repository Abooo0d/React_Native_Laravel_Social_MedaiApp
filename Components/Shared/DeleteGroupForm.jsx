import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useMainContext } from "../../Contexts/MainContext";
import SecondaryButton from "../Tools/SecondaryButton";

const DeleteGroupForm = ({ group }) => {
  const router = useRouter();
  const { setSuccessMessage, setErrors } = useMainContext();
  const [groupName, setGroupName] = useState("");
  const [showGroupName, setShowGroupName] = useState(false);
  const deleteGroup = () => {
    if (!showGroupName) {
      setShowGroupName(true);
      return;
    } else {
      if (groupName !== "") {
        return;
      } else {
        // axiosClient
        //   .delete("/profile", { password: password })
        //   .then(({ data }) => {
        //     setSuccessMessage(data.message);
        //     router.replace("/Login");
        //   })
        //   .catch((error) => {
        //     setErrors([
        //       error?.response?.data?.message || "Some Thing Went Wrong",
        //     ]);
        //     setPassword("");
        //   });
      }
    }
  };
  return (
    <View className={`w-full h-fit flex flex-col gap-4 px-8 py-4 bg-gray-900`}>
      <Text className="text-2xl text-gray-300">Delete Account</Text>
      <Text className="text-gray-500">
        Once your account is deleted, all of its resources and data will be
        permanently deleted. Before deleting your account, please download any
        data or information that you wish to retain.
      </Text>
      {showGroupName && (
        <View className="w-full">
          <Text className="w-full text-gray-300 text-xl">Group Name</Text>
          <CustomInput
            value={groupName}
            setValue={setGroupName}
            placeholder="password"
          />
        </View>
      )}
      <View className="w-full flex flex-row justify-end items-center gap-4">
        {showGroupName && (
          <SecondaryButton
            classes=" px-4 py-2"
            event={() => {
              setShowGroupName(false);
            }}
          >
            <Text className="text-gray-300">Cancel</Text>
          </SecondaryButton>
        )}
        <TouchableOpacity
          className="flex items-center flex-row gap-2 justify-center bg-red-700 duration-200 outline-none border-[1px] border-solid border-red-500/40 rounded-md px-4 py-2"
          onPress={() => {
            deleteGroup();
          }}
        >
          <Text className="text-gray-300">Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeleteGroupForm;
