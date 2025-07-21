import { ActivityIndicator, TouchableOpacity } from "react-native";

const PrimaryButton = ({ classes, event, children, processing }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (!processing) event();
      }}
      className={`${classes} flex items-center flex-row gap-2 justify-center bg-gray-700/70 hover:bg-gray-700 duration-200 outline-none border-[1px] border-solid border-gray-400/40 rounded-md `}
    >
      {processing && <ActivityIndicator size="small" color="#6b7280" />}
      {children}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
