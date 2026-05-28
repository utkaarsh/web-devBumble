import axios from "axios";
import { BASE_URL } from "./constants";

/**
 * Request browser geolocation permission and send it to backend
 */
export const requestAndSetLocation = async () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      console.warn("Geolocation not supported by browser");
      reject(new Error("Geolocation not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Send location to backend
          const response = await axios.put(
            `${BASE_URL}/users/location`,
            {
              latitude,
              longitude,
            },
            {
              withCredentials: true,
            }
          );

          console.log("Location updated successfully:", response.data);
          resolve(response.data);
        } catch (error) {
          console.error("Failed to update location on backend:", error);
          reject(error);
        }
      },
      (error) => {
        console.warn("Geolocation error:", error.message);
        reject(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
};

/**
 * Attempt to set location, but don't fail if it errors
 */
export const setLocationIfNeeded = async () => {
  try {
    await requestAndSetLocation();
  } catch (error) {
    console.warn("Could not set location:", error.message);
    // Don't throw - allow app to continue even if location fails
  }
};
