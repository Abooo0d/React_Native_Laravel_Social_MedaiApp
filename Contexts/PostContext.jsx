import { createContext, useContext, useState } from "react";
const INITIAL_DATA = {
  showPost: false,
  setShowPost: () => {},
  post: {},
  setPost: () => {},
  showImage: false,
  setShowImage: () => {},
  user: {},
  setUser: () => {},
  imageIndex: 0,
  setImageIndex: () => {},
  create: false,
  setCreate: () => {},
};

const Context = createContext(INITIAL_DATA);
export const PostContext = ({ children }) => {
  const [post, setPost] = useState({});
  const [showPost, setShowPost] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [user, setUser] = useState({});
  const [create, setCreate] = useState(false);
  return (
    <Context.Provider
      value={{
        showPost,
        setShowPost,
        post,
        setPost,
        showImage,
        setShowImage,
        user,
        setUser,
        imageIndex,
        setImageIndex,
        create,
        setCreate,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const usePostContext = () => useContext(Context);
