import { Entypo, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useUserContext } from "../../Contexts/UserContext";
const PostCardMenu = ({ post }) => {
  const [showForm, setShowForm] = useState();
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
  const onDelete = () => {
    // if (window.confirm("Are You Sure To Delete This Post")) {
    //   router.delete(route("post.delete", post), {
    //     data: post,
    //     onSuccess: () => {
    //       setOpenMenu(false);
    //       setSuccessMessage("Post Deleted Successfully");
    //       refetch();
    //     },
    //     onError: (error) => {
    //       setErrors([
    //         error?.response?.data?.message || "Some Thing Went Wrong",
    //       ]);
    //     },
    //   });
  };
  const copyToClipBoard = () => {
    // console.log(route("post.publicView", post));
    // navigator.clipboard.writeText(route("post.publicView", post));
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => setShowForm((prev) => !prev)}
        className={`flex justify-center items-center w-[40px] h-[40px] duration-200 `}
      >
        <Entypo
          size={25}
          className="text-gray-500 flex justify-center items-center text-center "
          name="dots-three-vertical"
          color={"#6b7280"}
        />
      </TouchableOpacity>
      {showForm && (
        <View
          className={`absolute border-gray-700 border-[1px] border-solid top-[60px] right-[0px] z-10 bg-gray-800 w-[150px] duration-300 cursor-pointer rounded-md flex flex-col justify-start items-center overflow-hidden`}
        >
          <TouchableOpacity
            onClick={() => {
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
            onClick={() => {
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
              onClick={() => {
                setShowForm(true);
                setOpenMenu(false);
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
              onClick={() => onDelete()}
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
    </>
  );
};

export default PostCardMenu;
