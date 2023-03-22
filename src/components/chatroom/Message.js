import React from "react";
import { auth } from "lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  console.log(message.avatar, message.username);
  return (
    <div
      className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
      <img
        className="chat-bubble__left"
        src={message.avatar}
        alt="user avatar"
      />
      <div className="chat-bubble__right">
        <p className="user-name">{message.username}</p>
        <p className="user-message">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;