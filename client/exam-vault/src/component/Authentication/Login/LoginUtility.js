import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../Firebase"
import axios from "axios"


export const loginSubmitHandler=async(e,loginData,setShowModal,setModalContent)=>{
  console.log("login button is clicked")

   e.preventDefault()
    try{
       const userLoginCredential= await signInWithEmailAndPassword(auth,loginData.email,loginData.password)
       const user=userLoginCredential.user;
       console.log(user.uid)
      //  const token=user.accessToken;
      //  const payload=jwtDecode(token)
      //  console.log(payload)
      const idToken=getAuth().currentUser.getIdToken()
          console.log(idToken)
      const apiUrl = 'http://localhost:5000/get_role'
   await axios.get(apiUrl,{
        headers:{
          Authorization:`Bearer ${idToken}`
        }
      })
      .then((response)=>{
        if(!response){
          
        }
        const role=response.data.role;
        setShowModal(true)
        setModalContent({
          title:"Login Successfully",
          body:`You are logged in as a ${role}`
        })
      }).catch((error)=>{
        if(error.response){
          console.log(error.response.data.error)
        }
        setShowModal(true)
        setModalContent({
          title:"Login Error",
          body:`Error comes getting response${error}`
        })
      })
      
       
    }catch(error){
      setShowModal(true)
      setModalContent({
        title:"Login Error",
        body:`${error}`
      })
    }

}

export const handleLoginChange=(e,setLoginData)=>{
  const {id,value}=e.target;
  setLoginData((prevState)=>({
    ...prevState,
    [id]:value
  }))
}


 export const handleConfirm=(setShowModal,navigate,modalContent)=>{
  if(modalContent.title==='Login Successfully'){
    setShowModal(false)
    navigate('/all_paper')
  }
  else{
    setShowModal(false)
    navigate('/login_form')
  }
 
}
