import React, { useEffect, useRef, useState } from "react";
import { query, collection, orderBy, onSnapshot, limit, where } from "firebase/firestore";
import { db } from "lib/firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import { useCurrentUser } from "context/CurentUserContext";

const ChatBox = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MessagesWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
  background-color: #fff;
  width: 20%;
`;

const UserList = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-right: 1px solid #ccc;
  background-color: #f5f5f5;
  width: 10%;
`;
function Chatroom() {
  const { currentUser } = useCurrentUser();
  const [selectedUser, setSelectedUser] = useState("");
  console.log("This is the logged in user", currentUser?.uid);
  console.log("This is the selectedUser", selectedUser?.id);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const scroll = useRef();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (currentUser) {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    console.log("userQuery useEffect");
    const userQuery = query(collection(db, "users"));
    const unsubscribeUsers = onSnapshot(userQuery, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setUsers(users);
    });

    return () => unsubscribeUsers();
  }, []);

  useEffect(() => {
    if (!selectedUser || !currentUser) return;
    const participantsUIDs = [currentUser.uid, selectedUser.id].sort().join("-");
    console.log("participantsUIDs", participantsUIDs);
    const messageQuery = query(
      collection(db, "messages"),
      where("participants", "==", participantsUIDs),
      orderBy("createdAt"),
      limit(50)
    );
  
    const unsubscribeMessages = onSnapshot(messageQuery, (querySnapshot) => {
      console.log("onSnapshot called");
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
  
    return () => unsubscribeMessages();
  }, [selectedUser, currentUser]);
  
  const handleUserSelection = (user) => {
    console.log("user selected", user);
    setSelectedUser(user);
    setTimeout(() => scroll.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <ChatBox>
      <UserList>
        {users.map((user) => (
          <div key={user.id} onClick={() => handleUserSelection(user)}>
            {user.username}
          </div>
        ))}
      </UserList>
      <MessagesWrapper>
  {messages?.map((message) => {
    const sender = users.find((user) => user.id === message.senderUid);
    return (
      <Message
        key={message.id}
        message={message}
        senderUsername={sender ? sender.username : ""}
        senderAvatar={sender ? sender.avatar : ""}
      />
    );
  })}
  <span ref={scroll}></span>
</MessagesWrapper>

      {selectedUser && <SendMessage scroll={scroll} currentUser={currentUser} selectedUser={selectedUser} />}
    </ChatBox>
  );
}

export default Chatroom;