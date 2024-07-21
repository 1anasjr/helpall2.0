import { ref, get, child } from "firebase/database";
import { database } from '../../firebase';

// Function to get user data from Firebase Realtime Database
async function getUser() {
  const dbRef = ref(database);     // Reference to the database root

  try {
    // Fetch the user data from the database
    const snapshot = await get(child(dbRef, `users`));
    
    if (snapshot.exists()) {
      return snapshot.val();  // Return user data if it exists
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
}

export default getUser;
