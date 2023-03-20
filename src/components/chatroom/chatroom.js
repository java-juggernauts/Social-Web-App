import React, { useEffect, useRef, useState } from "react";
import { query, collection, orderBy, onSnapshot, limit } from "firebase/firestore";
import { db } from "lib/firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

const ChatBox = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MessagesWrapper = styled(Box)`
  flex-grow: 1;
  overflow-y: auto;
`;

export default function Chatroom() {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ChatBox>
      <MessagesWrapper>
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <span ref={scroll}></span>
      </MessagesWrapper>
      <SendMessage scroll={scroll} />
    </ChatBox>
  );
}
