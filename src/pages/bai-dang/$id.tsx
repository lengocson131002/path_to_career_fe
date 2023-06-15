import PostDetail from "@/components/posts/PostDetail";
import PostDetailChat from "@/components/posts/PostDetailChat";
import { getPostDetail } from "@/services/posts/services";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const PostDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery([`p2c_post_${id}`], () => {
    if (id) {
      return getPostDetail(id);
    }
  });
  let [searchParams, setSearchParams] = useSearchParams();
  const [showChat, setShowChat] = useState(
    searchParams.get("chat") === "true" ?? false
  );
  useEffect(() => {
    if (searchParams.get("chat") === "true") {
      setShowChat(true);
    }
  }, [searchParams]);

  return (
    data &&
    (!showChat ? (
      <PostDetail
        post={data}
        isLoading={isLoading}
        setShowChat={setShowChat}
      ></PostDetail>
    ) : (
      <PostDetailChat
        post={data}
        isLoading={isLoading}
        setShowChat={setShowChat}
      ></PostDetailChat>
    ))
  );
};

export default PostDetailPage;
