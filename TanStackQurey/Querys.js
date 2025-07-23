import { useMainContext } from "@/Contexts/MainContext";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../Axios/AxiosClient";
import { QUERY_KEYS } from "./QueryKeys";
export const useGetPosts = (user) => {
  const { setErrors } = useMainContext();
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POSTS],
    queryFn: async () => {
      if (!user?.id) return Promise.resolve([]);
      return axiosClient
        .get("/get-posts")
        .then(({ data }) => {
          return data;
        })
        .catch((error) => {
          setErrors([
            error?.response?.data?.message || "Some Thing Went Wrong",
          ]);
        });
    },
    enabled: !!user,
  });
};
export const useGetNotifications = (user) => {
  const { setErrors } = useMainContext();
  return useQuery({
    queryKey: [QUERY_KEYS.GET_NOTIFICATIONS],
    queryFn: async () => {
      if (!user?.id) return Promise.resolve([]);
      return axiosClient
        .get("/get-notifications")
        .then(({ data }) => {
          return data;
        })
        .catch((error) => {
          setErrors([
            error?.response?.data?.message || "Some Thing Went Wrong",
          ]);
        });
    },
    enabled: !!user,
  });
};
export const useGetGroups = (user) => {
  const { setErrors } = useMainContext();
  return useQuery({
    queryKey: [QUERY_KEYS.GET_GROUPS],
    queryFn: async () => {
      if (!user?.id) return Promise.resolve([]);
      return axiosClient
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
    enabled: !!user,
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
export const useGetPostsForUser = (username) => {
  const { setErrors } = useMainContext();
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POSTS_FOR_USER],
    queryFn: () =>
      axiosClient
        .get(`profile/posts/${username}`)
        .then(({ data }) => {
          return data;
        })
        .catch((error) => {
          setErrors([
            error?.response?.data?.message || "Some Thing Went Wrong",
          ]);
        }),
    enabled: !!username,
  });
};
export const useGetUser = (username) => {
  const { setErrors } = useMainContext();
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER],
    queryFn: async () => {
      if (!username) return Promise.resolve({});
      return axiosClient
        .get(`/profile/${username}`)
        .then(({ data }) => {
          return data;
        })
        .catch((error) => {
          setErrors([
            error?.response?.data?.message || "Some Thing Went Wrong",
          ]);
          return {};
        });
    },
    enabled: !!username,
  });
};
