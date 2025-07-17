import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("TOKEN");
      if (token) {
        router.replace("/pages/Home");
      } else {
        router.replace("/login");
      }
    };
    checkAuth();
  }, []);

  return (
    <View className="bg-homeFeed flex-1 justify-center items-center gap-4">
      <Image
        source={require("../assets/images/logo.png")}
        className="w-[120px] h-[120px] object-contain "
      />
      <Text className="text-gray-400 text-3xl font-bold">LaraChat</Text>
    </View>
  );
}
