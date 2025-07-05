import { Text, View } from "react-native";
import { useMainContext } from "../../../Contexts/MainContext";
const Home = () => {
  const { setSuccessMessage, setErrors } = useMainContext();
  return (
    <View className="p-2 flex-1 bg-homeFeed">
      <Text className="text-gray-300">
        Abood From Home Lorem, ipsum dolor sit amet consectetur adipisicing
        elit. Saepe odio suscipit molestiae labore quam. Molestiae nesciunt sint
        dignissimos explicabo facere ad esse totam impedit, tempore ipsam illo
        perferendis aspernatur ea. Abood From Home Lorem, ipsum dolor sit amet
        consectetur adipisicing elit. Saepe odio suscipit molestiae labore quam.
        Molestiae nesciunt sint dignissimos explicabo facere ad esse totam
        impedit, tempore ipsam illo perferendis aspernatur ea. Abood From Home
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe odio
        suscipit molestiae labore quam. Molestiae nesciunt sint dignissimos
        explicabo facere ad esse totam impedit, tempore ipsam illo perferendis
        aspernatur ea. Abood From Home Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Saepe odio suscipit molestiae labore quam. Molestiae
        nesciunt sint dignissimos explicabo facere ad esse totam impedit,
        tempore ipsam illo perferendis aspernatur ea.
      </Text>
    </View>
  );
};

export default Home;
