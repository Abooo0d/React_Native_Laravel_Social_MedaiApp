import { useMainContext } from "@/Contexts/MainContext";
import { useUserContext } from "@/Contexts/UserContext";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../Axios/AxiosClient";
import { QUERY_KEYS } from "./QueryKeys";
export const useGetPosts = () => {
  const { setErrors } = useMainContext();
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POSTS],
    queryFn: () =>
      axiosClient
        .get("/get-posts")
        .then(({ data }) => {
          return data;
        })
        .catch((error) => {
          setErrors([
            error?.response?.data?.message || "Some Thing Went Wrong",
          ]);
        }),
  });
};
export const useGetNotifications = () => {
  const { setErrors } = useMainContext();
  return useQuery({
    queryKey: [QUERY_KEYS.GET_NOTIFICATIONS],
    queryFn: () =>
      axiosClient
        .get(route("getNotifications"))
        .then(({ data }) => {
          return data;
        })
        .catch((error) => {
          setErrors([
            error?.response?.data?.message || "Some Thing Went Wrong",
          ]);
        }),
  });
};
export const useGetGroups = () => {
  const { user } = useUserContext();
  const { setErrors } = useMainContext();
  return useQuery({
    queryKey: [QUERY_KEYS.GET_GROUPS],
    queryFn: () => {
      if (!user?.id) return [];
      axiosClient
        .get(route("getGroups"))
        .then(({ data }) => {
          return data;
        })
        .catch((error) => {
          setErrors([
            error?.response?.data?.message || "Some Thing Went Wrong",
          ]);
        });
    },
  });
};
export const useGetChatGroups = () => {
  const { setErrors } = useMainContext();
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CHAT_GROUPS],
    queryFn: () =>
      axiosClient
        .get(route("getChatGroups"))
        .then(({ data }) => {
          return data;
        })
        .catch((error) => {
          setErrors([
            error?.response?.data?.message || "Some Thing Went Wrong",
          ]);
        }),
  });
};
export const useGetMoreMessages = (messageId) => {
  const { setErrors } = useMainContext();
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MORE_MESSAGES],
    queryFn: () =>
      axiosClient
        .get(route("getMoreMessages", messageId))
        .then(({ data }) => {
          return data;
        })
        .catch((error) => {
          setErrors([
            error?.response?.data?.message || "Some Thing Went Wrong",
          ]);
        }),
  });
};
export const useGetPostsForGroup = (groupId) => {
  const { setErrors } = useMainContext();
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POSTS_FOR_GROUP],
    queryFn: () =>
      axiosClient
        .get(route("postsForGroup", groupId))
        .then(({ data }) => {
          return data;
        })
        .catch((error) => {
          setErrors([
            error?.response?.data?.message || "Some Thing Went Wrong",
          ]);
        }),
  });
};
export const useGetPostsForUser = (userId) => {
  const { setErrors } = useMainContext();
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POSTS_FOR_USER],
    queryFn: () =>
      axiosClient
        .get(route("postsForUser", userId))
        .then(({ data }) => {
          return data;
        })
        .catch((error) => {
          setErrors([
            error?.response?.data?.message || "Some Thing Went Wrong",
          ]);
        }),
  });
};
