import '../styles/Home.css';
import React from "react";
import { useAuth } from '../hooks';
import {auth} from'../firebase';
import{useToasts} from 'react-toast-notifications';
import { useNavigate} from "react-router-dom";
const Navbar = () => {
    const { addToast } = useToasts();
    const auth1 = useAuth();
    const navigate = useNavigate();
    
    const handleLogout =() => {
        try{
            auth1.logout(auth);
            addToast('You have logged out successfully', {
                appearance: 'success',
                autoDismiss: true,
            });
            navigate("/login");
        }catch(error){
            addToast(error.message, {
              appearance: 'error' });
        }

    }
    return (
        <div className="navbar">
            <span className="logo">Chat App</span>
            <div className="user">
                <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkge5LZ8xSug5PszKQDTOcHE7hR7Lf1746Tw&usqp=CAU" 
                    alt="dp"/>
                <span>{auth1.user.displayName}</span>
                <button onClick={handleLogout}>logout</button>
            </div>
           
        </div>
    );
}

export default Navbar;