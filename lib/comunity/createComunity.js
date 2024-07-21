import {ref, push, set } from 'firebase/database';
import { database } from '../../firebase';

// Save a new community to Firebase Realtime Database
export const createCommunity = async (community) => {
  const communitiesRef = ref(database, `comunities/${community.uid}/comunity`); // Reference to the 'communities' node

  try {
    const newCommunityRef = push(communitiesRef); // Create a new unique key for the community
    await set(newCommunityRef, community); // Save the community data to the new key
    console.log('Community saved successfully');
  } catch (error) {
    console.error('Error saving community: ', error);
  }
};
