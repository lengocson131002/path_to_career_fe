import { AccountModel } from "@/services/accounts/models";
import { upload } from "@/services/files/services";
import { SendMessageRequest } from "@/services/message/requests";
import { getMessages } from "@/services/message/services";
import { AppState } from "@/stores";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Avatar, Button, Card, Image, Input, MenuProps, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { useEffect, useRef, useState } from "react";
import { FiPaperclip } from "react-icons/fi";
import { ImAttachment } from "react-icons/im";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./ChatBox.css";

type Props = {
  receiver: AccountModel;
  postId: number;
  disable: boolean;
};

function ChatBox({ receiver, postId, disable }: Props) {
  const [connection, setConnection] = useState<HubConnection>();
  const [content, setContent] = useState<string>();
  const { account } = useSelector((state: AppState) => state.user);
  const messageRef = useRef<HTMLDivElement>(null);
  const fileMutation = useMutation((file: RcFile) => upload(file));

  const messages = useQuery([`p2c_message_${postId}`], () =>
    getMessages(postId)
  );

  useEffect(() => {
    if (account) {
      joinRoom(account.id, postId);
    }
    return () => {
      connection?.stop();
    };
  }, []);

  const joinRoom = async (accountId: number, postId: number) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl(import.meta.env.VITE_API_CHAT_URL)
        .build();

      connection.on("ReceiveMessage", () => {
        messages.refetch();
      });

      connection.onclose((e) => {
        connection.invoke("Leave", postId);
        setConnection(undefined);
      });

      await connection.start();
      await connection.invoke("JoinRoom", { accountId, postId });
      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async (sendMessageRequest: SendMessageRequest) => {
    if (sendMessageRequest && connection)
      try {
        await connection.invoke("SendMessage", sendMessageRequest);
        setContent(undefined);
      } catch (e) {
        console.log(e);
      }
  };

  useEffect(() => {
    if (messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, [messages.data]);

  useEffect(() => {
    if (fileMutation.isSuccess && fileMutation) {
      const extension = fileMutation.data?.fileName
        .split(".")
        .pop()
        ?.toLocaleLowerCase();
      if (extension === "png" || extension === "jpg") {
        sendMessage({ type: "Image", content: fileMutation.data.url });
      } else {
        sendMessage({ type: "File", content: fileMutation.data.url });
      }
    }
  }, [fileMutation.isSuccess]);

  const items: MenuProps["items"] = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];
  return (
    <Card className="mt-4">
      <div className="chatbox__header bg-white p-2 pb-4 flex justify-between items-center border-t-0 border-l-0 border-r-0 border-b border-b-gray-100 border-solid">
        <div className="chatbox__header--receiver">
          <div className="flex gap-4">
            <Avatar size={56} src={receiver.avatar} />
            <div className="chatbox__receiver--info self-center">
              <div className="font-medium">{receiver.name}</div>
            </div>
          </div>
        </div>
        <div className="chatbox__header--action mr-2">
          {/* <Dropdown
            menu={{ items }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <a onClick={(e) => e.preventDefault()}>
              <BsThreeDotsVertical
                size={24}
                className="text-p2c-grey cursor-pointer"
              />
            </a>
          </Dropdown> */}
        </div>
      </div>
      <div
        ref={messageRef}
        className="chatbox__body p-2 h-96 w-full pt-5 overflow-y-scroll"
      >
        {messages.data?.map((msg) => (
          <div
            className={`chatbox__message ${
              msg.accountId === account?.id
                ? "chatbox__message--sender"
                : "chatbox__message--receiver"
            }`}
          >
            {(() => {
              switch (msg.type) {
                case "Text": {
                  return <div className="chat__message">{msg.content}</div>;
                }
                case "Image": {
                  return <Image src={msg.content} className="max-w-[200px]" />;
                }
                case "File": {
                  return (
                    <Link to={msg.content} target="_blank">
                      <div className="chat__message flex gap-2 items-center">
                        <ImAttachment />
                        <div>Tệp đính kèm</div>
                      </div>
                    </Link>
                  );
                }
              }
            })()}
            <div className="chat__timestamp">
              {msg.createdAt.format("HH:mm")}
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="chatbox__footer--input p-4 border-0 border-t border-gray-100 border-solid flex items-center gap-4"
      >
        <div className="chatbox__input--extra h-full align-middle">
          <Upload
            disabled={account?.role === "Admin"}
            showUploadList={false}
            beforeUpload={(file: RcFile) => {
              fileMutation.mutate(file);
              return false;
            }}
          >
            <FiPaperclip className="cursor-pointer text-xl" />
          </Upload>
        </div>
        <div className="chatbox__input--message w-full">
          <Input
            placeholder="Nhập nội dung cần gửi"
            className="h-12"
            disabled={account?.role === "Admin" || disable}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <Button
          type="text"
          htmlType="submit"
          onClick={() => {
            content &&
              sendMessage({
                type: "Text",
                content: content,
              });
          }}
        >
          <IoSend className="text-primary text-3xl cursor-pointer" />
        </Button>
      </form>
    </Card>
  );
}

export default ChatBox;
