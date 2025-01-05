import React, { useState } from "react";
import FrontPageNavbar from "../../../../Navbar/FrontPageNavbar";
import Card from "../../../../UI/Card";
import classes from "../Fields.module.css";
import FieldsInput from "../FieldsInput";
import { studentRegSubmitHandler } from "./Utility";
import { useNavigate } from "react-router";
import MessageBox from "../../../../MessageBox";
const StudentRegistration = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({
    name: "",
    rollNo: "",
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

  return (
    <div>
      <FrontPageNavbar />
      <Card>
        <h5 className={classes.heading}>Student Registration Form</h5>
        <hr />
        <form
          onSubmit={(e) =>
            studentRegSubmitHandler(
              e,
              studentData,
              navigate,
              setShowModal,
              setModalContent
            )
          }
        >
          <FieldsInput
            label="Name"
            type="text"
            name="name"
            value={studentData.name}
            onChange={handleStudentChange}
          />
          <FieldsInput
            label="Roll No"
            type="text"
            name="rollNo"
            value={studentData.rollNo}
            onChange={handleStudentChange}
          />
          <FieldsInput
            label="Email"
            type="email"
            name="email"
            value={studentData.email}
            onChange={handleStudentChange}
          />
          <FieldsInput
            label="Password"
            type={showPassword ? "text" :"password"}
            name="password"
            value={studentData.password}
            onChange={handleStudentChange}
            showToggle
            toggleVisibility={togglePasswordVisibility}

          />
          <FieldsInput
            label="Confirm Password"
            type="password"
            name="confirmPass"
            value={studentData.confirmPass}
            onChange={handleStudentChange}
            showToggle
            toggleVisibility={togglePasswordVisibility}

          />
          <FieldsInput
            label="Student ID"
            type="text"
            name="studentId"
            value={studentData.studentId}
            onChange={handleStudentChange}
          />
          <FieldsInput
            label="Department"
            type="select"
            name="department"
            value={studentData.department}
            onChange={handleStudentChange}
            options={["CSE", "Civil", "ME", "EE", "Other"]}
          />
          <FieldsInput
            label="Semester"
            type="select"
            name="semester"
            value={studentData.semester}
            onChange={handleStudentChange}
            options={["I", "II", "III", "IV", "V", "VI", "VII", "VIII"]}
          />
          <FieldsInput
            label="Start Year"
            type="date"
            name="startYear"
            value={studentData.startYear}
            onChange={handleStudentChange}
          />
          <FieldsInput
            label="End Year"
            type="date"
            name="endYear"
            value={studentData.endYear}
            onChange={handleStudentChange}
          />
          <FieldsInput
            label="University"
            type="select"
            name="university"
            value={studentData.university}
            onChange={handleStudentChange}
            options={["BTU", "CU", "AMITY", "Other"]}
          />
          <FieldsInput
            label="College"
            type="select"
            name="college"
            value={studentData.college}
            onChange={handleStudentChange}
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
