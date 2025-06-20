import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useRef, useState } from "react";

export const AuthContext=createContext() 

export const AuthProvider=({children})=>{
    const[userRole,setUserRole]=useState('')
    const isRoleFetched=useRef(false)

    useEffect(()=>{
      const storedRole=sessionStorage.getItem("userRole")
      if(storedRole){
        setUserRole(storedRole)
        isRoleFetched.current=true;
        return;
      }
        
        const auth=getAuth() 
        const unsubscribe=onAuthStateChanged(auth,async(user)=>{
            if(user && !isRoleFetched.current){
              await  fetchUserRole(user)
            }
        })
        return ()=>unsubscribe()
    },[])

      const fetchUserRole = async (user) => {
        try {
          const token=sessionStorage.getItem('authToken')
          if(token!==null){
          const idToken = await user.getIdToken();
          const apiUrl = `${process.env.REACT_APP_APIURL}`
          const response = await axios.get(`${apiUrl}/login/get_role`, {
            headers: {
              Authorization: `Bearer ${idToken}`
            }
          });
          const role=response.data.role 
          setUserRole(role)
          sessionStorage.setItem("userRole",role)
          isRoleFetched.current=true
        }
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