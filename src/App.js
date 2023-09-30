import { Routes,Route } from "react-router-dom";
import LogIn from "./Pages/Login";
import Register from "./Pages/Register";
import { Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Loader from "./Components/Loader";
import { useAuth } from '../src/hooks/index';

function App() {
  const auth = useAuth();
  
  if(auth.loading){
    return <Loader/>
  }
  
  const ProtectedRoute = ({ children}) => {
    const auth = useAuth();
    console.log('current user',auth.user);
    if (!auth.user) { 
      return <Navigate to="/login" replace />;
    }
    return children;
  };
  return (
    
    
      <Routes>
        <Route path="/">
          <Route index 
          element={
            <ProtectedRoute >
                <Home />
              </ProtectedRoute>}
           />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    
  );
}

export default App;
