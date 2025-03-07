import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useRef, useState } from "react";

export const AuthContext=createContext() 

export const AuthProvider=({children})=>{
    const[userRole,setUserRole]=useState('')
    const isRoleFetched=useRef(false)

    useEffect(()=>{
        if(isRoleFetched.current) return;
        const auth=getAuth() 
        const unsubscribe=onAuthStateChanged(auth,async(user)=>{
            if(user){
              await  fetchUserRole(user)
            }
        })
        return ()=>unsubscribe()
    },[])

      const fetchUserRole = async (user) => {
        try {
          const idToken = await user.getIdToken();
          console.log(idToken)
          const apiUrl = 'http://localhost:5000/login';
    
          const response = await axios.get(`${apiUrl}/get_role`, {
            headers: {
              Authorization: `Bearer ${idToken}`
            }
          });
          setUserRole(response.data.role);
          isRoleFetched.current=true
        } catch (error) {
          console.log("Failed to fetch user role", error);
        }
      };
    return(
        <AuthContext.Provider value={{userRole}}>
            {children}
        </AuthContext.Provider>
    )
}