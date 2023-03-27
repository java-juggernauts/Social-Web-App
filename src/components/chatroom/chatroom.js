import React, { useEffect, useRef, useState } from "react";
import { query, collection, orderBy, onSnapshot, limit, where, getDocs} from "firebase/firestore";
import { db } from "lib/firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import { useCurrentUser } from "context/CurentUserContext";

const ChatBox = styled(Box)`
  display: flex;
  height: 100vh;
  background-color: #282c34;
`;

const MessagesWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
  background-color: #282c34;
  width: 75%;
  height: 85%;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const UserList = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-right: 1px solid #ccc;
  width: 25%;
  overflow-y: auto;
  background-color: #282c34;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;


const UserItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;
function Chatroom() {
  // const [filteredUsers, setFilteredUsers] = useState([]);

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
  

  useEffect(() => {
    console.log("userQuery useEffect");
  
    const fetchMessages = async () => {
      const userQuery = query(collection(db, "users"));
      const userSnapshot = await getDocs(userQuery);
      let usersWithMessages = [];
  
      for (const userDoc of userSnapshot.docs) {
        const user = { ...userDoc.data(), id: userDoc.id };
        if (user.id === currentUser.uid) continue;
  
        const participantsUIDs = [currentUser.uid, user.id].sort().join("-");
        const messageQuery = query(
          collection(db, "messages"),
          where("participants", "==", participantsUIDs)
        );
        const messageSnapshot = await getDocs(messageQuery);
  
        if (!messageSnapshot.empty) {
          usersWithMessages.push(user);
        }
      }
  
      setUsers(usersWithMessages);
    };
  
    if (currentUser) {
      fetchMessages();
    }
  
    return () => {};
  }, [currentUser]);
  
  
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
    <UserItem key={user.id} onClick={() => handleUserSelection(user)}>
      {user.username}
    </UserItem>
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
      {selectedUser && <SendMessage scroll={scroll} currentUser={currentUser} selectedUser={selectedUser} />}
      </MessagesWrapper>

    </ChatBox>
  );
}

export default Chatroom;