import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import "../profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const auth = getAuth();
  const db = getFirestore();
  const [userData, setUserData] = useState({
    email: "",
    displayName: "",
    phoneNumber: "",
    age: "",
    gender: "",
    bloodGroup: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const userRef = doc(db, "profiles", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData(userSnap.data());
      } else {
        await setDoc(userRef, {
          email: user.email || "",
          displayName: user.displayName || "",
          phoneNumber: "",
          age: "",
          gender: "",
          bloodGroup: "",
        });
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="profile-page">
      <nav className="navbar">
        <h1>DetectX</h1>
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/wellness">Wellness Guide</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
        </ul>
      </nav>
      <div className="profileback1">
        <h2>Profile Page</h2>
        <table>
            <tr>
                <th>NAME</th>
                <td>{userData.displayName}</td>
            </tr>
            <tr>
                <th>EMAIL ID</th>
                <td>{userData.email}</td>
            </tr>
            <tr>
                <th>PHONE NUMBER</th>
                <td>{userData.phoneNumber}</td>
            </tr>
            <tr>
                <th>AGE</th>
                <td>{userData.age}</td>
            </tr>
            <tr>
                <th>GENDER</th>
                <td>{userData.gender}</td>
            </tr>
            <tr>
                <th>BLOOD GROUP</th>
                <td>{userData.bloodGroup}</td>
            </tr>
        </table>

        <button onClick={() => navigate("/editProfile")}>Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
