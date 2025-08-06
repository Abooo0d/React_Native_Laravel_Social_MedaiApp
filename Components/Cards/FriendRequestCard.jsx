import { Text, View } from "react-native";

const FriendRequestCard = (request) => {
  console.log(request);

  return (
    <View ClassName="w-full h-[100px] bg-blue-500">
      <Text>{request.name}</Text>
    </View>
  );
};

export default FriendRequestCard;
