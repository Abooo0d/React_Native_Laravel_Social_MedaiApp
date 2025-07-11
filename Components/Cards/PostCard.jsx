import { useEffect, useState } from "react";
import { View } from "react-native";
import { usePostContext } from "../../Contexts/PostContext";
import PostCardMenu from "../Shared/PostCardMenu";
import PostCardOwnerInfo from "../Shared/PostCardOwnerInfo";
import PostCardPostActions from "../Shared/PostCardPostActions";
import PostCardPostAttachments from "../Shared/PostCardPostAttachments";
import PostCardPostBody from "../Shared/PostCardPostBody";
import PostCommentSection from "../Shared/PostCommentSection";

const PostCard = ({ post, refetch }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [localPost, setLocalPost] = useState(post);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const { setShowPost } = usePostContext();
  useEffect(() => {
    setOpenMenu(false);
  }, []);

  useEffect(() => {
    setLocalPost(post);
  }, [post]);

  return (
    <>
      <View
        className={` w-full h-fit bg-gray-900 py-4 px-4 flex flex-col duration-500`}
      >
        <View className="flex flex-row justify-between items-center">
          <PostCardOwnerInfo post={localPost} />
          <PostCardMenu post={localPost} refetch={refetch} />
        </View>
        <PostCardPostBody content={localPost.body} />
        <PostCardPostAttachments post={localPost} />
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
    </>
  );
};

export default PostCard;
