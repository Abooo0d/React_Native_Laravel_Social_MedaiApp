import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useMainContext } from "../../Contexts/MainContext";

const Notifications = () => {
  const [ShowNotification, setShowNotification] = useState(false);
  const { successMessage, errors, setSuccessMessage, setErrors } =
    useMainContext();
  useEffect(() => {
    if (successMessage !== "" || errors.length > 0) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        setSuccessMessage("");
        setErrors([]);
      }, 5000);
    }
  }, [successMessage, errors]);
  return (
    <>
      <View
        className={`bg-emerald-500/40 backdrop-blur-sm border-[2px] border-solid border-emerald-500 border-r-[0px] text-white absolute top-[100px] right-0 z-[1000] h-[60px] flex justify-center items-center px-4 rounded-l-md duration-300 cursor-default  ${
          ShowNotification && successMessage
            ? "opacity-100 w-[400px]"
            : " opacity-0 w-[0] "
        }`}
      >
        <Text className="text-white text-lg font-bold">{successMessage}</Text>
      </View>
      <View
        className={`bg-red-500/40 backdrop-blur-sm border-[2px] border-solid border-red-500 border-r-[0px] text-white absolute top-[200px] right-0 z-[1000] h-[60px] flex justify-center items-center px-4 rounded-l-md duration-300 flex-col cursor-default ${
          ShowNotification && errors.length > 0
            ? "opacity-100 w-[400px] "
            : " opacity-0 w-[0] "
        }`}
      >
        {errors.map((error, index) => (
          <Text className="text-white text-lg font-bold" key={index}>
            {error}
          </Text>
        ))}
      </View>
    </>
  );
};

export default Notifications;
