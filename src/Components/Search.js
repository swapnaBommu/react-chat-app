import {
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    updateDoc,
    serverTimestamp,
    getDoc,
  } from "firebase/firestore";
import { useToasts } from 'react-toast-notifications';
import React, { useState } from "react";
import '../styles/Home.css';
import {db} from '../firebase';
import { useAuth } from '../hooks';


const Search = () => {

    const [userName, setUserName] = useState("");
    const [user,setUser] = useState(null);
    const {addToast} = useToasts();
    const auth = useAuth();
    const currentUser = auth.user;
    const handleSearch =async () =>{
        const q = query(
            collection(db,"users"),
            where("displayName","==",userName)
            );

        try{
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
            addToast('user found', {
                appearance: 'success',
                autoDismiss: true,
            });
        }catch(err){
            console.log('error in search',err);
            addToast(err.message, {
                appearance: 'error',
                autoDismiss: true,
            });
        }
        
    }

    const handleKey = (e) =>{
        e.code === "Enter" && handleSearch();
    }

    const handleSelect = async () => {
        
        //check whether the chat between two people is exists or not
        //if doesn't exists create new collection  to store msgs
        //creating combined id for current user and selected user
        const combinedId =
          currentUser.uid > user.uid
            ? currentUser.uid + user.uid
            : user.uid + currentUser.uid;
        try {
          const res = await getDoc(doc(db, "chats", combinedId));
    
          if (!res.exists()) {
            //create a chat in chats collection
            await setDoc(doc(db, "chats", combinedId), { messages: [] });
    
            //create user chats
            await updateDoc(doc(db, "userChats", currentUser.uid), {
              [combinedId + ".userInfo"]: {
                uid: user.uid,
                displayName: user.displayName
                
              },
              [combinedId + ".date"]: serverTimestamp(),
            });
    
            await updateDoc(doc(db, "userChats", user.uid), {
              [combinedId + ".userInfo"]: {
                uid: currentUser.uid,
                displayName: currentUser.displayName
                
              },
              [combinedId + ".date"]: serverTimestamp(),
            });
          }
        } catch (err) {}
    
        setUser(null);
        setUserName("")
      };
    

    return (
        <div className="search">
            <div className="search-form">
                <input 
                    type="text" 
                    placeholder="Find a user"
                    onKeyDown={handleKey}
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                />
            </div>
            
            { user && <div className="userChat" onClick={handleSelect}>
                <img src="https://cdn-icons-png.flaticon.com/128/1177/1177568.png" alt="img"/>
                <div className="user-chat-info">
                    <span>{user.displayName}</span>
                </div>
            </div>
            }
        </div>
    );
}

export default Search;

