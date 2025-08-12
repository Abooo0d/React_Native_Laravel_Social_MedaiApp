import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, Modal, Text, TextInput, View } from "react-native";
import axiosClient from "../../Axios/AxiosClient";
import { useMainContext } from "../../Contexts/MainContext";
import InviteUserForGroupCard from "../Cards/InviteUserForGroupCard";
import SecondaryButton from "../Tools/SecondaryButton";
import Notifications from "./../Shared/Notifications";
const InviteUserForm = ({ showForm, setShowForm, group }) => {
  const [name, setName] = useState("");
  const { setSuccessMessage, setErrors } = useMainContext();
  const [searchResults, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [didSearch, setDidSearch] = useState(false);
  function close() {
    setShowForm(false);
  }
  const search = () => {
    setLoading(true);
    setDidSearch(true);
    setSearchResult([]);
    axiosClient
      .post("/user/search", { name: name })
      .then((data) => {
        setSearchResult(data.data.followers);
        setTimeout(() => {
          setLoading(false);
        }, 500);
        setLoading(false);
      })
      .catch((e) => {
        setErrors([e?.response?.data?.message || "Some Thing Went Wrong"]);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  };
  useEffect(() => {
    setName("");
    setLoading(false);
    setDidSearch(false);
    setSearchResult([]);
  }, [showForm]);

  return (
    <Modal
      visible={showForm}
      animationType="slide"
      transparent={false}
      navigationBarTranslucent={true}
      statusBarTranslucent={true}
      backdropColor={"#111827"}
    >
      <View className="flex relative my-auto py-4 min-h-[100vh] max-h-[100vh] min-w-[100vw] z-10 justify-start p-4 items-start overflow-hidden gap-4 bg-gray-900">
        <Notifications />
        <View className="flex flex-row justify-between items-center w-full">
          <View className="text-base/7 font-medium text-white">
            <Text className="text-base/7 font-medium text-white">
              Invite Users
            </Text>
          </View>
          <SecondaryButton
            event={() => {
              close();
            }}
            classes={" py-1.5 px-3 z-[100]"}
          >
            <Text className="text-gray-400 ">
              <FontAwesome6 name="xmark" size={24} />
            </Text>
          </SecondaryButton>
        </View>
        <View className="w-full flex justify-start items-start relative">
          <Text className="text-gray-300 text-xl mb-2">The User Name</Text>
          <TextInput
            placeholder="name or email"
            className="bg-gray-800 w-full placeholder:text-gray-500 text-gray-300 px-4 text-2xl rounded-md h-[50px] border-[1px] border-solid border-gray-600/50"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <SecondaryButton
            classes="absolute w-[35px] h-[35px] top-[37px] right-[10px]"
            event={() => {
              search();
            }}
          >
            <Text className="text-gray-400">
              <Feather name="search" size={22} />
            </Text>
          </SecondaryButton>
        </View>
        <View className="flex-1 min-w-full flex justify-start items-center p-4 rounded-md">
          {didSearch ? (
            <>
              <>
                {loading ? (
                  <ActivityIndicator size="large" color="#6b7280" />
                ) : (
                  <>
                    {searchResults.length > 0 ? (
                      <>
                        {searchResults?.map((user, index) => (
                          <InviteUserForGroupCard
                            key={index}
                            user={user}
                            group={group}
                            setShowForm={setShowForm}
                          />
                        ))}
                      </>
                    ) : (
                      <View className="w-full text-gray-500 text-center p-4">
                        <Text className="text-gray-400">
                          No One With This Name
                        </Text>
                      </View>
                    )}
                  </>
                )}
              </>
            </>
          ) : (
            <View className="flex justify-center items-center gap-4 min-h-[400px]">
              <Text className="text-gray-600">
                <FontAwesome6
                  size={80}
                  className="text-gray-300"
                  name="user-group"
                />
              </Text>
              <Text className="text-gray-600 text-[30px]">
                Search For Users
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default InviteUserForm;
