// src/utils/logout.js
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const handleLogout = async (navigate) => {
  try {
    await signOut(auth);
    localStorage.removeItem("previousResults");
    localStorage.removeItem("darkMode");
    navigate("/");
  } catch (error) {
    console.error("Logout error:", error);
  }
};
