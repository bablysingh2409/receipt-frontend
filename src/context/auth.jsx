import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export const AuthProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
//   const [role,setRole]=useState("")

  useEffect(()=>{
       const login=localStorage.getItem("login");
       if(login){
        setIsLogin(true);
       }else{
        localStorage.clear()
       }
  },[])

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin}}>
      {props.children}
    </AuthContext.Provider>
  );
};
