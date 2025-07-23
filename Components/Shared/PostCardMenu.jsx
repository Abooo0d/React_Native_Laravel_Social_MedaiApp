import { Entypo, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import axiosClient from "../../Axios/AxiosClient";
import { useMainContext } from "../../Contexts/MainContext";
import { useUserContext } from "../../Contexts/UserContext";
import UpdatePostForm from "../Containers/UpdatePostForm";
const PostCardMenu = ({ post, refetch }) => {
  const [showMenu, setShowMenu] = useState();
  const { setErrors, setSuccessMessage } = useMainContext();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const { user } = useUserContext();
  const showUpdate = () => {
    return post.user.id === user?.id ? true : false;
  };
  const showDelete = () => {
    return post.user.id == user?.id
      ? true
      : post.group && post.group.user_id == user?.id
        ? true
        : false;
  };

  const confirmDelete = () => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            onDelete();
          },
        },
      ],
      { cancelable: true },
    );
  };

  const onDelete = () => {
    axiosClient
      .delete(`/post/${post.id}`)
      .then(() => {
        setShowMenu(false);
        setSuccessMessage("Post Deleted Successfully");
        refetch();
      })
      .catch((error) => {
        setShowMenu(false);
        setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
      });
  };
  const copyToClipBoard = async () => {
    await Clipboard.setStringAsync(
      `http://192.168.1.109:8000/public/post/${post.id}`,
    );
    setShowMenu(false);
    // Alert.alert("Copied", "Text has been copied to your clipboard.");
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => setShowMenu((prev) => !prev)}
        className={`flex justify-center items-center w-[40px] h-[40px] duration-200 `}
      >
        <Entypo
          size={25}
          className="text-gray-500 flex justify-center items-center text-center "
          name="dots-three-vertical"
          color={"#6b7280"}
        />
      </TouchableOpacity>
      {showMenu && (
        <View
          className={`absolute border-gray-700 border-[1px] border-solid top-[60px] right-[0px] z-10 bg-gray-800 w-[150px] duration-300 cursor-pointer rounded-md flex flex-col justify-start items-center overflow-hidden`}
        >
          <TouchableOpacity
            onPress={() => {
              router.push("/pages/Home");
            }}
            className="bg-gray-800 duration-300 flex flex-row gap-2 justify-start items-start w-full py-2 px-4 text-sm font-medium text-gray-300 focus:outline-none text-left"
          >
            <FontAwesome5
              name="globe"
              size={18}
              className="mr-2"
              color={"#d1d5db"}
            />
            <Text className="text-gray-300 text-lg ">View Post</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              copyToClipBoard();
            }}
            className="bg-gray-800 duration-300 flex flex-row gap-2 justify-start items-start w-full py-2 px-4 text-sm font-medium text-gray-300 focus:outline-none text-left"
          >
            <FontAwesome5
              name="clipboard"
              size={18}
              className="mr-2"
              color={"#d1d5db"}
            />
            <Text className="text-gray-300 text-lg ">Copy Link</Text>
          </TouchableOpacity>
          {showUpdate() && (
            <TouchableOpacity
              onPress={() => {
                setShowUpdateForm(true);
                setShowMenu(false);
              }}
              className="bg-gray-800 duration-300 flex flex-row gap-2 justify-start items-start w-full py-2 px-4 text-sm font-medium text-gray-300 focus:outline-none text-left"
            >
              <FontAwesome6
                name="edit"
                size={18}
                className="mr-2"
                color={"#d1d5db"}
              />
              <Text className="text-gray-300 text-lg ">Edit Post</Text>
            </TouchableOpacity>
          )}
          {showDelete() && (
            <TouchableOpacity
              className="bg-gray-800 duration-300 flex flex-row gap-2 justify-start items-start w-full py-2 px-4 text-sm font-medium text-gray-300 focus:outline-none text-left"
              onPress={() => confirmDelete()}
            >
              <FontAwesome5
                name="trash-alt"
                size={18}
                className="mr-2"
                color={"#d1d5db"}
              />
              <Text className="text-gray-300 text-lg ">Delete Post</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      <UpdatePostForm
        setShowForm={setShowUpdateForm}
        showForm={showUpdateForm}
        refetch={refetch}
        user={post.user}
        post={post}
      />
    </>
  );
};

export default PostCardMenu;
