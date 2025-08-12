import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";
import { useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import axiosClient from "../../../../Axios/AxiosClient";
import GroupMemberCard from "../../../../Components/Cards/GroupMemberCard";
import GroupRequestCard from "../../../../Components/Cards/GroupRequestCard";
import PostCard from "../../../../Components/Cards/PostCard";
import ProfileImageFullView from "../../../../Components/Cards/ProfileImageFullView";
import DeleteGroupForm from "../../../../Components/Shared/DeleteGroupForm";
import EditGroupInfoForm from "../../../../Components/Shared/EditGroupInfoForm";
import PostLoader from "../../../../Components/Tools/PostLoader";
import ProfileLoader from "../../../../Components/Tools/ProfileLoader";
import { useMainContext } from "../../../../Contexts/MainContext";
import {
  useGetGroup,
  useGetPostsForGroup,
} from "../../../../TanStackQurey/Querys";

const GroupProfile = () => {
  const { slug } = useGlobalSearchParams();
  const {
    data: groupData,
    isLoading,
    refetch: refetchData,
    error,
  } = useGetGroup(slug);
  const {
    isLoading: isLoadingPosts,
    data: postsData,
    refetch: refetchPosts,
  } = useGetPostsForGroup(slug);
  const { setSuccessMessage, setErrors } = useMainContext();
  const [showImageFullView, setShowImageFullView] = useState(false);
  const [image, setImage] = useState({});
  const [photos, setPhotos] = useState([]);
  const [allData, setAllData] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [tab, setTab] = useState("posts");
  const [group, setGroup] = useState({});
  const [members, setMembers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoadingCoverImage, setIsLoadingCoverImage] = useState(false);
  const [isLoadingAvatarImage, setIsLoadingAvatarImage] = useState(false);
  const [showCoverOptions, setShowCoverOptions] = useState(false);
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);
  const [coverImage, setCoverImage] = useState({});
  const [thumbnailImage, setThumbnailImage] = useState({});
  const [isTheCoverChanged, setIsTheCoverChanged] = useState(false);
  const [isThumbnailChanged, setIsThumbnailChanged] = useState(false);

  const changeCoverImage = () => {
    launchImageLibrary(
      { mediaType: "photo", selectionLimit: 1 },
      (response) => {
        if (response.didCancel) return;
        else if (response.errorCode) return;
        else {
          let file = response.assets;
          setCoverImage(file[0]);
          setIsTheCoverChanged(true);
        }
      },
    );
  };
  const resetCoverImage = () => {
    setCoverImage("");
    setIsTheCoverChanged(false);
  };
  const submitCoverImage = () => {
    try {
      setIsLoadingCoverImage(true);
      if (!isTheCoverChanged) return;
      const formData = new FormData();
      console.log(group.id);

      formData.append("group_id", group.id);
      formData.append("coverImage", {
        uri: coverImage.uri,
        name: coverImage.fileName || `file_${index}.jpg`,
        type: coverImage.type || "image/jpeg",
      });
      axiosClient
        .post("/group/change_images", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ data }) => {
          setSuccessMessage(data.message);
          setGroup(data.group);
          setCoverImage({});
          setIsTheCoverChanged(false);
          setShowCoverOptions(false);
          setIsLoadingCoverImage(false);
        })
        .catch((err) => {
          setErrors([err?.response?.data?.message || "Some Thing Went Wrong"]);
          setIsLoadingCoverImage(false);
        });
    } catch (error) {
      setErrors([err?.response?.data?.message || "Some Thing Went Wrong"]);
      setIsLoadingCoverImage(false);
    }
  };
  const changeAvatarImage = () => {
    launchImageLibrary(
      { mediaType: "photo", selectionLimit: 1 },
      (response) => {
        if (response.didCancel) return;
        else if (response.errorCode) return;
        else {
          let file = response.assets;
          setThumbnailImage(file[0]);
          setIsThumbnailChanged(true);
        }
      },
    );
  };
  const resetAvatarImage = () => {
    setThumbnailImage("");
    setIsThumbnailChanged(false);
  };
  const submitAvatarImage = () => {
    try {
      setIsLoadingAvatarImage(true);
      if (!isThumbnailChanged) return;
      const formData = new FormData();
      formData.append("group_id", group.id);
      console.log(group.id);
      formData.append("avatarImage", {
        uri: thumbnailImage.uri,
        name: thumbnailImage.fileName || `file_${index}.jpg`,
        type: thumbnailImage.type || "image/jpeg",
      });
      axiosClient
        .post("/group/change_images", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ data }) => {
          setSuccessMessage(data.message);
          setGroup(data.group);
          setThumbnailImage({});
          setIsThumbnailChanged(false);
          setShowAvatarOptions(false);
          setIsLoadingAvatarImage(false);
        })
        .catch((err) => {
          setErrors([err?.response?.data?.message || "Some Thing Went Wrong"]);
          setIsLoadingAvatarImage(false);
        });
    } catch (error) {
      setErrors([err?.response?.data?.message || "Some Thing Went Wrong"]);
      setIsLoadingAvatarImage(false);
    }
  };
  useEffect(() => {
    setAllData(postsData?.posts);
    setAllPosts(postsData?.posts?.data);
    setPhotos(postsData?.photos);
  }, [postsData]);
  useEffect(() => {
    setGroup(groupData?.group);
    setMembers(groupData?.users);
    setRequests(groupData?.requests);
    setIsAdmin(groupData?.isAdmin);
  }, [groupData]);

  return (
    <>
      <ScrollView
        className="w-full h-fit bg-homeFeed "
        contentContainerStyle={{
          width: "100%",
          flexGrow: 1,
          height: "auto",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 8,
        }}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <ProfileLoader />
        ) : (
          <>
            <View className="max-h-[315px] h-full w-full relative bg-gray-900">
              <Pressable
                className="w-full h-[200px] relative"
                onPress={() => {
                  setShowCoverOptions((Prev) => !Prev);
                }}
              >
                {isAdmin && (
                  <>
                    {showCoverOptions && (
                      <>
                        {isLoadingCoverImage ? (
                          <ActivityIndicator
                            size="large"
                            color="#6b7280"
                            className="absolute top-[10px] right-[10px] z-10 "
                          />
                        ) : (
                          <View className="absolute top-[10px] right-[10px] z-10 flex flex-row justify-start items-center gap-2">
                            {isTheCoverChanged ? (
                              <>
                                <TouchableOpacity
                                  className="w-[90px] bg-gray-900 rounded-md px-4 py-2 flex flex-row gap-2"
                                  onPress={() => resetCoverImage()}
                                >
                                  <Text className="text-gray-400">
                                    <FontAwesome6 name="xmark" size={20} />
                                  </Text>
                                  <Text className="text-[16px] font-semibold text-gray-400 ">
                                    Cancel
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  className="w-[90px] bg-gray-100 rounded-md px-4 py-2 flex flex-row gap-2"
                                  onPress={() => {
                                    submitCoverImage();
                                  }}
                                >
                                  <Text className="text-gray-900">
                                    <AntDesign name="check" size={20} />
                                  </Text>
                                  <Text className="text-[16px] font-semibold text-gray-900">
                                    submit
                                  </Text>
                                </TouchableOpacity>
                              </>
                            ) : (
                              <TouchableOpacity
                                className="w-[170px] bg-gray-100 rounded-md px-4 py-2 flex flex-row gap-2"
                                onPress={() => {
                                  changeCoverImage();
                                }}
                              >
                                <Text className="text-gray-950">
                                  <Feather
                                    name="camera"
                                    size={20}
                                    color="black"
                                  />
                                </Text>
                                <Text className="text-[16px] font-semibold text-gray-950">
                                  Change Cover Image
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        )}
                      </>
                    )}
                  </>
                )}
                <Image
                  className="w-full h-[200px] object-cover "
                  source={{
                    uri: isTheCoverChanged ? coverImage?.uri : group?.cover_url,
                  }}
                />
              </Pressable>
              <Pressable
                className="absolute top-[40px] left-[20px] w-[120px] h-[120px] rounded-full z-10"
                onPress={() => {
                  setShowAvatarOptions((prev) => !prev);
                }}
              >
                {isAdmin && (
                  <>
                    {showAvatarOptions && (
                      <>
                        {isLoadingAvatarImage ? (
                          <ActivityIndicator
                            size="large"
                            color="#6b7280"
                            className="absolute z-10 w-[120px] h-[120px] flex justify-center items-center"
                          />
                        ) : (
                          <View className="absolute w-[120px] h-[120px] z-10 flex flex-row justify-center items-center gap-2">
                            {isThumbnailChanged ? (
                              <>
                                <TouchableOpacity
                                  className="w-[40px] bg-gray-900 rounded-md px-4 py-2 flex flex-row gap-2"
                                  onPress={() => {
                                    resetAvatarImage();
                                  }}
                                >
                                  <Text className="text-gray-100">
                                    <FontAwesome6 name="xmark" size={20} />
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  className="w-[40px] bg-gray-100 rounded-md px-4 py-2 flex flex-row gap-2"
                                  onPress={() => {
                                    submitAvatarImage();
                                  }}
                                >
                                  <Text className="text-gray-900">
                                    <AntDesign name="check" size={20} />
                                  </Text>
                                </TouchableOpacity>
                              </>
                            ) : (
                              <TouchableOpacity
                                className="w-[40px] bg-gray-100 rounded-md px-2 py-2 flex flex-row gap-2 justify-center items-center"
                                onPress={() => {
                                  changeAvatarImage();
                                }}
                              >
                                <Text className="text-gray-950">
                                  <Feather
                                    name="camera"
                                    size={20}
                                    color="black"
                                  />
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        )}
                      </>
                    )}
                  </>
                )}
                <Image
                  className=" w-[120px] h-[120px] rounded-full"
                  source={{
                    uri: isThumbnailChanged
                      ? thumbnailImage?.uri
                      : group?.thumbnail_url,
                  }}
                />
              </Pressable>
              <View className="bg-gray-900 flex flex-col px-10 py-2 pl-8 border-b-[1px] border-b-gray-700/50 border-b-solid">
                <Text className="text-gray-300 text-2xl font-bold mb-2">
                  {group?.name}
                </Text>
                <Text className="text-gray-500 text-[20px] font-bold ">
                  {group?.about}
                </Text>
              </View>
              <View className="w-full flex flex-row gap-2 py-1 px-8">
                <Pressable
                  onPress={() => {
                    setTab("posts");
                  }}
                >
                  <View
                    className={`py-2 px-3 border-b-gray-700/50 border-b-solid border-b-[2px] ${
                      tab == "posts"
                        ? "border-b-gray-700/50"
                        : "border-transparent"
                    }`}
                  >
                    <Text className="text-gray-400">Posts</Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setTab("photos");
                  }}
                >
                  <View
                    className={`py-2 px-3 border-b-gray-700/50 border-b-solid border-b-[2px] ${
                      tab == "photos"
                        ? "border-b-gray-700/50"
                        : "border-transparent"
                    }`}
                  >
                    <Text className="text-gray-400">Photos</Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setTab("members");
                  }}
                >
                  <View
                    className={`py-2 px-3 border-b-gray-700/50 border-b-solid border-b-[2px] ${
                      tab == "members"
                        ? "border-b-gray-700/50"
                        : "border-transparent"
                    }`}
                  >
                    <Text className="text-gray-400">Members</Text>
                  </View>
                </Pressable>
                {isAdmin && (
                  <>
                    <Pressable
                      onPress={() => {
                        setTab("requests");
                      }}
                    >
                      <View
                        className={`py-2 px-3 border-b-gray-700/50 border-b-solid border-b-[2px] ${
                          tab == "requests"
                            ? "border-b-gray-700/50"
                            : "border-transparent"
                        }`}
                      >
                        <Text className="text-gray-400">requests</Text>
                      </View>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        setTab("about");
                      }}
                    >
                      <View
                        className={`py-2 px-3 border-b-gray-700/50 border-b-solid border-b-[2px] ${
                          tab == "about"
                            ? "border-b-gray-700/50"
                            : "border-transparent"
                        }`}
                      >
                        <Text className="text-gray-400">About</Text>
                      </View>
                    </Pressable>
                  </>
                )}
              </View>
            </View>
            {tab == "posts" && (
              <View className={`w-full h-fit flex flex-col gap-[8px]`}>
                {isLoadingPosts ? (
                  <PostLoader />
                ) : (
                  <>
                    {postsData?.posts && (
                      <>
                        {postsData?.posts?.data?.length > 0 ? (
                          <>
                            {allPosts?.length > 0 ? (
                              <>
                                {allPosts?.length > 0 &&
                                  allPosts?.map((post, index) => (
                                    <PostCard
                                      post={post}
                                      key={index}
                                      refetch={refetchPosts}
                                    />
                                  ))}
                                {allData?.meta?.current_page <
                                allData?.meta?.last_page ? (
                                  <View className="w-full flex justify-center items-center">
                                    <ActivityIndicator
                                      size="large"
                                      color="#6b7280"
                                    />
                                  </View>
                                ) : (
                                  <View className="w-full py-4 px-4 flex justify-center items-center ">
                                    <Text className="text-gray-600">
                                      No More Posts
                                    </Text>
                                  </View>
                                )}
                              </>
                            ) : (
                              <PostLoader />
                            )}
                          </>
                        ) : (
                          <>
                            {!!!postsData && (
                              <View className="w-full py-4  px-4">
                                <Text className="text-gray-600 text-center">
                                  No Posts To Show
                                </Text>
                              </View>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </View>
            )}
            {tab == "photos" && (
              <View
                className={`w-full h-fit flex flex-col gap-[8px] px-2 pb-8`}
              >
                {photos?.map((image, index) => (
                  <Pressable
                    onPress={() => {
                      setImage(image);
                      setShowImageFullView(true);
                    }}
                    key={index}
                    className="flex min-w-full min-h-[250px] max-h-[250px] rounded-md overflow-hidden"
                  >
                    <Image
                      source={{ uri: image.url }}
                      className="min-w-full max-h-[250px] min-h-[250px] rounded-md"
                    />
                  </Pressable>
                ))}
              </View>
            )}
            {tab == "members" && (
              <View
                className={`w-full h-fit flex flex-col gap-[8px] px-2 pb-8`}
              >
                {members?.map((member, index) => (
                  <GroupMemberCard member={member} group={group} key={index} />
                ))}
              </View>
            )}
            {isAdmin && (
              <>
                {tab == "requests" && (
                  <View
                    className={`w-full h-fit flex flex-col gap-[8px] px-2 pb-8`}
                  >
                    {requests?.map((request, index) => (
                      <GroupRequestCard
                        request={request}
                        group={group}
                        key={index}
                        setRequestsData={setRequests}
                      />
                    ))}
                  </View>
                )}
                {tab == "about" && (
                  <View className="flex gap-2 pb-8 w-full">
                    <EditGroupInfoForm group={group} />
                    <DeleteGroupForm group={group} />
                  </View>
                )}
              </>
            )}
          </>
        )}
      </ScrollView>
      <ProfileImageFullView
        showImage={showImageFullView}
        setShowImage={setShowImageFullView}
        image={image}
      />
    </>
  );
};

export default GroupProfile;
