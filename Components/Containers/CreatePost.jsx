import { useState } from "react";
import { Text, View } from "react-native";
import CreatePostForm from "../Shared/CreatePostForm";

const CreatePost = ({ groupId = null, classes, refetch }) => {
  const [showForm, setShowForm] = useState(false);
  return (
    <View
      className={`max-w-[700px] w-full dark:bg-gray-900 rounded-lg lg:px-6 px-4 flex flex-col duration-500  ${classes}`}
    >
      <View
        className="w-full flex justify-center items-start text-lg bg-gray-800/50 rounded-lg  hover:bg-gray-700/50 py-1.5 px-3 duration-200 min-h-[40px] cursor-pointer text-gray-400 hover:border-gray-600 border-[1px] border-solid border-gray-600/50"
        onPress={() => {
          setShowForm(true);
        }}
      >
        <Text className="text-gray-500"> What`s On Your Mind</Text>
      </View>
      <CreatePostForm
        refetch={refetch}
        showForm={showForm}
        setShowForm={setShowForm}
        groupId={groupId}
      />
    </View>
  );
};

export default CreatePost;
