import React from "react";
import classes from "./FrontPage.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router";
const FrontPageCard = () => {
  const navigate = useNavigate();

  const teacherHandlerButton = () => {
    navigate("/teacher_form");
  };
  const studentHandlerButton = () => {
    navigate("/student_form");
  };

  const loginHandler=()=>{
    navigate('/login_form')
  }




  return (
    
      <div className={classes.cardWidth}>
        <h5 className={classes.heading}>Registration Modal</h5>
        <button className={classes.button} onClick={teacherHandlerButton}>
          <AccountCircleIcon
            className={classes.icon}
            style={{ marginTop: ".2rem" }}
          />
          Teacher
        </button>
        <button className={classes.button} onClick={studentHandlerButton}>
          <SchoolIcon className={classes.icon} />
          Student
        </button>
        <hr />
        <h3>OR</h3>
        <button className={classes.button} onClick={loginHandler}>Login</button>
      </div>
 
  );
};

export default FrontPageCard;
