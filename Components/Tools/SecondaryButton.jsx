import { TouchableOpacity } from "react-native";

const SecondaryButton = ({ classes, event, children }) => {
  return (
    <TouchableOpacity
      onPress={event}
      className={`${classes} flex justify-center items-center bg-gray-800/70 hover:bg-gray-800 duration-200 border-[1px] border-solid border-gray-700 rounded-md `}
    >
      {children}
    </TouchableOpacity>
  );
};

export default SecondaryButton;
