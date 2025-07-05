import { TouchableOpacity } from "react-native";

const PrimaryButton = ({ classes, event, children }) => {
  return (
    <TouchableOpacity
      onPress={event}
      className={`${classes} flex items-center justify-center bg-gray-700/70 hover:bg-gray-700 duration-200 outline-none border-[1px] border-solid border-gray-400/40 rounded-md `}
    >
      {children}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
