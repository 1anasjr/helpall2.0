import { ref, get } from 'firebase/database';
import { database } from '../../firebase'; // Adjust the import path according to your project structure

export default async function getComments() {
    const commentsRef = ref(database, 'comments');
    const snapshot = await get(commentsRef);
    const comments = [];
    if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
             const postId = childSnapshot.key; // Retrieve the auto-generated ID
             const commentsData = childSnapshot.val(); // Retrieve the post data
             comments.push({ id: postId, ...commentsData }); // Combine ID and post data
             console.log(comments);
        });
    } else {
        console.log("No data available");
    }
    return comments;
}  