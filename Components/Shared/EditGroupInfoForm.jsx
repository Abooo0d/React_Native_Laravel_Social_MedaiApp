import { useEffect, useState } from "react";
import { Switch, Text, TextInput, View } from "react-native";
import axiosClient from "../../Axios/AxiosClient";
import { useMainContext } from "../../Contexts/MainContext";
import CustomInput from "../Tools/CustomInput";
import PrimaryButton from "../Tools/PrimaryButton";
const EditGroupInfoForm = ({ group, setGroup }) => {
  const { setSuccessMessage, setErrors } = useMainContext();
  const [name, setName] = useState(group?.name);
  const [autoApproval, setAutoApproval] = useState(group?.auto_approval);
  const [about, setAbout] = useState(group?.bout);
  const [isLoading, setIsLoading] = useState(false);
  const UpdateData = () => {
    if (!!name && !!about) {
      setIsLoading(true);
      axiosClient
        .put(`/group/${group.slug}`, {
          name: name,
          auto_approval: autoApproval,
          about: about,
        })
        .then(({ data }) => {
          setIsLoading(false);
          setGroup(data.group);
          setSuccessMessage(data.message);
        })
        .catch((error) => {
          setIsLoading(false);
          setErrors([
            error?.response?.data?.message || "Some Thing Went Wrong",
          ]);
        });
    }
  };
  useEffect(() => {
    setName(group?.name);
    setAutoApproval(group?.auto_approval);
    setAbout(group?.about);
  }, [group]);

  return (
    <View className={`w-full h-fit flex flex-col gap-4 px-8 py-4 bg-gray-900`}>
      <Text className="text-2xl text-gray-300">Change Info</Text>
      <View className="w-full">
        <Text className="w-full text-gray-300 text-xl">Name</Text>
        <CustomInput value={name} setValue={setName} placeholder="name" />
      </View>
      <View className="flex flex-row justify-start items-center px-6 gap-2">
        <Switch
          value={autoApproval}
          onChange={(e) => setAutoApproval(!autoApproval)}
        />
        <Text className="w-full text-gray-300 text-lg">Auto Approval</Text>
      </View>
      <View className="w-full">
        <Text className="w-full text-gray-300 text-xl">Name</Text>
        <TextInput
          className="bg-gray-700 h-[100px] w-full text-xl caret-gray-500 placeholder:text-gray-500 text-gray-400 border-gray-500/50 border-solid border-[1px] rounded-md px-2"
          multiline
          textAlignVertical="top"
          value={about}
          setValue={about}
          placeholder="name"
        />
      </View>
      {/* <View className="w-full">
        <Text className="w-full text-gray-300 text-xl">email</Text>
        <CustomInput value={aut} setValue={setEmail} placeholder="email" />
      </View> */}
      <View className="w-full flex justify-enter items-end">
        <PrimaryButton
          classes={"px-4 py-2"}
          event={() => {
            UpdateData();
          }}
          processing={isLoading}
        >
          <Text className="text-gray-300">Submit</Text>
        </PrimaryButton>
      </View>
    </View>
  );
};
export default EditGroupInfoForm;
