import { Link } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import AuthForm from "../../Components/Containers/AuthForm";
import CustomInput from "../../Components/Tools/CustomInput";
import PrimaryButton from "../../Components/Tools/PrimaryButton";

const tokenConfirmation = () => {
  const [email, setEmail] = useState("");
  return (
    <AuthForm>
      <View className="p-2 flex justify-center items-center gap-4">
        <View className="w-full">
          <Text className="w-full text-gray-300 text-2xl font-bold">Token</Text>
          <CustomInput value={email} setValue={setEmail} placeholder="token" />
        </View>
        <View className="flex justify-end items-center w-full gap-4 flex-row ">
          <Link href={"/login"} className="text-gray-400 underline font-bold">
            Do You Know Your Password?
          </Link>
          <PrimaryButton classes="px-2 py-1 text-gray-300">
            <Text className="text-gray-400 text-xl">Submit</Text>
          </PrimaryButton>
        </View>
      </View>
    </AuthForm>
  );
};

export default tokenConfirmation;
