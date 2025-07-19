import { Slot } from "expo-router";
import { View } from "react-native";
import { Provider } from "react-redux";
import Notifications from "../Components/Shared/Notifications";
import { MainContext } from "../Contexts/MainContext";
import { PostContext } from "../Contexts/PostContext";
import { UserContext } from "../Contexts/UserContext";
import "../global.css";
import { QueryProvider } from "../TanStackQurey/QueryProvider";
import { store } from "./../Redux/store";

export default function RootLayout() {
  return (
    <View className="bg-gray-900 flex-1">
      <Provider store={store}>
        <QueryProvider>
          <MainContext>
            <UserContext>
              <PostContext>
                <Slot />
                <Notifications />
              </PostContext>
            </UserContext>
          </MainContext>
        </QueryProvider>
      </Provider>
    </View>
  );
}
