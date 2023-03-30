import React, { useEffect, useRef, useState } from "react";
import { query, collection, orderBy, onSnapshot, limit, where, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "lib/firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { Box, Button } from "@mui/material";
import styled from "@emotion/styled";
import { useCurrentUser } from "context/CurentUserContext";
import SearchBar from "./SearchBar";
import DeleteIcon from '@mui/icons-material/Delete';

const ChatBox = styled(Box)`
  display: flex;
  height: 100vh;
  background-color: #282c34;
  padding-top: 64px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
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

  @media (max-width: 768px) {
    width: 100%;
    height: 60%;
  }
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

  @media (max-width: 768px) {
    width: 100%;
    height: 40%;
    border-right: none;
    border-bottom: 1px solid #ccc;
  }
`;

const UserItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

  button {
    margin-left: 1rem;
    transition: background-color 0.3s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
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
  const [searchInput, setSearchInput] = useState("");
  const [recentlyMessagedUser, setRecentlyMessagedUser] = useState(null);


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
  
  useEffect(() => {
    if (recentlyMessagedUser) {
      setUsers((prevUsers) => {
        const existingUser = prevUsers.find((user) => user.id === recentlyMessagedUser.id);
        if (existingUser) {
          return prevUsers;
        } else {
          return [...prevUsers, recentlyMessagedUser];
        }
      });
    }
  }, [recentlyMessagedUser]);

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) return;
    const userQuery = query(
      collection(db, "users"),
      where("username", "==", searchInput)
    );
    const querySnapshot = await getDocs(userQuery);
    const userDoc = querySnapshot.docs[0];
    if (userDoc) {
      const user = { ...userDoc.data(), id: userDoc.id };
      handleUserSelection(user);
    } else {
      console.log("User not found");

    }
    setSearchInput("");
  };
  
  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };
  
  const handleUserSelection = (user) => {
    console.log("user selected", user);
    setSelectedUser(user);
    setTimeout(() => scroll.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("currentUser", currentUser);
  console.log("selectedUser", selectedUser);

  const deleteMessages = async (selectedUserId) => {
    const participantsUIDs = [currentUser.uid, selectedUserId].sort().join("-");
    const messageQuery = query(
      collection(db, "messages"),
      where("participants", "==", participantsUIDs)
    );
    const querySnapshot = await getDocs(messageQuery);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    setUsers(users.filter((user) => user.id !== selectedUserId));
  };

  return (
    <ChatBox>
      <UserList>
        <SearchBar
          value={searchInput}
          onChange={handleSearchInput}
          onSubmit={handleSearchSubmit}
          onUserSelected={handleUserSelection}
        />
        {users.map((user) => (
          <UserItem key={user.id}>
            <span onClick={() => handleUserSelection(user)}>{user.username}</span>
            <Button
              onClick={() => deleteMessages(user.id)}
              variant="outlined"
              size="small"
            >
              <DeleteIcon />
            </Button>
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
  senderUsername={message.senderUid === currentUser.uid ? currentUser.username : (sender ? sender.username : "")}
  senderAvatar={message.senderUid === currentUser.uid ? currentUser.avatar : (sender ? sender.avatar : "")}
/>

          );
        })}
        <span ref={scroll}></span>
      {selectedUser && <SendMessage 
      scroll={scroll} 
      currentUser={currentUser} 
      selectedUser={selectedUser} 
      setRecentlyMessagedUser={setRecentlyMessagedUser}
      />}
      </MessagesWrapper>

    </ChatBox>
  );
}

export default Chatroom;