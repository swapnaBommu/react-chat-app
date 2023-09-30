
import React,{ useEffect,useRef} from "react";
import '../styles/chat.css';
import { useAuth } from '../hooks';


const Message = ({message}) => {
  const auth = useAuth();
  const currentUser = auth.user;
  
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({behavior:"smooth"})
  },[message])
    return (
        <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
        <div className="messageInfo">
          <img
            src={message.senderId === currentUser.uid ? 
              ("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkge5LZ8xSug5PszKQDTOcHE7hR7Lf1746Tw&usqp=CAU"):
              ("https://1fid.com/wp-content/uploads/2022/06/cartoon-profile-picture-2-1024x1024.jpg")
             }
            alt=""
          />
          <span>just now</span>
        </div>
        <div className="messageContent">
          <p>{message?.text}</p>
          {message.img && <img src={message?.img} alt="" />}
        </div>
      </div>
    );
}

export default Message;