import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useHeaderHeight } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { Text, TouchableOpacity, View } from "react-native";
import axiosClient from "../../Axios/AxiosClient";
import { useMainContext } from "../../Contexts/MainContext";
import { useUserContext } from "../../Contexts/UserContext";
// import { router } from "expo-router";

const AuthMenu = ({ show, setShow }) => {
  const router = useRouter();
  const headerHeight = useHeaderHeight();
  const { setErrors } = useMainContext();
  const { setUser, user } = useUserContext();

  const logout = () => {
    axiosClient
      .post("/logout-mobile")
      .then(() => {
        AsyncStorage.removeItem("TOKEN");
        setUser({});
        router.replace("/login");
      })
      .catch((error) => {
        setErrors([
          error?.response?.data?.message || "Some Thing Wrong happened",
        ]);
        AsyncStorage.removeItem("TOKEN");
        setUser({});
        router.replace("/login");
      });
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => setShow((prev) => !prev)}
        className={`flex justify-center items-center w-[40px] h-[40px] duration-200`}
      >
        <Text className="text-gray-300 w-full h-full ">
          <Entypo size={40} className="text-gray-300 " name="menu" />
        </Text>
      </TouchableOpacity>
      {show && (
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "timing" }}
          className={`absolute right-0 min-w-[100vw] h-[180px] flex justify-start items-center rounded-md bg-gray-900 overflow-hidden border-b-[1px] border-b-solid border-b-gray-500/50 `}
          style={{ top: headerHeight }}
        >
          <View className="w-full flex flex-col gap-2 p-4">
            <Text className="text-[18px] font-bold text-gray-300">
              {user?.name}
            </Text>
            <Text className="text-[18px] font-bold text-gray-300">
              {user?.email}
            </Text>
          </View>
          <TouchableOpacity className="flex justify-center items-start w-full h-[40px] px-4 ">
            <Text className="text-gray-300 text-lg ">Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex justify-center items-start w-full h-[40px] px-4"
            onPress={logout}
          >
            <Text className="text-gray-300 text-lg">Logout</Text>
          </TouchableOpacity>
        </MotiView>
      )}
    </>
  );
};

export default AuthMenu;
