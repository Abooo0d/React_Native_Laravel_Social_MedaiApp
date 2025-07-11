import { Entypo } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useMainContext } from "../../Contexts/MainContext";

const CommentMenu = ({
  openMenu,
  setOpenMenu,
  comment,
  setPost,
  setEditing,
}) => {
  const { setSuccessMessage, setErrors } = useMainContext();
  const onDelete = () => {
    // if (window.confirm("Are You Sure To Delete This Comment!?")) {
    // axiosClient
    //   .delete(route("comment.delete", comment.id))
    //   .then(() => {
    //     setPost((prevPost) => ({
    //       ...prevPost,
    //       comments: prevPost.comments.filter((c) => c.id !== comment.id),
    //     }));
    //     setSuccessMessage("Comment Deleted Successfully");
    //     setOpenMenu(false);
    //   })
    //   .catch((error) => {
    //     setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
    //   });
    // }
  };
  return (
    <View className="relative w-[40px] h-[40px]">
      <TouchableOpacity
        className={`w-10 h-10 rounded-md cursor-pointer flex justify-center items-center border-[1px] border-solid p-1 duration-200 ${
          openMenu
            ? "bg-gray-800 border-gray-700"
            : "bg-gray-900 border-transparent"
        }`}
        onPress={() => {
          openMenu ? setOpenMenu(false) : setOpenMenu(true);
        }}
      >
        <Entypo
          size={20}
          className="text-gray-500 flex justify-center items-center text-center "
          name="dots-three-vertical"
          color={"#6b7280"}
        />
      </TouchableOpacity>
      {openMenu && (
        <View
          className="border-gray-700 border-[1px] border-solid top-[10px] left-[-120px] bg-gray-800 w-[150px] duration-300 rounded-md flex flex-col justify-start items-center overflow-hidden"
          key="menu"
        >
          <TouchableOpacity
            onPress={() => {
              setOpenMenu(false);
              setEditing(true);
            }}
            className="bg-gray-800 py-2 px-4 pr-16 text-sm font-medium text-white text-left w-full"
          >
            <Text className="text-white">Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-gray-800 py-2 px-4 pr-16 text-sm font-medium text-white text-left w-full"
            onPress={() => onDelete()}
          >
            <Text className="text-white">Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CommentMenu;
