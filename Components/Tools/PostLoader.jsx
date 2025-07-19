import { View } from "react-native";

const PostLoader = () => {
  return (
    <View className=" flex justify-start items-center w-full gap-[4px]">
      <View className="w-full min-h-barHeight flex justify-start items-center flex-col gap-3">
        <View
          className={`max-w-[700px] w-full dark:bg-gray-900 bg-gray-200 rounded-lg pt-4 pb-0 lg:px-6 px-4 flex flex-col duration-500 `}
        >
          <View className="flex justify-between items-center flex-row">
            <View className="flex flex-row justify-center items-center gap-[10px]">
              <View className="rounded-full bg-gray-700 w-[60px] h-[60px] animate-pulse duration-200" />
              <View className="flex gap-4 flex-col">
                <View className="w-[150px] h-[8px] rounded-full bg-gray-700 animate-pulse duration-200" />
                <View className="w-[100px] h-[5px] rounded-full bg-gray-700 animate-pulse duration-200" />
              </View>
            </View>
            <View className="w-[40px] h-[40px] bg-gray-700 rounded-md animate-pulse duration-200" />
          </View>
          <View className="flex flex-col w-full my-8 py-4 px-4">
            <View className="space-y-2.5 animate-pulse max-w-lg">
              <View className="w-full h-[8px] rounded-full bg-gray-700 animate-pulse duration-200 mb-4 " />
              <View className="w-full h-[8px] rounded-full bg-gray-700 animate-pulse duration-300 mb-4" />
              <View className="w-full h-[8px] rounded-full bg-gray-700 animate-pulse duration-400 mb-4" />
              <View className="w-full h-[8px] rounded-full bg-gray-700 animate-pulse duration-500 mb-4" />
              <View className="w-[60%] h-[8px] rounded-full bg-gray-700 animate-pulse duration-600 mb-4" />
            </View>
          </View>
        </View>
      </View>
      <View className="w-full min-h-barHeight flex justify-start items-center flex-col gap-3">
        <View
          className={`max-w-[700px] w-full dark:bg-gray-900 bg-gray-200 rounded-lg pt-4 pb-0 lg:px-6 px-4 flex flex-col duration-500 `}
        >
          <View className="flex justify-between items-center flex-row">
            <View className="flex flex-row justify-center items-center gap-[10px]">
              <View className="rounded-full bg-gray-700 w-[60px] h-[60px] animate-pulse duration-200" />
              <View className="flex gap-4 flex-col">
                <View className="w-[150px] h-[8px] rounded-full bg-gray-700 animate-pulse duration-200" />
                <View className="w-[100px] h-[5px] rounded-full bg-gray-700 animate-pulse duration-200" />
              </View>
            </View>
            <View className="w-[40px] h-[40px] bg-gray-700 rounded-md animate-pulse duration-200" />
          </View>
          <View className="flex flex-col w-full my-8 py-4 px-4">
            <View className="space-y-2.5 animate-pulse max-w-lg">
              <View className="w-full h-[8px] rounded-full bg-gray-700 animate-pulse duration-200 mb-4 " />
              <View className="w-full h-[8px] rounded-full bg-gray-700 animate-pulse duration-300 mb-4" />
              <View className="w-full h-[8px] rounded-full bg-gray-700 animate-pulse duration-400 mb-4" />
              <View className="w-full h-[8px] rounded-full bg-gray-700 animate-pulse duration-500 mb-4" />
              <View className="w-[60%] h-[8px] rounded-full bg-gray-700 animate-pulse duration-600 mb-4" />
            </View>
          </View>
        </View>
      </View>
      <View className="w-full min-h-barHeight flex justify-start items-center flex-col gap-3">
        <View
          className={`max-w-[700px] w-full dark:bg-gray-900 bg-gray-200 rounded-lg pt-4 pb-0 lg:px-6 px-4 flex flex-col duration-500 `}
        >
          <View className="flex justify-between items-center flex-row">
            <View className="flex flex-row justify-center items-center gap-[10px]">
              <View className="rounded-full bg-gray-700 w-[60px] h-[60px] animate-pulse duration-200" />
              <View className="flex gap-4 flex-col">
                <View className="w-[150px] h-[8px] rounded-full bg-gray-700 animate-pulse duration-200" />
                <View className="w-[100px] h-[5px] rounded-full bg-gray-700 animate-pulse duration-200" />
              </View>
            </View>
            <View className="w-[40px] h-[40px] bg-gray-700 rounded-md animate-pulse duration-200" />
          </View>
          <View className="flex flex-col w-full my-8 py-4 px-4">
            <View className="space-y-2.5 animate-pulse max-w-lg">
              <View className="w-full h-[8px] rounded-full bg-gray-700 animate-pulse duration-200 mb-4 " />
              <View className="w-full h-[8px] rounded-full bg-gray-700 animate-pulse duration-300 mb-4" />
              <View className="w-full h-[8px] rounded-full bg-gray-700 animate-pulse duration-400 mb-4" />
              <View className="w-full h-[8px] rounded-full bg-gray-700 animate-pulse duration-500 mb-4" />
              <View className="w-[60%] h-[8px] rounded-full bg-gray-700 animate-pulse duration-600 mb-4" />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostLoader;
