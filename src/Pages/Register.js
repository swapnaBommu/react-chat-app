import { useState } from 'react';
import { useNavigate} from "react-router-dom";
import {auth,db} from "../firebase";
import {updateProfile } from "firebase/auth";
import '../styles/Register.css';
import { doc, setDoc } from "firebase/firestore"; 
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../hooks';

const Register = () =>  {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingUp, setSigningUp] = useState('');
  const { addToast } = useToasts();
  const auth1 = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSigningUp(true);
    let error = false;
  
    if (!name || !email || !password || !confirmPassword) {
      addToast('Please fill all the fields', {
        appearance: 'error',
        autoDismiss: true,
      });
      error = true;
    }

    if(password !== confirmPassword){
      addToast('Make sure password and comfirm password matches',{
        appearance:'error',
        autoDismiss:true,
      });
      error = true;
    }
    
    if(error){
      setSigningUp(false);
    }
    try {
      const response  = await auth1.signup(auth,email,password);
    
    await updateProfile(response.user, {
     
        displayName:name
    })
    await setDoc(doc(db, "users", response.user.uid), {
      uid : response.user.uid,
      displayName:name,
      email,
    });
    await setDoc(doc(db,"userChats",response.user.uid),{});
    setSigningUp(false);
    addToast('User registered successfully, please login now', {
        appearance: 'success',
        autoDismiss: true,
      });
      navigate("/login");
    
    } catch(error){
      addToast(error.message, {
        appearance: 'error' });
    }
  
  }
    return (
      <div className="form-container">
        <form className="loginForm" onSubmit={handleSubmit}>
        <span className="loginSignupHeader"> Signup</span>
        <div className="field">
          <input
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <div className="field">
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <div className="field">
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="field">
          <input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="field">
          <button disabled={signingUp}>
            {signingUp ? 'Signing up...' : 'Signup'}
          </button>
        </div>
        </form>
        
      </div>
    );
  }
  
  export default Register;