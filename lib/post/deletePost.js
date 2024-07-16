import { ref, remove } from 'firebase/database';
import { database } from '../../firebase'; // Adjust the import path according to your project structure

export default function deletePost(uid,postId){
    const postRef = ref(database, `posts/${uid}/userPosts/${postId}`);
    remove(postRef)
        .then(() => {
            console.log('Post successfully deleted');
        })
        .catch((error) => {
            console.error('Error deleting post:', error);
        });
}