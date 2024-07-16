import { ref, update } from 'firebase/database';
import { database } from '../../firebase'; // Adjust the import path according to your project structure

export default async function editPost(uid, postId, post) {
    const postRef = ref(database, `posts/${uid}/userPosts/${postId}`);
    update(postRef, post).catch((error) => {
        console.error("Error updating post:", error);
    });
}
