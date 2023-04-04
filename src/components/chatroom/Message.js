import React from "react";
import { auth } from "lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./message.css";
import { format } from "date-fns";

const Message = ({ message, senderUsername, senderAvatar }) => {
  const [user] = useAuthState(auth);
  const createdAtDate = message.createdAt ? message.createdAt.toDate() : new Date();
  const formattedDate = format(createdAtDate, "MMM dd, yyyy h:mm a");
  const isCurrentUser = message.senderUid === user.uid;

  return (
    <div>
      {!isCurrentUser && <p className="user-name">{senderUsername}</p>}
      <div className={`chat-bubble ${isCurrentUser ? "right" : ""}`}>
        <div className="chat-bubble__header">
          <img
            className="chat-bubble__avatar"
            src={senderAvatar ? senderAvatar : "https://i1.sndcdn.com/avatars-000814718707-r3bm0d-t500x500.jpg"}
            alt="avatar pic"
          />
        </div>
        <div className={`chat-bubble__content ${isCurrentUser ? "right" : ""}`}>
          <p className="user-message">{message.text}</p>
      <p className="message-date">{formattedDate}</p>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
};

export default Message;