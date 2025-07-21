import { Entypo } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../Axios/AxiosClient";
import { useUserContext } from "../../Contexts/UserContext";
import { setShowNotificationsForm } from "../../Redux/publicSlice";
import { useGetNotifications } from "../../TanStackQurey/Querys";
import NotificationCard from "../Cards/NotificationCard";
import SecondaryButton from "../Tools/SecondaryButton";
const NotificationsForm = () => {
  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { data, refetch } = useGetNotifications(user);
  const showNotificationsForm = useSelector(
    (state) => state.public.showNotificationsForm,
  );
  useEffect(() => {
    if (!user) return;
    refetch();
  }, [user]);
  return (
    <BlurView
      intensity={50}
      blurReductionFactor={100}
      experimentalBlurMethod="dimezisBlurView"
      className={`w-[90%] max-h-[500px] z-10 justify-start items-start absolute top-[95px] left-[5%] bg-gray-900/60 rounded-md border-gray-600/50 border-solid border-[1px] p-0 ${
        showNotificationsForm ? "flex" : " hidden"
      }`}
    >
      <View className="w-full flex justify-between items-center flex-row bg-gray-900 px-4 h-[48px]">
        <Text className="text-gray-400 w-fit py-3 px-4 text-xl font-bold max-h-full">
          Notifications:
        </Text>
        <SecondaryButton
          classes="py-2 px-2 bg-gray-900 border-gray-800/60"
          event={() => {
            setIsLoading(true);
            axiosClient
              .post("/notification/readAll")
              .then(() => {
                setIsLoading(false);
                refetch();
              })
              .catch(() => {
                setIsLoading(false);
              });
          }}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#6b7280" />
          ) : (
            <Text className="text-gray-400">
              <Entypo name="eye" size={18} />
            </Text>
          )}
        </SecondaryButton>
      </View>

      <ScrollView
        style={{ width: "100%" }}
        className="flex flex-1 border-gray-800 bg-homeFeed/60 border-t-[2px] border-solid"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 4,
          paddingHorizontal: 8,
          paddingVertical: 8,
          paddingBottom: 8,
        }}
        scrollEnabled={true}
        automaticallyAdjustKeyboardInsets={true}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        {data?.notifications?.length > 0 ? (
          <>
            {data?.notifications?.map((notify, index) => (
              <NotificationCard
                notification={notify}
                refetch={refetch}
                setShowNotificationsForm={() =>
                  dispatch(setShowNotificationsForm(!showNotificationsForm))
                }
                key={index}
              />
            ))}
          </>
        ) : (
          <>
            <Text className="text-gray-300 text-center py-4 w-full">
              No Notifications To Show
            </Text>
          </>
        )}
      </ScrollView>
    </BlurView>
  );
};

export default NotificationsForm;
