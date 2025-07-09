import { createContext, useContext, useState } from "react";
const INITIAL_DATA = {
  showPost: false,
  setShowPost: () => {},
  post: {},
  setPost: () => {},
  image: {},
  setImage: () => {},
  showImage: false,
  setShowImage: () => {},
  user: {},
  setUser: () => {},
  imageIndex: 0,
  setImageIndex: () => {},
};

const Context = createContext(INITIAL_DATA);
export const PostContext = ({ children }) => {
  const [post, setPost] = useState({});
  const [showPost, setShowPost] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [image, setImage] = useState({});
  const [user, setUser] = useState({});
  return (
    <Context.Provider
      value={{
        showPost,
        setShowPost,
        post,
        setPost,
        image,
        setImage,
        showImage,
        setShowImage,
        user,
        setUser,
        imageIndex,
        setImageIndex,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const usePostContext = () => useContext(Context);
