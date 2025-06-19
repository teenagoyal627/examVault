import React, { useEffect, useState } from "react";
import FrontPageNavbar from "../../../../Navbar/FrontPageNavbar";
import Card from "../../../../UI/Card";
import classes from '../../../../FormInputs/Fields.module.css';
import FieldsInput from '../../../../FormInputs/FieldsInput';
import { studentRegSubmitHandler } from "./Utility";
import { useNavigate } from "react-router";
import MessageBox from "../../../../MessageBox";
import '../../../../Papers/AllPapers/LoadingSpinner.css'
const StudentRegistration = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({
    name: "",
    // rollNo: "",
    email: "",
    password: "",
    confirmPass: "",
    studentId: "",
    startYear: "",
    endYear: "",
    department: "",
    semester: "",
    university: "",
    college: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    body: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const[loading,setLoading]=useState(false)
  useEffect(()=>{
   const token=sessionStorage.getItem("authToken")
   if(token){
    navigate('/all_paper')
   }
  },[])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    setShowModal(false);
    navigate("/student_form");
  };

  const isFireFox=navigator.userAgent.toLowerCase().includes('firefox')
    console.log(isFireFox)
  return (
    <div>
      <FrontPageNavbar />
      {loading &&(
    <div className="loading-backdrop">
      <div className="loading-box">
        <div className="loading-spinner"></div>
        
        <div className="loading-text">Creating your account and verifying your credentials, please wait...      </div>
      </div>
    </div>
   )}
      <Card>
        <h5 className={classes.heading}>Student Registration Form</h5>
        <hr />
        <form
          onSubmit={(e) =>{
            studentRegSubmitHandler(
              e,
              studentData,
              navigate,
              setShowModal,
              setModalContent,
              setLoading
            )
           } }
        >
          <FieldsInput
            label="Name"
            type="text"
            name="name"
            value={studentData.name}
            onChange={handleStudentChange}
            required={true}
          />
          {/* <FieldsInput
            label="Roll No"
            type="text"
            name="rollNo"
            value={studentData.rollNo}
            onChange={handleStudentChange}
            required={true}
          /> */}
          <FieldsInput
            label="Email"
            type="email"
            name="email"
            value={studentData.email}
            onChange={handleStudentChange}
            required={true}
          />
          <FieldsInput
            label="Password"
            type={showPassword ? "text" :"password"}
            name="password"
            value={studentData.password}
            onChange={handleStudentChange}
            required={true}
            showToggle
            toggleVisibility={togglePasswordVisibility}

          />
          <FieldsInput
            label="Confirm Password"
            type={showPassword ? "text" :"password"}
            name="confirmPass"
            value={studentData.confirmPass}
            onChange={handleStudentChange}
            required={true}
            showToggle
            toggleVisibility={togglePasswordVisibility}

          />
          <FieldsInput
            label="Student ID"
            type="text"
            name="studentId"
            value={studentData.studentId}
            onChange={handleStudentChange}
            required={true}
          />
          <FieldsInput
            label="Department"
            type="select"
            name="department"
            value={studentData.department}
            onChange={handleStudentChange}
            required={true}
            options={["CSE", "Civil", "ME", "EE", "Other"]}
          />
          <FieldsInput
            label="Semester"
            type="select"
            name="semester"
            value={studentData.semester}
            onChange={handleStudentChange}
            required={true}
            options={["I", "II", "III", "IV", "V", "VI", "VII", "VIII"]}
          />
          <FieldsInput
            label="Start Year"
            type={isFireFox ? "date" : "month"}
            name="startYear"
            value={studentData.startYear}
            onChange={handleStudentChange}
            required={true}
           
          />
          <FieldsInput
            label="End Year"
            type={isFireFox ? "date" : "month"}
            name="endYear"
            value={studentData.endYear}
            onChange={handleStudentChange}
            required={true}
          />
          <FieldsInput
            label="University"
            type="select"
            name="university"
            value={studentData.university}
            onChange={handleStudentChange}
            required={true}
            options={["BTU", "CU", "AMITY", "Other"]}
          />
          <FieldsInput
            label="College"
            type="select"
            name="college"
            value={studentData.college}
            onChange={handleStudentChange}
            required={true}
            options={["LIET", "MITRC", "NIET", "Other"]}
          />
          <button className={classes.button}>Submit</button>
        </form>
      </Card>
      <MessageBox
        showModal={showModal}
        handleClose={handleClose}
        title={modalContent.title}
        body={modalContent.body}
        handleConfirm={handleConfirm}
      />
    </div>
  );
};

export default StudentRegistration;
