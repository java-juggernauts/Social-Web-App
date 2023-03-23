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
  flex-grow: 1;
  overflow-y: auto;
`;

const UserList = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-right: 1px solid #ccc;
`;
function Chatroom() { // Pass currentUser as a prop
const { currentUser } = useCurrentUser(); // Or use the context hook
console.log("This is the logged in user", currentUser);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const scroll = useRef();

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
    
    const messageQuery = query(
      collection(db, "messages"),
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