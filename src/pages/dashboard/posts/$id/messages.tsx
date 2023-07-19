import ChatBox from "@/components/chat/ChatBox";
import { getPostDetail } from "@/services/posts/services";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function Messages() {
  const { id } = useParams();
  const postDetail = useQuery([`p2c_post_${id}`], () => {
    if (id) {
      return getPostDetail(id);
    }
  });

  return (
    postDetail.data?.account &&
    id && (
      <ChatBox
        receiver={postDetail.data?.account}
        postId={+id}
        post={postDetail.data}
        disable={postDetail.data.status !== "Accepted"}
      ></ChatBox>
    )
  );
}

export default Messages;
