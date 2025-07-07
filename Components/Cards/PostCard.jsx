import { useEffect, useState } from "react";
import { View } from "react-native";
import { useUserContext } from "../../Contexts/UserContext";
import PostCardMenu from "../Shared/PostCardMenu";
import PostCardOwnerInfo from "../Shared/PostCardOwnerInfo";
import PostCardPostActions from "../Shared/PostCardPostActions";
import PostCardPostAttachments from "../Shared/PostCardPostAttachments";
import PostCardPostBody from "../Shared/PostCardPostBody";
import PostCommentSection from "../Shared/PostCommentSection";

const PostCard = ({ post, refetch }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useUserContext();
  const [showPost, setShowPost] = useState(false);
  const [image, setImage] = useState("");
  const [showImage, setShowImage] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [localPost, setLocalPost] = useState(post);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setOpenMenu(false);
  }, []);
  useEffect(() => {
    setLocalPost(post);
  }, [post]);
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 500);
  }, [localPost]);

  return (
    <View
      className={` w-full h-fit bg-gray-900 rounded-lg py-4 px-4 flex flex-col duration-500`}
    >
      <View className="flex flex-row justify-between items-center">
        <PostCardOwnerInfo
          post={localPost}
          refetch={refetch}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          currentUser={user}
        />
        <PostCardMenu post={localPost} />
      </View>
      <PostCardPostBody content={localPost.body} />
      <PostCardPostAttachments
        post={localPost}
        setImage={setImage}
        setShowImage={setShowImage}
        setShowPost={setShowPost}
        setImageIndex={setImageIndex}
      />
      <PostCardPostActions
        post={localPost}
        setPost={setLocalPost}
        setShowCommentSection={setShowCommentSection}
      />
      <PostCommentSection
        show={showCommentSection}
        post={localPost}
        setPost={setLocalPost}
      />
    </View>
  );
};

export default PostCard;
