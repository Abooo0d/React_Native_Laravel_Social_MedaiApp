import { BlurView } from "expo-blur";
import { ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useUserContext } from "../../Contexts/UserContext";
import { setShowFriendsForm } from "../../Redux/publicSlice";
import FriendCard from "../Cards/FriendCard";
const FriendsForm = () => {
  const { user } = useUserContext();
  const dispatch = useDispatch();
  const showFriendsForm = useSelector((state) => state.public.showFriendsForm);
  return (
    <BlurView
      intensity={50}
      blurReductionFactor={100}
      experimentalBlurMethod="dimezisBlurView"
      className={`w-[90%] max-h-[500px] z-10 justify-start items-start absolute top-[95px] left-[5%] bg-gray-900/60 rounded-md border-gray-600/50 border-solid border-[1px] p-0 ${
        showFriendsForm ? "flex" : " hidden"
      }`}
    >
      <View className="w-full flex justify-between items-center flex-row bg-gray-900 px-4 h-[48px]">
        <Text className="text-gray-400 w-fit py-3 px-4 text-xl font-bold max-h-full">
          Friends:
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
        {user?.friends?.length > 0 ? (
          <>
            {user?.friends?.map((friend, index) => (
              <FriendCard
                data={friend}
                setShowFollowerContainer={() =>
                  dispatch(setShowFriendsForm(!showFriendsForm))
                }
                key={index}
              />
            ))}
          </>
        ) : (
          <>
            <Text className="text-gray-300 text-center py-4 w-full">
              You Don`t Have Any Friends Yet
            </Text>
          </>
        )}
      </ScrollView>
    </BlurView>
  );
};

export default FriendsForm;
