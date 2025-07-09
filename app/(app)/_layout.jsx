import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import AuthenticatedLayout from "../../Components/Containers/AuthenticatedLayout";

export default function AppLayout() {
  return (
    <SafeAreaView className="flex-1 bg-gray-800 text-gray-300">
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#1f2937" },
          headerTintColor: "#d1d5db",
          headerTitleAlign: "left",
          title: "",
          header: () => <AuthenticatedLayout />,
        }}
      ></Stack>
    </SafeAreaView>
  );
}
