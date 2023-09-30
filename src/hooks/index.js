import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../Providers/AuthProvider";
import { createUserWithEmailAndPassword, 
          onAuthStateChanged, 
          signInWithEmailAndPassword,
          signOut 
        } from "firebase/auth";
import { auth } from "../firebase";

export const useAuth = () => {
    return useContext(AuthContext);
};

export const useProvideAuth = () => {
  //checking the current login user  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async() =>{
      onAuthStateChanged(auth, (user) => {
        if (user) {     
          setUser(user);
        } 
        setLoading(false);
        
      });
    } 
    getUser();
  },[])


  //Function to signup the user
    const signup = (auth,email, password) => {
      const response = createUserWithEmailAndPassword(auth, email, password);
      return response;   
    }
    //function to login the user
    const login = async (auth,email,password) => {
      const response = await signInWithEmailAndPassword(auth,email,password);
      return response;
    }

    //Function to logout the user
    const logout = async (auth) =>{
      const response = await signOut(auth);
      return response;
    }
    return {
        
        login,
        logout,
        loading,
        signup,
        user,
      };
}
