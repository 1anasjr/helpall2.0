import { ref, get } from 'firebase/database';
import { database } from '../../firebase'; // Adjust the import path according to your project structure

export const getAllCommunities = async () => {
  const communitiesRef = ref(database, 'comunities'); // Reference to the 'communities' node

  try {
    const snapshot = await get(communitiesRef); // Get the data from the reference
    const communities = [];
    if (snapshot.exists()) {
      snapshot.forEach((communitySnapshot) => {
        const uid = communitySnapshot.key;
        communitySnapshot.child('comunity').forEach((Snapshot) => {
          const comunityId = Snapshot.key; // Retrieve the post ID
          const comunityData = Snapshot.val(); // Retrieve the post data
          communities.push({ uid, id: comunityId, ...comunityData }); // Combine UID, ID, and post data
      });
      });
    } else {
      console.log('No communities found.');
    }
    return communities;
  } catch (error) {
    console.error('Error fetching communities: ', error);
    return [];
  }
};
