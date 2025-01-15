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

// import React, { useState } from "react";
// import { Form, Input, Button, Select, DatePicker, Card, Modal, Typography } from "antd";
// import {
//   EyeInvisibleOutlined,
//   EyeTwoTone,
//   UserOutlined,
//   LockOutlined,
//   MailOutlined,
//   IdcardOutlined // Corrected import
// } from "@ant-design/icons";
// import dayjs from "dayjs";
// import './StudentRegistration.scss'
// import FrontPageNavbar from "../../../../Navbar/FrontPageNavbar";
// import { studentRegSubmitHandler } from "./Utility";
// import { useNavigate } from "react-router-dom";

// const { Title } = Typography;

// const StudentRegistration = () => {
//   const navigate = useNavigate();

//   const [form] = Form.useForm();
//   const [showModal, setShowModal] = useState(false);
//   const [modalContent, setModalContent] = useState({ title: "", body: "" });

//   const handleClose = () => {
//     setShowModal(false);
//   };

//   const handleConfirm = () => {
//     setShowModal(false);
//     navigate("/student_form");
//   };

//   const onFinish = (values) => {
//     // Optionally format the dates using dayjs
//     const formattedValues = {
//       ...values,
//       startYear: dayjs(values.startYear).format("YYYY"),
//       endYear: dayjs(values.endYear).format("YYYY"),
//     };
//     studentRegSubmitHandler(
//       formattedValues, // Use formattedValues if using dayjs
//       navigate,
//       setShowModal,
//       setModalContent
//     );
//   };

//   // Inline styles for the container and form
//   // const containerStyle = {
//   //   height: "calc(100vh - 5rem)", // Sets the height as per requirement
//   //   display: "flex",
//   //   flexDirection: "column",
//   // };

//   const cardStyle = {
//     maxWidth: 800,
//     margin: "20px auto",
//     flex: 1, // Allows the card to grow and fill the available space
//     display: "flex",
//     flexDirection: "column",
//   };

//   const formContainerStyle = {
//     padding: "20px",
//     flex: 1, // Makes the form take up the remaining space within the card
//     overflowY: "scroll", // Enables scrolling if content overflows
//     paddingRight: "10px", // Adds some padding to prevent content from being hidden under the scrollbar
//     maxHeight: "800px"
//   };

//   return (
//     <div className="student-card-container">
//       <FrontPageNavbar />
//       <Card style={{ ...cardStyle, padding: "20px 0" }}>
//         <Title level={4} style={{ textAlign: "center" }}>Student Registration Form</Title>
//         <div style={formContainerStyle}>
//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={onFinish}
//             initialValues={{ department: "CSE", semester: "I", university: "BTU", college: "LIET" }}
//           >
//             <Form.Item
//               label="Name"
//               name="name"
//               rules={[{ required: true, message: "Please enter your name!" }]}
//             >
//               <Input prefix={<UserOutlined />} placeholder="Enter your name" />
//             </Form.Item>

//             <Form.Item
//               label="Roll No"
//               name="rollNo"
//               rules={[{ required: true, message: "Please enter your roll number!" }]}
//             >
//               <Input prefix={<IdcardOutlined />} placeholder="Enter your roll number" />
//             </Form.Item>

//             <Form.Item
//               label="Email"
//               name="email"
//               rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}
//             >
//               <Input prefix={<MailOutlined />} placeholder="Enter your email" />
//             </Form.Item>

//             <Form.Item
//               label="Password"
//               name="password"
//               rules={[{ required: true, message: "Please enter your password!" }]}
//             >
//               <Input.Password
//                 prefix={<LockOutlined />}
//                 placeholder="Enter your password"
//                 iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
//               />
//             </Form.Item>

//             <Form.Item
//               label="Confirm Password"
//               name="confirmPass"
//               dependencies={['password']}
//               rules={[
//                 { required: true, message: "Please confirm your password!" },
//                 ({ getFieldValue }) => ({
//                   validator(_, value) {
//                     if (!value || getFieldValue('password') === value) {
//                       return Promise.resolve();
//                     }
//                     return Promise.reject(new Error('Passwords do not match!'));
//                   },
//                 }),
//               ]}
//             >
//               <Input.Password
//                 prefix={<LockOutlined />}
//                 placeholder="Confirm your password"
//                 iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
//               />
//             </Form.Item>

//             <Form.Item
//               label="Student ID"
//               name="studentId"
//               rules={[{ required: true, message: "Please enter your student ID!" }]}
//             >
//               <Input prefix={<IdcardOutlined />} placeholder="Enter your student ID" />
//             </Form.Item>

//             <Form.Item
//               label="Department"
//               name="department"
//               rules={[{ required: true, message: "Please select your department!" }]}
//             >
//               <Select>
//                 <Select.Option value="CSE">CSE</Select.Option>
//                 <Select.Option value="Civil">Civil</Select.Option>
//                 <Select.Option value="ME">ME</Select.Option>
//                 <Select.Option value="EE">EE</Select.Option>
//                 <Select.Option value="Other">Other</Select.Option>
//               </Select>
//             </Form.Item>

//             <Form.Item
//               label="Semester"
//               name="semester"
//               rules={[{ required: true, message: "Please select your semester!" }]}
//             >
//               <Select>
//                 {['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'].map((sem) => (
//                   <Select.Option key={sem} value={sem}>{sem}</Select.Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Form.Item
//               label="Start Year"
//               name="startYear"
//               rules={[{ required: true, message: "Please select your start year!" }]}
//             >
//               <DatePicker picker="year" style={{ width: "100%" }} />
//             </Form.Item>

//             <Form.Item
//               label="End Year"
//               name="endYear"
//               rules={[{ required: true, message: "Please select your end year!" }]}
//             >
//               <DatePicker picker="year" style={{ width: "100%" }} />
//             </Form.Item>

//             <Form.Item
//               label="University"
//               name="university"
//               rules={[{ required: true, message: "Please select your university!" }]}
//             >
//               <Select>
//                 <Select.Option value="BTU">BTU</Select.Option>
//                 <Select.Option value="CU">CU</Select.Option>
//                 <Select.Option value="AMITY">AMITY</Select.Option>
//                 <Select.Option value="Other">Other</Select.Option>
//               </Select>
//             </Form.Item>

//             <Form.Item
//               label="College"
//               name="college"
//               rules={[{ required: true, message: "Please select your college!" }]}
//             >
//               <Select>
//                 <Select.Option value="LIET">LIET</Select.Option>
//                 <Select.Option value="MITRC">MITRC</Select.Option>
//                 <Select.Option value="NIET">NIET</Select.Option>
//                 <Select.Option value="Other">Other</Select.Option>
//               </Select>
//             </Form.Item>

//             <Form.Item>
//               <Button type="primary" htmlType="submit" block>
//                 Submit
//               </Button>
//             </Form.Item>
//           </Form>
//         </div>
//       </Card>
//       <Modal
//         title={modalContent.title}
//         visible={showModal}
//         onOk={handleConfirm}
//         onCancel={handleClose}
//         okText="Confirm"
//         cancelText="Close"
//       >
//         <p>{modalContent.body}</p>
//       </Modal>
//     </div>
//   );
// };

// export default StudentRegistration;