import React, { useState } from "react";
import {
  handleLoginChange,
  loginSubmitHandler,
  handleConfirm,
} from "./LoginUtility";
import FrontPageNavbar from "../../Navbar/FrontPageNavbar";
import classes from "./Login.module.css";
import MessageBox from "../../MessageBox";
import { useNavigate } from "react-router";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { ToastContainer } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    body: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };

  const togglePasswordVisibility=()=>{
    setShowPassword(!showPassword)
  }
  return (
    <div>
      <FrontPageNavbar />
      <div className={classes.modal}>
        <h5 className={classes.heading}>Login Form</h5>
        <hr />
        <form
          onSubmit={(e) =>
            loginSubmitHandler(e, loginData, setShowModal, setModalContent,navigate)
          }
          className={classes.loginForm}
        >

          <label>Email</label>
          <input
            type="email"
            id="email"
            value={loginData.email}
            onChange={(e) => handleLoginChange(e, setLoginData)}
            required
          />

          <label>Password</label>
          <div className={classes.passwordContainer}>

         
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={loginData.password}
            onChange={(e) => handleLoginChange(e, setLoginData)}
            required
          />

          <span className={classes.visibilityIcon} onClick={togglePasswordVisibility}>
          {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
          </span>
          </div>
          <button className={classes.button}>Login</button>

        </form>


      </div>
      <MessageBox
        showModal={showModal}
        handleClose={handleClose}
        title={modalContent.title}
        body={modalContent.body}
        handleConfirm={() =>
          handleConfirm(setShowModal, navigate, modalContent)
        }
      />
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
    </div>
  );
};

export default Login;
