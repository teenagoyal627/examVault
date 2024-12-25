import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "../../../../../Firebase";
import axios from "axios";

export const studentRegSubmitHandler = async (
  e,
  regData,
  navigate,
  setShowModal,
  setModalContent
) => {
  try {
    e.preventDefault();
    await createUserWithEmailAndPassword(
      auth,
      regData.email,
      regData.password
    )
    const idToken= await getAuth().currentUser.getIdToken()
    console.log(idToken)
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
        const apiUrl = "http://localhost:5000/users/studentReg";
        await axios.post(apiUrl, userDetails,{
          headers:{
            Authorization:`Bearer ${idToken}`,
          }
        }).then((res) => {
          
          navigate("/all_paper");
        });
      }
   catch (error) {
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
  setModalContent
) => {
  try {
    e.preventDefault();
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
        const apiUrl = "http://localhost:5000/users/teacherReg";
        await axios.post(apiUrl,userDetails,{
          headers:{
            Authorization:`Bearer ${idToken}`,
          }
        })
        setShowModal(true);
        setModalContent({
          title: "Registration Successful",
          body: "Your registration has been submitted. Once approved, you will be notified.",
        });
  } catch (error) {
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