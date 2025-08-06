import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import axiosClient from "../../Axios/AxiosClient";
import { useMainContext } from "../../Contexts/MainContext";
import { useUserContext } from "../../Contexts/UserContext";
import CustomInput from "../Tools/CustomInput";
import PrimaryButton from "../Tools/PrimaryButton";

const EditProfileForm = ({ user }) => {
  const { setUser } = useUserContext();
  const { setSuccessMessage, setErrors } = useMainContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [isLoading, setIsLoading] = useState(false);
  const UpdateData = () => {
    if (!!name && !!email) {
      setIsLoading(true);
      axiosClient
        .patch("/profile", {
          name: name,
          email: email,
        })
        .then(({ data }) => {
          setIsLoading(false);
          setUser(data.user);
          setSuccessMessage(data.message);
        })
        .catch((error) => {
          setIsLoading(false);
          setErrors([
            error?.response?.data?.message || "Some Thing Went Wrong",
          ]);
        });
    }
  };
  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  return (
    <View className={`w-full h-fit flex flex-col gap-4 px-8 py-4 bg-gray-900`}>
      <Text className="text-2xl text-gray-300">Change Info</Text>
      <View className="w-full">
        <Text className="w-full text-gray-300 text-xl">Name</Text>
        <CustomInput value={name} setValue={setName} placeholder="name" />
      </View>
      <View className="w-full">
        <Text className="w-full text-gray-300 text-xl">email</Text>
        <CustomInput value={email} setValue={setEmail} placeholder="email" />
      </View>
      {!!!user?.is_verified && (
        <View className="flex flex-row gap2">
          <Text className="text-gray-500">Your Email Is`t Verified </Text>
          <Link href="/" className="text-gray-400 underline">
            {" "}
            Click Here To Verify Your Account
          </Link>
        </View>
      )}
      <View className="w-full flex justify-enter items-end">
        <PrimaryButton
          classes={"px-4 py-2"}
          event={() => {
            UpdateData();
          }}
          processing={isLoading}
        >
          <Text className="text-gray-300">Submit</Text>
        </PrimaryButton>
      </View>
    </View>
  );
};

export default EditProfileForm;
