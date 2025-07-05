import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import AuthForm from "../../Components/Containers/AuthForm";
import CustomInput from "../../Components/Tools/CustomInput";
import PrimaryButton from "../../Components/Tools/PrimaryButton";
import SecondaryButton from "../../Components/Tools/SecondaryButton";

const signup = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const CheckForUser = async () => {
    let t = await AsyncStorage.getItem("TOKEN");
    if (t) {
      router.replace("/pages/Home");
    }
  };
  useEffect(() => {
    CheckForUser();
  }, []);

  return (
    <AuthForm>
      <View className="p-2 flex justify-center items-center gap-4">
        <View className="w-full">
          <Text className="w-full text-gray-300 text-2xl font-bold">Name</Text>
          <CustomInput value={name} setValue={setName} placeholder="name" />
        </View>
        <View className="w-full">
          <Text className="w-full text-gray-300 text-2xl font-bold">Email</Text>
          <CustomInput value={email} setValue={setEmail} placeholder="email" />
        </View>
        <View className="w-full">
          <Text className="w-full text-gray-300 text-2xl font-bold">
            Password
          </Text>
          <CustomInput
            value={password}
            setValue={setPassword}
            placeholder="password"
          />
        </View>
        <View className="w-full">
          <Text className="w-full text-gray-300 text-2xl font-bold">
            Conformation
          </Text>
          <CustomInput
            value={passwordConf}
            setValue={setPasswordConf}
            placeholder="conformation"
          />
        </View>
        <View className="flex justify-end items-center w-full gap-4 flex-row ">
          <Link
            href={"/pages/Home"}
            className="text-gray-400 underline font-bold"
          >
            Already Registered?
          </Link>
          <SecondaryButton
            classes="px-2 py-1 text-gray-300"
            event={() => router.push("/login")}
          >
            <Text className="text-gray-400 text-xl">Login</Text>
          </SecondaryButton>
          <PrimaryButton classes="px-2 py-1 text-gray-300">
            <Text className="text-gray-400 text-xl">Sign Up</Text>
          </PrimaryButton>
        </View>
      </View>
    </AuthForm>
  );
};

export default signup;
