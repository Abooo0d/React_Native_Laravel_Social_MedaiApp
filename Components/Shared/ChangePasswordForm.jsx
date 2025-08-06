import { useState } from "react";
import { Text, View } from "react-native";
import axiosClient from "../../Axios/AxiosClient";
import { useMainContext } from "../../Contexts/MainContext";
import CustomInput from "../Tools/CustomInput";
import PrimaryButton from "../Tools/PrimaryButton";

const ChangePasswordForm = ({ user }) => {
  const { setSuccessMessage, setErrors } = useMainContext();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassConf, setNewPassConf] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const submit = () => {
    setIsLoading(true);
    axiosClient
      .post("/update-password", {
        current_password: password,
        password: newPassword,
        password_confirmation: newPassConf,
      })
      .then(({ data }) => {
        setIsLoading(false);
        setSuccessMessage(data.message);
        setPassword("");
        setNewPassword("");
        setNewPassConf("");
      })
      .catch((error) => {
        setIsLoading(false);
        setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
      });
  };
  return (
    <View className={`w-full h-fit flex flex-col gap-4 px-8 py-4 bg-gray-900`}>
      <Text className="text-2xl text-gray-300">Change Password</Text>
      <View className="w-full">
        <Text className="w-full text-gray-300 text-xl">Password</Text>
        <CustomInput
          value={password}
          setValue={setPassword}
          placeholder="password"
        />
      </View>
      <View className="w-full">
        <Text className="w-full text-gray-300 text-xl">New Password</Text>
        <CustomInput
          value={newPassword}
          setValue={setNewPassword}
          placeholder="new password"
        />
      </View>
      <View className="w-full">
        <Text className="w-full text-gray-300 text-xl">
          Password Confirmation
        </Text>
        <CustomInput
          value={newPassConf}
          setValue={setNewPassConf}
          placeholder="password confirmation"
        />
      </View>
      <View className="w-full flex justify-enter items-end">
        <PrimaryButton
          classes={"px-4 py-2"}
          processing={isLoading}
          event={() => {
            submit();
          }}
        >
          <Text className="text-gray-300">Submit</Text>
        </PrimaryButton>
      </View>
    </View>
  );
};

export default ChangePasswordForm;
