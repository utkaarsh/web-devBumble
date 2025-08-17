import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { timeAgo } from "../utils/helper";

const Chat = () => {
  const user = useSelector((state) => state.user);
  const userId = user?._id;
  const { otherUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const bottomRef = useRef(null);

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + otherUserId, {
      withCredentials: true,
    });

    console.log("Chat Response :: ", chat);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text, createdAt } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        photoUrl: senderId?.photoUrl,
        text,
        msgTime: timeAgo(createdAt),
        isMine: senderId?._id === userId,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    const socket = createSocketConnection();
    if (messages?.length > 5)
      bottomRef?.current?.scrollIntoView({ behaviour: "smooth" });

    if (messages.length > 0) {
      socket.emit("mark-as-seen", { userId, otherUserId });
    }

    socket.on("messagesSeen", ({ seenBy }) => {
      // Mark the last message from current user as seen
      console.log("Message seen budyyy");

      setMessages((prev) =>
        prev.map((msg, idx, arr) => {
          if (
            idx === arr.length - 1 &&
            msg.isMine // Sent by current user
          ) {
            return { ...msg, seen: true };
          }
          return msg;
        })
      );
    });
  }, [messages]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("send-message", {
      firstName: user?.firstName,
      userId,
      lastName: user.lastName,
      otherUserId,
      text: newMessage,
      photoUrl: user.photoUrl,
      createdAt: new Date(),
    });
    setNewMessage("");
  };

  useEffect(() => {
    if (!userId) return;
    console.log("Socket connection on");

    const socket = createSocketConnection();
    socket.on(
      "messageRecieved",
      ({ firstName, lastName, text, photoUrl, createdAt }) => {
        console.log(firstName + " : " + text, createdAt);
        setMessages((messages) => [
          ...messages,
          { firstName, lastName, text, photoUrl, msgTime: timeAgo(createdAt) },
        ]);
      }
    );

    //As soon as th page is loaded the socket connection is made and join-chat event is emmitted
    socket.emit("join-chat", {
      userId,
      otherUserId,
      firstName: user.firstName,
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, otherUserId]);

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 min-h-[90vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>

      {/* display messages */}

      <div className="flex-1 overflow-y-scroll p-5">
        {messages &&
          messages?.map((msg, index) => {
            return (
              <div
                key={index}
                className={`chat ${
                  user.firstName === msg.firstName ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={
                        msg?.photoUrl ||
                        "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                      }
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {`${msg.firstName}  ${msg.lastName}`}
                  <time className="text-xs opacity-50"> {msg?.msgTime}</time>
                </div>
                <div className="chat-bubble text-white">{msg.text}</div>
                <div className="chat-footer opacity-50">
                  {msg.isMine ? (msg.seen ? "Seen" : "Delivered") : ""}
                </div>
              </div>
            );
          })}
        <div ref={bottomRef} /> {/* 👈 Invisible element to scroll to */}
      </div>

      <div className="p-5 border-t border-gray-600 items-center flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border border-gray-600 flex-1 rounded-full p-2"
          placeholder="Type a message ..."
        />
        <button className="btn btn-secondary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
