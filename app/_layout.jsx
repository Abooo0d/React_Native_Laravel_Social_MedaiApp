import { Slot } from "expo-router";
import { View } from "react-native";
import Notifications from "../Components/Shared/Notifications";
import { MainContext } from "../Contexts/MainContext";
import { UserContext } from "../Contexts/UserContext";
import "../global.css";
import { QueryProvider } from "../TanStackQurey/QueryProvider";

export default function RootLayout() {
  return (
    <View className="bg-gray-900 flex-1">
      <QueryProvider>
        <MainContext>
          <UserContext>
            <Slot />
          </UserContext>
          <Notifications />
        </MainContext>
      </QueryProvider>
    </View>
  );
}
