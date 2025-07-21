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
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../Axios/AxiosClient";
import { useMainContext } from "../../Contexts/MainContext";
import { useUserContext } from "../../Contexts/UserContext";
import {
  setShowFriendsForm,
  setShowGroupsForm,
  setShowNotificationsForm,
} from "../../Redux/publicSlice";
import { useGetNotifications } from "../../TanStackQurey/Querys";
import FullPostCard from "../Cards/FullPostCard";
import ImageFullView from "../Cards/ImageFullView";
import AuthMenu from "../Shared/AuthMenu";

const AuthenticatedLayout = () => {
  const dispatch = useDispatch();
  const showNotificationsForm = useSelector(
    (state) => state.public.showNotificationsForm,
  );
  const showGroupsForm = useSelector((state) => state.public.showGroupsForm);
  const showFriendsForm = useSelector((state) => state.public.showFriendsForm);

  const headerHeight = useHeaderHeight();
  const router = useRouter();
  const [showAuthMenu, setShowAuthMenu] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const { setUser } = useUserContext();
  const { setErrors } = useMainContext();
  const {
    data: notifications,
    isLoading: LoadingNotifications,
    refetch: refetchNotifications,
  } = useGetNotifications();

  useEffect(() => {
    if (!LoadingNotifications) {
      if (notifications?.notifications?.length > 0) {
        let count = 0;
        notifications?.notifications?.map((notification) => {
          if (!!notification.read_at) return;
          count++;
        });
        setNotificationsCount(count);
      }
    }
  }, [notifications, LoadingNotifications]);

  // useEffect(() => {
  //   if (showGroups) {
  //     setShowNotifications(false);
  //     setShowFriends(false);
  //   }
  // }, [showGroups]);
  // useEffect(() => {
  //   if (showNotifications) {
  //     setShowGroups(false);
  //     setShowFriends(false);
  //   }
  // }, [showNotifications]);
  // useEffect(() => {
  //   if (showFriends) {
  //     setShowNotifications(false);
  //     setShowGroups(false);
  //   }
  // }, [showFriends]);

  const getUser = () => {
    axiosClient
      .get("/user")
      .then(({ data }) => {
        setUser(data.user);
      })
      .catch((error) => {
        setErrors([
          error?.response?.data?.message || "Some Thing Wrong happened",
        ]);
      });
  };
  const CheckForUser = async () => {
    let t = await AsyncStorage.getItem("TOKEN");
    if (!t) router.replace("/login");
    else getUser();
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
              className={`w-[40px] h-[40px] rounded-md flex justify-center items-center p-1 duration-200 border-[1px] border-solid ${
                showGroupsForm
                  ? "bg-gray-700/500 border-gray-700/50"
                  : " bg-transparent border-transparent"
              }`}
              onPress={() => {
                dispatch(setShowGroupsForm(!showGroupsForm));
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
              className={`w-[40px] h-[40px] rounded-md flex justify-center items-center p-1 duration-200 border-[1px] border-solid ${
                showFriendsForm
                  ? "bg-gray-700/500 border-gray-700/50"
                  : " bg-transparent border-transparent"
              }`}
              onPress={() => {
                dispatch(setShowFriendsForm(!showFriendsForm));
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
              className={`w-[40px] relative h-[40px] rounded-md flex justify-center items-center p-1 duration-200 border-[1px] border-solid ${
                showNotificationsForm
                  ? "bg-gray-700/500 border-gray-700/50 "
                  : " bg-transparent border-transparent"
              }`}
              onPress={() => {
                dispatch(setShowNotificationsForm(!showNotificationsForm));
              }}
            >
              {notificationsCount > 0 && (
                <View className="w-[16px] h-[16px] bg-red-500/40 border-[1px] border-solid border-red-500 backdrop-blur-sm absolute top-[-5px] right-0 text-[12px] flex justify-center items-center rounded-md p-0">
                  <Text className="text-gray-300 text-xs">
                    {notificationsCount}
                  </Text>
                </View>
              )}
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
              <Text className="text-gray-300 font-black">AI</Text>
            </TouchableOpacity>
          </View>
          <AuthMenu show={showAuthMenu} setShow={setShowAuthMenu} />
        </View>
      </View>
      <FullPostCard />
      <ImageFullView />
    </SafeAreaView>
  );
};

export default AuthenticatedLayout;
