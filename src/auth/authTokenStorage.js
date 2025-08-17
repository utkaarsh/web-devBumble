// authTokenStorage.js

const TOKEN_KEY = "auth_token";
import { jwtDecode } from "jwt-decode";
const jwtSecret = import.meta.env.JWT_SECRET;

export const decodeToken = (token) => {
  if (!token) return;
  try {
    // ✅ Verify & decode (safer, requires secret key)
    const decoded = jwtDecode(token, jwtSecret);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error.message);
    return null;
  }
};

// Save token
export const saveToken = (token) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.error("Failed to save token:", e);
  }
};

// Retrieve token
export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (e) {
    console.error("Failed to get token:", e);
    return null;
  }
};

// Delete token (e.g., on logout)
export const deleteToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    console.log("Token deleted");
  } catch (e) {
    console.error("Failed to delete token:", e);
  }
};
