import React, {  useState } from "react";
import FrontPageNavbar from "../../../../Navbar/FrontPageNavbar";
import Card from "../../../../UI/Card";
import classes from '../../../../FormInputs/Fields.module.css';
import FieldsInput from '../../../../FormInputs/FieldsInput';
import { teacherRegSubmitHandler, teacherHandleConfirm } from "./Utility";
import { useNavigate} from "react-router";
import MessageBox from "../../../../MessageBox";
import '../../../../Papers/AllPapers/LoadingSpinner.css'

const TeacherRegistration = () => {
  const navigate = useNavigate();
  const [teacherData, setTeacherData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
    teacherId: "",
    department: "",
    university: "",
    college: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    body: "",
  });
  const[loading,setLoading]=useState(false)

  const handleTeacherChange = (event) => {
    const { name, value } = event.target;
    setTeacherData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <FrontPageNavbar />
      {loading && (
        <div className="loading-backdrop">
        <div className="loading-box">
          <div className="loading-spinner"></div>
          
          <div className="loading-text">Creating your account and verifying your credentials, please wait...</div>
        </div>
      </div>
      )}
      <Card height="43rem" marginTop="2rem">
        <div style={{textAlign:'center', marginTop:'-4rem'}}>
          <img src="Images/teacherReg.jpg" alt="" style={{width:'120px', marginBottom:'1rem', borderRadius:'1rem'}}/>
        </div>
        <h5 className={classes.heading}> 👩‍🏫 Teacher Registration</h5>
        <h5 style={{ fontSize: ".9rem" ,color:'#555', textAlign:'center'}}>
          Account approval might take some time. Please contact
          administrator
        </h5>
        <hr />
        <form
          onSubmit={(e) =>{     
            teacherRegSubmitHandler(
              e,
              teacherData,
              navigate,
              setShowModal,
              setModalContent,
              setLoading
            )
           }}
        >
          <FieldsInput
            label="Name"
            type="text"
            name="name"
            value={teacherData.name}
            onChange={handleTeacherChange}
            required={true}
          />
          <FieldsInput
            label="Email"
            type="email"
            name="email"
            value={teacherData.email}
            onChange={handleTeacherChange}
            required={true}
          />
          <FieldsInput
            label="Password"
            type={showPassword ?"text":"password"}
            name="password"
            value={teacherData.password}
            onChange={handleTeacherChange}
            required={true}
            showToggle
            toggleVisibility={togglePasswordVisibility}
          />
          <FieldsInput
            label="Confirm Password"
            type={showPassword ?"text":"password"}
            name="confirmPass"
            value={teacherData.confirmPass}
            onChange={handleTeacherChange}
            required={true}
            showToggle
            toggleVisibility={togglePasswordVisibility}
          />
          <FieldsInput
            label="Teacher ID"
            type="text"
            name="teacherId"
            value={teacherData.teacherId}
            onChange={handleTeacherChange}
            required={true}
          />
          <FieldsInput
            label="Department"
            type="select"
            name="department"
            value={teacherData.department}
            options={["CSE", "ME", "Civil", "EE", "Other"]}
            onChange={handleTeacherChange}
            required={true}
          />
          <FieldsInput
            label="University"
            type="select"
            name="university"
            value={teacherData.university}
            options={["BTU", "Amity", "CU", "Other"]}
            onChange={handleTeacherChange}
            required={true}
          />
          <FieldsInput
            label="College"
            type="select"
            name="college"
            value={teacherData.college}
            options={["LIET", "MITRC", "NIET", "Other"]}
            onChange={handleTeacherChange}
            required={true}
          />

          <button className={classes.button}>Submit</button>
        </form>
      </Card>
      <MessageBox
        showModal={showModal}
        handleClose={handleClose}
        title={modalContent.title}
        body={modalContent.body}
        handleConfirm={() =>
          teacherHandleConfirm(modalContent, navigate, setShowModal)
        }
      />
    </div>
  );
};

export default TeacherRegistration;
