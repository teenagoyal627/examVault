import { createUserWithEmailAndPassword } from "firebase/auth";
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
    ).then(async (userCredential) => {
      const userId = userCredential.user.uid;
      if (userId) {
        const userDetails = {
          user_id: userId,
          name: regData.name,
          email: regData.email,
        };
        const apiUrl = "http://localhost:5000/studentReg";
        await axios.post(apiUrl, userDetails).then((res) => {
          navigate("/all_paper");
        });
      }
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
    ).then(async (userCredential) => {
      const userId = userCredential.user.uid;
      if (userId) {
        const userDetails = {
          user_id: userId,
          name: regData.name,
          email: regData.email,
        };
        const apiUrl = "http://localhost:5000/teacherReg";
        await axios.post(apiUrl, userDetails).then((res) => {
            setShowModal(true);
            setModalContent({
              title: "Message Box",
              body: "Your registration has been register. Once approved, you will be notify.",
            });
        });
      }
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
