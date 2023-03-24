import React from "react";
import { auth } from "lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./message.css";
const Message = ({ message, senderUsername, senderAvatar }) => {
  const [user] = useAuthState(auth);

  return (
    <div className={`chat-bubble ${message.senderUid === user.uid ? "right" : ""}`}>
      <img className="chat-bubble__left" src={senderAvatar} alt="avatar pic"/>
      <div className="chat-bubble__right">
        <p className="user-name">{senderUsername}</p>
        <p className="user-message">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
