import { useState } from "react";
import { Text, View } from "react-native";
import PopupForm from "../Containers/PopupForm";
const NotificationsForm = ({ showForm, setShowForm }) => {
  const [notifications, setNotifications] = useState([]);
  return (
    <PopupForm showForm={showForm}>
      <View className="flex w-full h-full flex-1">
        <View className="flex flex-row justify-between items-center px-4 py-2 bg-gray-900">
          <Text className="text-gray-300 text-lg">Notifications</Text>
        </View>
        <View className=" flex-1 bg-gray-900/60 px-4 py-2">
          {notifications?.length > 0 ? (
            <>
              {notifications.map((notify) => (
                <Text className="text-gray-300">Abood</Text>
              ))}
            </>
          ) : (
            <>
              <Text className="text-gray-300">No Notifications To Show</Text>
            </>
          )}
        </View>
      </View>
    </PopupForm>
  );
};

export default NotificationsForm;

// <>
//   <View className="flex flex-row w-full justify-between items-center px-4 py-2">
//     <Text className="text-gray-300 text-lg">Notifications</Text>
//     <SecondaryButton event={() => setShowForm(false)} classes="px-2 py-1 ">
//       <Text className="text-gray-300">X</Text>
//     </SecondaryButton>
//   </View>
//   <View className="w-full h-full bg-gray-500/50 backdrop-blur-sm rounded-b-md"></View>
// </>;
