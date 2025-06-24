import React from "react";
import classes from "./FrontPage.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SchoolIcon from "@mui/icons-material/School";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router";

const FrontPageCard = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.registrationWrapper}>
      <div className={classes.leftSection}>
        <h2>Welcome to Notes & Papers Hub</h2>
        <p>
          Easily register to upload or access academic papers and notes. 
          Whether you're a teacher or student, this hub is designed for you.
        </p>
        <img 
        src='Images/registration.jpg'
        alt="registration"
        className={classes.illustration}
        />
      </div>

      <div className={classes.rightSection}>
        <div className={classes.registerBox}>
          <h3>Register as</h3>

          <button className={classes.button} onClick={()=>navigate("/teacher_form")}>
            <AccountCircleIcon className={classes.icon}/> Teacher
          </button>
          <button
            className={classes.button}
            onClick={() => navigate("/student_form")}
          >
            <SchoolIcon className={classes.icon} /> Student
          </button>

          <div className={classes.divider}>OR</div>

          <button
            className={`${classes.button} ${classes.loginBtn}`}
            onClick={() => navigate("/login_form")}
          >
            <LockIcon className={classes.icon} /> Login
          </button>
        </div>

      </div>

{/*     
      <div className={classes.cardWidth}>
        <h5 className={classes.heading}>Welcome to Exam Vault! Register now to submit and manage your papers seamlessly.</h5>
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
      </div> */}
      </div>
 
  );
};

export default FrontPageCard;
