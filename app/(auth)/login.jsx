import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Switch, Text, View } from "react-native";
import AuthForm from "../../Components/Containers/AuthForm";
import CustomInput from "../../Components/Tools/CustomInput";
import PrimaryButton from "../../Components/Tools/PrimaryButton";
import SecondaryButton from "../../Components/Tools/SecondaryButton";
import axiosClient from "./../../Axios/AxiosClient";
import { useMainContext } from "./../../Contexts/MainContext";
import { useUserContext } from "./../../Contexts/UserContext";
const login = () => {
  const router = useRouter();
  const { user } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [error, setError] = useState();
  const { setUser } = useUserContext();
  const { setErrors, setSuccessMessage } = useMainContext();
  const login = async () => {
    setIsLoadingLogin(true);
    axiosClient
      .post("/login-mobile", { email: email, password: password })
      .then(async ({ data }) => {
        let token = data.token;
        let user = data.user;
        await AsyncStorage.setItem("TOKEN", token);
        setUser(user);
        setSuccessMessage(`Welcome ${user.name}`);
        router.replace("/pages/Home");
        setIsLoadingLogin(false);
      })
      .catch((error) => {
        console.log(error?.response?.data?.message);
        setErrors([
          error?.response?.data?.message || "Some Thing Wrong happened",
        ]);
        setIsLoadingLogin(false);
      });
  };

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
        <View className="flex flex-row justify-start items-center px-6 gap-2">
          <Switch value={remember} onChange={(e) => setRemember(!remember)} />
          <Text className="w-full text-gray-300 text-lg">Remember Me</Text>
        </View>
        <View className="flex justify-end items-center w-full gap-4 flex-row ">
          <Link
            // href={"/forgetPassword"}
            href={"/login"}
            className="text-gray-400 underline font-bold"
          >
            forget Your Password
          </Link>
          <SecondaryButton
            classes="px-2 py-1 text-gray-300"
            text="Signup"
            event={() => router.push("/signup")}
          >
            <Text className="text-gray-400 text-xl">Sign Up</Text>
          </SecondaryButton>
          <PrimaryButton
            classes="px-2 py-1 text-gray-300"
            text="Login"
            processing={isLoadingLogin}
            event={() => {
              login();
            }}
          >
            <Text className="text-gray-400 text-xl">Login</Text>
          </PrimaryButton>
        </View>
      </View>
    </AuthForm>
  );
};

export default login;
