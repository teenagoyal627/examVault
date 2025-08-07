import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "../../../../../Firebase";
import axios from "axios";
const apiUrl = `${process.env.REACT_APP_APIURL}`



const validate=(password,confirmPassword)=>{
  return password===confirmPassword;
}

export const studentRegSubmitHandler = async (
  e,
  regData,
  navigate,
  setShowModal,
  setModalContent,
  setLoading
) => {
  e.preventDefault()
  if(!validate(regData.password, regData.confirmPass)){
    setShowModal(true)
    setModalContent({
      title:"Validation Error",
      body:"Password and Confirm Password do not match"
    })
    return 
   }else if(!regData.department || !regData.university || !regData.college){
    setShowModal(true)
    setModalContent({
      title:"Missing Required Fields",
      body:"Please fill out all required fields before submitting the form."
    })
    return;
 }
  try {
    setLoading(true)
    await createUserWithEmailAndPassword(
      auth,
      regData.email,
      regData.password
    )


  const idToken= await getAuth().currentUser.getIdToken()
      const userDetails = {
        name: regData.name,
        email: regData.email,
        role_id:regData.studentId,
        department:regData.department,
        semester:regData.semester,
        university:regData.university,
        college:regData.college,
        start_year:regData.startYear,
        end_year:regData.endYear,

      };
      await axios.post(`${apiUrl}/users/studentReg`, userDetails,{
        headers:{
          Authorization:`Bearer ${idToken}`,
        }
      }).then((res) => {
        setLoading(false)
        sessionStorage.setItem("authToken",idToken)
        navigate("/all_paper");
      });
       
      }
   catch (error) {
    setLoading(false)
    switch (error.code) {
      case "auth/email-already-in-use":
        setShowModal(true);
        setModalContent({
          title: "Registration Error",
          body: "Email Already in use.",
        });
        break;
      default:
        break;
    }
  }

};


export const teacherRegSubmitHandler = async (
  e,
  regData,
  navigate,
  setShowModal,
  setModalContent,
  setLoading
) => {
  e.preventDefault();
  if(!validate(regData.password, regData.confirmPass)){
    setShowModal(true)
    setModalContent({
      title:"Validation Error",
      body:"Password and Confirm Password do not match"
    })
    return;
   }else if(!regData.department || !regData.university || !regData.college){
      setShowModal(true)
      setModalContent({
        title:"Missing Required Fields",
        body:"Please fill out all required fields before submitting the form."
      })
      return;
   }
  try {
    setLoading(true)
    await createUserWithEmailAndPassword(
      auth,
      regData.email,
      regData.password
    )
        const idToken=await getAuth().currentUser.getIdToken()
        const userDetails = {
          name: regData.name,
          email: regData.email,
          role_id:regData.teacherId,
          department:regData.department,
          university:regData.university,
          college:regData.college,
        };
        await axios.post(`${apiUrl}/users/teacherReg`,userDetails,{
          headers:{
            Authorization:`Bearer ${idToken}`,
          }
        })
        setLoading(false)
        setShowModal(true);
        setModalContent({
          title: "Registration Successful",
          body: "Your registration has been submitted. Once approved, you will be notified.",
        });
  } catch (error) {
    setLoading(false)
    switch (error.code) {
      case "auth/email-already-in-use":
        setShowModal(true);
        setModalContent({
          title: "Registration Error",
          body: "Email Already in use.",
        });
        break;
      default:
        break;
    }
  }

};


export const teacherHandleConfirm=(modalContent,navigate,setShowModal)=>{
  if(modalContent.title==="Registration Successful")
    {
      navigate('/')
    }else{
      setShowModal(false)
      navigate('/teacher_form')
    }
}