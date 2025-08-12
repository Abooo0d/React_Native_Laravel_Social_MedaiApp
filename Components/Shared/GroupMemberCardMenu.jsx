import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import axiosClient from "../../Axios/AxiosClient";
import { useMainContext } from "../../Contexts/MainContext";

const GroupMemberCardMenu = ({ group, member, setMembers }) => {
  const [showMenu, setShowMenu] = useState();
  const { setSuccessMessage, setErrors } = useMainContext();
  const changeRole = (role) => {
    axiosClient
      .post(`/group/change-role/${group.slug}`, {
        user_id: member.user.id,
        role: role,
      })
      .then(({ data }) => {
        setShowMenu(false);
        setSuccessMessage(data.message);
        setMembers((prev) =>
          prev.map((mem) =>
            mem.user.id == member.user.id ? { ...member, role: role } : mem,
          ),
        );
      })
      .catch((error) => {
        setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
      });
  };
  const kickOut = () => {
    axiosClient
      .delete(`/group/kick-out/${group.slug}`, {
        data: { user_id: member.user.id },
      })
      .then(({ data }) => {
        setSuccessMessage(data.message);
        setMembers((prev) =>
          prev.filter((mem) => mem.user.id !== member.user.id),
        );
      })
      .catch((error) => {
        setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
      });
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => setShowMenu((prev) => !prev)}
        className={`absolute top-[10px] right-[10px] z-10 flex justify-center items-center w-[30px] h-[30px] duration-200 `}
      >
        <Entypo
          size={20}
          className="text-gray-500 flex justify-center items-center text-center "
          name="dots-three-vertical"
          color={"#6b7280"}
        />
      </TouchableOpacity>
      {showMenu && (
        <View
          className={`absolute border-gray-700 border-[1px] border-solid top-[45px] right-[10px] z-10 bg-gray-800 w-[120px] duration-300 cursor-pointer rounded-md flex flex-col justify-start items-center overflow-hidden`}
        >
          {member.role == "admin" ? (
            <TouchableOpacity
              onPress={() => {
                changeRole("user");
                setShowMenu(false);
              }}
              className="bg-gray-800 duration-300 flex flex-row gap-2 justify-start items-start w-full py-2 px-4 text-sm font-medium text-gray-300 focus:outline-none text-left"
            >
              <Text className="text-gray-300"> Set As User</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                changeRole("admin");
                setShowMenu(false);
              }}
              className="bg-gray-800 duration-300 flex flex-row gap-2 justify-start items-start w-full py-2 px-4 text-sm font-medium text-gray-300 focus:outline-none text-left"
            >
              <Text className="text-gray-300"> Set As Admin</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => {
              kickOut();
            }}
            className="bg-gray-800 duration-300 flex flex-row gap-2 justify-start items-start w-full py-2 px-4 text-sm font-medium text-gray-300 focus:outline-none text-left"
          >
            <Text className="text-gray-300">Kick Out</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default GroupMemberCardMenu;
