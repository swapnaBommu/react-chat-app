import '../styles/Register.css';
import { useState } from 'react';
import{useToasts} from 'react-toast-notifications';
import { useAuth } from '../hooks';
import {auth} from "../firebase";
import { useNavigate,Link} from "react-router-dom";

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const { addToast } = useToasts();
  const auth1 = useAuth();
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoggingIn(true);

  if(!email || !password){
      addToast('please enter email and password', { appearance: 'error' });
  }

  try{
    const response = await auth1.login(auth,email,password);
    if(response.user){
      addToast('You have logged in successfully', {
        appearance: 'success',
        autoDismiss: true,
      });
      navigate("/");
    }
  
    setLoggingIn(false)
  } catch(error){
    addToast(error.message, {
      appearance: 'error' });
  }
  
};
    return (
        <div className="form-container">
        <form className="loginForm" onSubmit={handleSubmit}>
        <span className="loginSignupHeader"> LogIn</span>
        <div className="field">
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <input
            placeholder="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
       
        <div className="field">
          <button disabled={loggingIn}>
          {loggingIn ? 'Logging in...' : 'Log In'}
        </button>
        <p>You don't have an account? <b><Link to="/register">register</Link></b></p>
        </div>
        </form>
        
      </div>
    );
  }
  
  export default LogIn;
  