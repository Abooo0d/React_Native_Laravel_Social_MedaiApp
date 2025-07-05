import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useHeaderHeight } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AuthMenu from "../Shared/AuthMenu";
import FriendsForm from "../Shared/FriendsForm";
import GroupsForm from "../Shared/GroupsForm";
import NotificationsForm from "../Shared/NotificationsForm";

const AuthenticatedLayout = () => {
  const headerHeight = useHeaderHeight();
  const router = useRouter();
  const [showGroups, setShowGroups] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [showAuthMenu, setShowAuthMenu] = useState(false);
  useEffect(() => {
    if (showGroups) {
      setShowNotifications(false);
      setShowFriends(false);
    }
  }, [showGroups]);
  useEffect(() => {
    if (showNotifications) {
      setShowGroups(false);
      setShowFriends(false);
    }
  }, [showNotifications]);
  useEffect(() => {
    if (showFriends) {
      setShowNotifications(false);
      setShowGroups(false);
    }
  }, [showFriends]);

  const CheckForUser = async () => {
    let t = await AsyncStorage.getItem("TOKEN");
    if (!t) {
      router.replace("/login");
    }
  };
  useEffect(() => {
    CheckForUser();
  }, []);

  return (
    <SafeAreaView>
      <View
        className="w-full relative flex flex-row justify-end bg-gray-900 border-b-[1px] border-b-solid border-b-gray-700/50"
        style={{ height: headerHeight }}
      >
        <View className="flex flex-row justify-between items-end flex-1 px-4 pt-4 mb-2">
          <TouchableOpacity onPress={() => router.replace("/pages/Home")}>
            <Image
              source={require("../../assets/images/logo.png")}
              className="w-[35px] h-[35px] ml-[10px] object-contain "
            />
          </TouchableOpacity>
          <View className="flex flex-row justify-evenly items-center flex-1 mx-4">
            <TouchableOpacity
              className={`w-[40px] h-[40px] rounded-md flex justify-center items-center p-1 duration-200 border-[1px] border-gray-500/50 ${
                showGroups
                  ? "bg-gray-700/500 border-solid"
                  : " bg-transparent border-transparent"
              }`}
              onPress={() => {
                setShowGroups((prev) => !prev);
              }}
            >
              <Text className="text-gray-300">
                <FontAwesome5
                  size={20}
                  className="text-gray-300"
                  name="users"
                />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`w-[40px] h-[40px] rounded-md flex justify-center items-center p-1 duration-200 border-[1px] border-gray-500/50 ${
                showFriends
                  ? "bg-gray-700/500 border-solid"
                  : " bg-transparent border-transparent"
              }`}
              onPress={() => {
                setShowFriends((prev) => !prev);
              }}
            >
              <Text className="text-gray-300">
                <FontAwesome6
                  size={20}
                  className="text-gray-300"
                  name="user-group"
                />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`w-[40px] h-[40px] rounded-md flex justify-center items-center p-1 duration-200 border-[1px] border-solid  ${
                showNotifications
                  ? "bg-gray-700/500 border-gray-500/50"
                  : " bg-transparent border-transparent"
              }`}
              onPress={() => {
                setShowNotifications((prev) => !prev);
              }}
            >
              <Text className="text-gray-300">
                <Ionicons
                  name="notifications"
                  size={20}
                  className="text-gray-300"
                />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              classname="w-[40px] h-[40px] rounded-md flex justify-center items-center"
              onPress={() => {
                router.replace("/pages/Chats");
              }}
            >
              <Text className="text-gray-300">
                <Ionicons
                  size={20}
                  className="text-gray-300"
                  name="chatbubbles"
                />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              classname="w-[40px] h-[40px] rounded-md flex justify-center items-center"
              onPress={() => {
                router.replace("/pages/Chats");
              }}
            >
              <Text className="text-gray-300 font-black">
                {/* <Ionicons
                  size={20}
                  className="text-gray-300"
                  name="chatbubbles"
                /> */}
                AI
              </Text>
            </TouchableOpacity>
          </View>
          <AuthMenu show={showAuthMenu} setShow={setShowAuthMenu} />
        </View>

        <NotificationsForm
          setShowForm={setShowNotifications}
          showForm={showNotifications}
        />
        <GroupsForm setShowForm={setShowGroups} showForm={showGroups} />
        <FriendsForm setShowForm={setShowFriends} showForm={showFriends} />
      </View>
    </SafeAreaView>
  );
};

export default AuthenticatedLayout;
