import axios from "axios";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import "./MyProfile.css";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchUserData();
  }, []);

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
  const navigate = useNavigate();

  const editHandler = (id) => {
    navigate(`/edit_profile/${id}`);
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
                    <td className="value">{value}</td>
                  </tr>
                ))}
            {userData && (
              <tr>
                <td className="label">CREATED_AT</td>
                <td className="value">{CreatedAtDate(userData.created_at)}</td>
              </tr>
            )}
          </tbody>
        </table>
        <button className="edit-btn" onClick={() => editHandler(userData._id)}>
          Edit
        </button>
      </div>
    </>
  );
};

export default MyProfile;
