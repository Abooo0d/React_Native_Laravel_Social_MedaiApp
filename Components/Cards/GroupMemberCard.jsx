import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, View } from "react-native";

const GroupMemberCard = ({ member, group }) => {
  // const
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  return (
    // <Pressable
    //   className="w-full"

    // >
    <View
      className=" w-full h-[140px]"
      onPress={() => {
        console.log("ABood");
        router.push(`/pages/Profile/${member.user.username}`);
      }}
    >
      <View className="group relative h-full bg-gray-700/30 backdrop-blur-sm rounded-[8px] border-[1px] border-solid border-gray-500/50 flex flex-col justify-between items-center cursor-pointer duration-200 hover:bg-gray-600/50 hover:border-gray-500 overflow-hidden drop-shadow-2xl">
        {/* {group.owner !== member.user.id && isAdmin && (
          <UserMemberCardMenu
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            member={member}
            group={group}
          />
        )} */}
        <Image
          source={{ uri: member.user.avatar_url }}
          alt=""
          className="absolute top-[10%] left-[10%] w-[90px] z-10 h-[90px] rounded-full border-[1px] border-solid border-gray-500/50 object-cover"
        />
        <Image
          source={{ uri: member.user.cover_url }}
          alt=""
          className="w-full min-h-[100px] max-h-[90px] h-[90px] object-cover"
        />
        <View className="flex justify-between items-center w-full pr-4 h-min-h-[50px] ">
          {/* <Link
            className="flex flex-col justify-start items-start w-full z-10 bg-red-500"
            href={`/pages/Profile/${member.user.username}`}
          > */}
          <Text className="text-gray-300 font-bold mt-1 w-full text-left px-4 z-10">
            {member.user.name}
          </Text>
          <Text className="text-gray-400 mb-2 w-full text-left px-4 text-[13px] -mt-1 z-10">
            {member.user.email}
          </Text>
          {/* </Link> */}
        </View>
        {group.owner == member.user.id ? (
          <Text className="absolute bottom-[10px] right-[10px] backdrop-blur-md border-[1px] border-solid pl-[6px] px-[5px] py-[2px] rounded-sm text-gray-300 text-[10px] opacity-100 duration-200 bg-indigo-800/30 border-indigo-800">
            Owner
          </Text>
        ) : member.role == "admin" ? (
          <Text className="absolute bottom-[10px] right-[10px] backdrop-blur-md border-[1px] border-solid pl-[6px] px-[5px] py-[2px] rounded-sm text-gray-300 text-[10px] opacity-100 duration-200 bg-emerald-600/30 border-emerald-500">
            Admin
          </Text>
        ) : (
          // <Text className="absolute bottom-[10px] right-[10px] backdrop-blur-md border-[1px] border-solid pl-[6px] px-[5px] py-[2px] rounded-sm text-gray-300 text-[10px] opacity-100 duration-200 bg-sky-600/30 border-sky-500">
          //   User
          // </Text>
          <></>
        )}
      </View>
    </View>
  );
};

export default GroupMemberCard;
