import { TextInput } from "react-native";

export default function CustomInput({ value, setValue, placeholder }) {
  return (
    <TextInput
      placeholder={placeholder}
      keyboardType="email-address"
      value={value}
      onChangeText={(text) => {
        setValue(text);
      }}
      className="bg-gray-700 w-full text-xl caret-gray-500 placeholder:text-gray-500 text-gray-400 border-gray-500/50 border-solid border-[1px] rounded-md px-2"
    />
  );
}
