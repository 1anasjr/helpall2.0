import { ref, get } from 'firebase/database';
import { database } from '../../firebase';

export default async function getPostById(uid,postId){

    const postRef = ref(database, `posts/${uid}/userPosts/${postId}`);
    try {
        const snapshot = await get(postRef);
        if (snapshot.exists()) {
            const postData = snapshot.val();
            return { uid, id: postId, ...postData };
        } else {
            console.log("No data available for the specified post ID");
            return null;
        }
    } catch (error) {
        console.error("Error fetching the post: ", error);
        return null;
    }

}