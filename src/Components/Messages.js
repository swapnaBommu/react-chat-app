import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../Providers/ChatProvider";
import {db} from '../firebase';
import '../styles/chat.css';
const Messages = () => {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);
    console.log('chat id', data.chatId);
    useEffect(() => {
        try{
            const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
                console.log('doc data messages',doc.data().messages);
                doc.exists() && setMessages(doc.data().messages);
              });
              return () => {
                unSub();
              };
          } catch(error){
            // addToast(error.message, {
            //   appearance: 'error' });
            console.log('messages error',error);
          }
      },[data.chatId]);
    console.log('messages',messages);
    return (
        <div className="messages">
            {messages.map((m) => (
                <Message message={m} key={m.id} />
            ))}
    </div>
    );
}

export default Messages;