import { ref, get } from 'firebase/database';
import { database } from '../../firebase';

export default async function getCommunityUId(uid) {
  const communityRef = ref(database, `comunities/${uid}/comunity`);

  try {
    const snapshot = await get(communityRef);

    if (snapshot.exists()) {
      const communities = [];
      snapshot.forEach(childSnapshot => {
        const communityId = childSnapshot.key;
        const communityData = childSnapshot.val();
        communities.push({ uid, id: communityId, ...communityData });
      });
      return communities;
    } else {
      console.log("No data available for the specified community ID");
      return null;
    }
  } catch (error) {
    console.error("Error fetching the community: ", error);
    return null;
  }
}
