import { FontAwesome6 } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { View } from "moti";
import { Modal, ScrollView, Text } from "react-native";
import SecondaryButton from "../Tools/SecondaryButton";

const PopupCard = ({ children, showForm, setShowForm }) => {
  return (
    <Modal visible={showForm} animationType="slide" transparent={true}>
      <BlurView
        intensity={20}
        tint="systemChromeMaterialDark"
        blurReductionFactor={10}
        experimentalBlurMethod="dimezisBlurView"
        className={`flex min-h-[100vh] max-h-[100vh] min-w-[100vw] z-10 justify-center items-center overflow-hidden bg`}
      >
        <View className="w-full flex flex-row justify-end items-center px-4 py-4">
          <SecondaryButton
            event={() => {
              setShowForm(false);
            }}
            classes="px-2 py-2"
          >
            <Text className="text-gray-400">
              <FontAwesome6 name="xmark" size={24} />
            </Text>
          </SecondaryButton>
        </View>
        <ScrollView
          className="flex-1 w-full flex"
          contentContainerStyle={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </ScrollView>
      </BlurView>
    </Modal>
  );
};

export default PopupCard;
