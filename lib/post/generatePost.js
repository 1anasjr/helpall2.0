import { ref, get } from 'firebase/database';
import { database } from '../../firebase'; // Adjust the import path according to your project structure

export default async function generatePost() {
    const postsRef = ref(database, 'posts');
    try {
        const snapshot = await get(postsRef);
        const posts = [];
        if (snapshot.exists()) {
            snapshot.forEach((userSnapshot) => {
                const uid = userSnapshot.key; // Retrieve the user ID
                userSnapshot.child('userPosts').forEach((postSnapshot) => {
                    const postId = postSnapshot.key; // Retrieve the post ID
                    const postData = postSnapshot.val(); // Retrieve the post data
                    posts.push({ uid, id: postId, ...postData }); // Combine UID, ID, and post data
                });
            });
        } else {
            console.log("No data available");
        }
        return posts;
    } catch (error) {
        console.error("Error fetching posts: ", error);
        return [];
    }
}
