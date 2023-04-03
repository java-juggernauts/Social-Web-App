import React from "react";
import { auth } from "lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./message.css";
import { format } from "date-fns";

const Message = ({ message, senderUsername, senderAvatar }) => {
  const [user] = useAuthState(auth);
  const createdAtDate = message.createdAt ? message.createdAt.toDate() : new Date();
  const formattedDate = format(createdAtDate, "MMM dd, yyyy h:mm a");

  return (
    <div className={`chat-bubble ${message.senderUid === user.uid ? "right" : ""}`}>
      <img className="chat-bubble__left" src={senderAvatar ? senderAvatar : "https://i1.sndcdn.com/avatars-000814718707-r3bm0d-t500x500.jpg"} alt="avatar pic" />
      <div className="chat-bubble__right">
        <p className="user-name">{senderUsername}</p>
        <p className="user-message">{message.text}</p>
        <p className="message-date">{formattedDate}</p>
      </div>
    </div>
  );
};

export default Message;
