import { Image, View } from "react-native";

const AuthForm = ({ children }) => {
  return (
    <View className="flex-1 flex justify-center items-center bg-gray-900 gap-8">
      <Image
        source={require("../../assets/images/logo.png")}
        // style={{ width: 80, height: 80 }}
        resizeMode="contain"
        className="w-[80px] h-[80px] fill-gray-400"
      />
      <View className="w-[90%] h-fit bg-gray-800 p-4 rounded-md">
        {children}
      </View>
    </View>
  );
};

export default AuthForm;
