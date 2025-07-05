import { useState } from "react";
import { Text, View } from "react-native";
import PopupForm from "../Containers/PopupForm";
const FriendsForm = ({ showForm, setShowForm }) => {
  const [friends, setFriends] = useState([]);
  return (
    <PopupForm showForm={showForm}>
      <View className="flex w-full h-full flex-1">
        <View className="flex flex-row justify-between items-center px-4 py-2 bg-gray-900">
          <Text className="text-gray-300 text-lg">Friends</Text>
        </View>
        <View className=" flex-1 bg-gray-900/60 px-4 py-2">
          {friends?.length > 0 ? (
            <>
              {friends.map((group) => (
                <Text>Abood</Text>
              ))}
            </>
          ) : (
            <>
              <Text className="text-gray-300">
                You Don`t Have Any Friends Yet
              </Text>
            </>
          )}
        </View>
      </View>
    </PopupForm>
  );
};

export default FriendsForm;
