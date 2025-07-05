// app/index.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        router.replace("/pages/Home");
      } else {
        router.replace("/login");
      }
    };
    checkAuth();
  }, []);

  return null; // or splash/loading indicator
}
