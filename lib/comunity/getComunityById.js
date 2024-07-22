import { ref, get } from 'firebase/database';
import { database } from '../../firebase';

export default async function getComunityById(uid,comunityId){
    const comunityRef = ref(database, `comunities/${uid}/comunity/${comunityId}`);
    try {
        const snapshot = await get(comunityRef);
        if (snapshot.exists()) {
            const comunityData = snapshot.val();
            return { uid, id: comunityId, ...comunityData };
        } else {
            console.log("No data available for the specified post ID");
            return null;
        }
    } catch (error) {
        console.error("Error fetching the post: ", error);
        return null;
    }
}