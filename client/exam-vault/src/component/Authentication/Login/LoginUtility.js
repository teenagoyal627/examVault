import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../Firebase"
 


export const loginSubmitHandler=async(e,loginData,setShowModal,setModalContent)=>{
  console.log("login button is clicked")

   e.preventDefault()
    try{
       const userLoginCredential= await signInWithEmailAndPassword(auth,loginData.email,loginData.password)
       const user=userLoginCredential.user;
       console.log(user)
       if(user.uid){
        setShowModal(true)
        setModalContent({
          title:"Login Successfully",
          body:"You are successfully login "
        })
       }
    //    history.replace('/')
    }catch(error){
      setShowModal(true)
      setModalContent({
        title:"Login Error",
        body:"Please write right credentials."
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
