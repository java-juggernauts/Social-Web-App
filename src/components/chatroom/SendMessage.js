import React, { useState } from "react";
import { auth, db } from "lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import "./message.css";
const SendMessage = ({ scroll, selectedUser }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
   const participantsUIDs = [auth.currentUser.uid, selectedUser.id].sort().join("-");
   const { uid } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: message,
      createdAt: serverTimestamp(),
      senderUid: uid,
      recipientUid: selectedUser.id,
      participants: participantsUIDs,
    });
    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;