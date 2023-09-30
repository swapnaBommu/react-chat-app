
import React,{ useContext } from "react";
import Cam from "../Images/cam.png";
import Add from "../Images/add.png";
import More from "../Images/more.png";
import Messages from "../Components/Messages";
import Input from "../Components/Input";
import { ChatContext } from "../Providers/ChatProvider";
import '../styles/chat.css';
const Chat = () => {

    const {data} = useContext(ChatContext);
    
    return (
        <div className="chat">
            <div className="chat-info">
                <span>{data.user?.displayName}</span>
                <div className="chatIcons">
                    <img src={Cam} alt="cam" />
                    <img src={Add} alt="add" />
                    <img src={More} alt="more" />
                </div>
            </div>
            <Messages />
            <Input/>
        </div>
    );
}

export default Chat;