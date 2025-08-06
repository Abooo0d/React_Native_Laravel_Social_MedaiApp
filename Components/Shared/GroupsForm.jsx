import { BlurView } from "expo-blur";
import { useEffect } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useUserContext } from "../../Contexts/UserContext";
import { setShowGroupsForm } from "../../Redux/publicSlice";
import { useGetGroups } from "../../TanStackQurey/Querys";
import GroupCard from "../Cards/GroupCard";
const GroupsForm = () => {
  const { user } = useUserContext();
  const { data, isLoading, refetch } = useGetGroups(user);
  const dispatch = useDispatch();
  const showGroupsForm = useSelector((state) => state.public.showGroupsForm);
  useEffect(() => {
    if (!user) return;
    refetch(user);
  }, [user]);
  return (
    <BlurView
      intensity={50}
      blurReductionFactor={100}
      experimentalBlurMethod="dimezisBlurView"
      className={`w-[90%] max-h-[500px] z-10 justify-start items-start absolute top-[95px] left-[5%] bg-gray-900/60 rounded-md border-gray-600/50 border-solid border-[1px] p-0 ${
        showGroupsForm ? "flex" : " hidden"
      }`}
    >
      <View className="w-full flex justify-between items-center flex-row bg-gray-900 px-4 h-[48px]">
        <Text className="text-gray-400 w-fit py-3 px-4 text-xl font-bold max-h-full">
          Groups:
        </Text>
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
        {isLoading && <ActivityIndicator size="large" color="#6b7280" />}
        {data?.groups?.length > 0 ? (
          <>
            {data?.groups?.map((group, index) => (
              <GroupCard
                data={group}
                setShowGroupContainer={() =>
                  dispatch(setShowGroupsForm(!showGroupsForm))
                }
                key={index}
              />
            ))}
          </>
        ) : (
          <>
            <Text className="text-gray-300 text-center py-4 w-full">
              You Aren`t Joined To Any Groups
            </Text>
          </>
        )}
      </ScrollView>
    </BlurView>
  );
};

export default GroupsForm;
