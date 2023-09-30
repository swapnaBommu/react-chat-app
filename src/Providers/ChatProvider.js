import { createContext, useReducer } from "react";

import { useAuth } from '../hooks';
export const ChatContext = createContext();


export const ChatContextProvider = ({ children }) => {
    const auth = useAuth();
    const currentUser = auth.user;
    const initalstate = {
        chatId:null,
        user:{}
    }
    const chatReducer = (state,action) =>{
        switch(action.type) {
            case "CHANGE_USER":
                return{
                    user:action.payload,
                    chatId:  currentUser.uid > action.payload.uid
                    ? currentUser.uid + action.payload.uid
                    : action.payload.uid + currentUser.uid
                }
            default : 
                return state;
        }
    };
    
    const [state,dispatch] = useReducer(chatReducer,initalstate);

    return <ChatContext.Provider value={{data : state, dispatch}}>{ children }</ChatContext.Provider>
}