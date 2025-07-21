import { createContext, useContext, useState } from "react";
const INITIAL_DATA = {
  showFullPostCard: false,
  setShowFullPostCard: () => {},

  showImageFullView: false,
  setShowImageFullView: () => {},

  imageIndex: 0,
  setImageIndex: () => {},

  showImage: false,
  setShowImage: () => {},

  post: {},
  setPost: () => {},

  create: false,
  setCreate: () => {},

  update: false,
  setUpdate: () => {},
};

const Context = createContext(INITIAL_DATA);
export const PostContext = ({ children }) => {
  const [showFullPostCard, setShowFullPostCard] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [showImageFullView, setShowImageFullView] = useState(false);
  const [post, setPost] = useState({});
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);

  return (
    <Context.Provider
      value={{
        showFullPostCard,
        setShowFullPostCard,
        imageIndex,
        setImageIndex,
        showImageFullView,
        setShowImageFullView,
        post,
        setPost,
        create,
        setCreate,
        update,
        setUpdate,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const usePostContext = () => useContext(Context);
