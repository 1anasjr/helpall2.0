import { getDatabase, ref, set } from 'firebase/database';

export const saveUserProfile = async (user) => {
  const db = getDatabase();
  const userRef = ref(db, `users/${user.uid}`);

  try {
    await set(userRef, {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL // Save the profile image URL
    });
  } catch (error) {
    console.error("Error saving user profile: ", error);
  }
};
