import { Slot } from "expo-router";
import { View } from "react-native";
import Notifications from "../Components/Shared/Notifications";
import { MainContext } from "../Contexts/MainContext";
import { PostContext } from "../Contexts/PostContext";
import { UserContext } from "../Contexts/UserContext";
import { QueryProvider } from "../TanStackQurey/QueryProvider";
import "../global.css";

export default function RootLayout() {
  return (
    <View className="bg-gray-900 flex-1">
      <QueryProvider>
        <MainContext>
          <UserContext>
            <PostContext>
              <Slot />
            </PostContext>
          </UserContext>
          <Notifications />
        </MainContext>
      </QueryProvider>
    </View>
  );
}
