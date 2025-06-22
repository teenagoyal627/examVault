import axios from "axios";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import "./MyProfile.css";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchUserData();
  }, []);
  const[editingField,setEditingField]=useState({})
  const[editedData,setEditedData]=useState({})

  const apiUrl = `${process.env.REACT_APP_APIURL}`;

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const auth = getAuth();
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const idToken = await user.getIdToken();
          const getRoleResponse = await axios.get(
            `${apiUrl}/login/get_teacher_data`,
            {
              headers: {
                Authorization: `Bearer ${idToken}`
              }
            }
          );
          setUserData(getRoleResponse.data);
          setLoading(false);
        } else {
          console.warn("No authenticated user found.");
          setUserData(null);
        }
      });
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };
  const CreatedAtDate = (inputDate) => {
    const date = new Date(inputDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long"
    });
  };

  const editProfileHandler=(fieldName)=>{
    console.log("edit button click")
    console.log(fieldName)
    setEditingField((prev)=>({...prev,[fieldName]:true}))
    setEditedData((prev)=>({...prev,[fieldName]:userData[fieldName]}))
  }
  const navigate = useNavigate();

  const saveEditedData = (id) => {
    navigate(`/my_profile`);
  };

  return (
    <>
      {loading && (
        <div className="loading-backdrop">
          <div className="loading-box">
            <div className="loading-spinner"></div>
            <div className="loading-text">
              Retrieving your profile, this might take a moment...
            </div>
          </div>
        </div>
      )}
      <div className="profile-card">
        <table>
          <tbody>
            {userData &&
              Object.entries(userData)
                .filter(
                  ([key]) =>
                    ![
                      "_id",
                      "user_id",
                      "updated_at",
                      "created_at",
                      "approved_time",
                      "__v"
                    ].includes(key)
                )
                .map(([key, value]) => (
                  <tr key={key}>
                    <td className="label">{key.toUpperCase()}</td>
                    <td className={`value ${key==="email" ? "disabled-value":""}`}>
                      {editingField[key] ? (
                        <input
                        className="editable-input"
                        value={editedData[key] ?? ""}
                        onChange={(e)=>setEditedData((prev)=>({...prev,[key]:e.target.value}))}/>
                      ):(
                        editedData[key]??userData[key]
                      )}
                    </td>
                    {key==="email"? (
                      <td></td>
                    ):(
                      <td>
                        <FiEdit className="editButton" onClick={()=>editProfileHandler(key)} />
                      </td>
                    )}
                  </tr>
                ))}
                
            {userData && (
              <tr>
                <td className="label">CREATED_AT</td>
                <td className="disabled-value">{CreatedAtDate(userData.created_at)}</td>
              </tr>
            )}
          </tbody>
        </table>
        <button className="edit-btn" onClick={() => saveEditedData(userData._id)}>
          Save
        </button>
      </div>
    </>
  );
};

export default MyProfile;
