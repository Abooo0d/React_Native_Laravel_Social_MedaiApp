import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import AuthForm from "../../Components/Containers/AuthForm";
import PrimaryButton from "../../Components/Tools/PrimaryButton";
import SecondaryButton from "../../Components/Tools/SecondaryButton";

const verifyEmail = () => {
  const router = useRouter();
  return (
    <AuthForm>
      <View className="p-2 flex justify-center items-center gap-4">
        <View className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          <Text className="text-gray-400">
            {" "}
            Thanks for signing up! Before getting started, could you verify your
            email address by clicking on the link we just emailed to you? If you
            didn't receive the email, we will gladly send you another.
          </Text>
        </View>
        <View className="flex justify-end items-center w-full gap-4 flex-row ">
          <SecondaryButton
            classes="px-2 py-1 text-gray-300"
            text="Signup"
            event={() => router.push("/signup")}
          >
            <Text className="text-gray-400 text-xl">Logout</Text>
          </SecondaryButton>
          <PrimaryButton
            classes="px-2 py-1 text-gray-300"
            text="Login"
            // event={() => {
            //   login();
            // }}
          >
            <Text className="text-gray-400 text-xl">
              Resend Verification Email
            </Text>
          </PrimaryButton>
        </View>
      </View>
    </AuthForm>
  );
};

export default verifyEmail;
