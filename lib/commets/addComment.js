import { ref, push } from 'firebase/database';
import { database } from '../../firebase'; // Adjust the import path according to your project structure

export default function addComments(uid,postId,userName,comment){
    const commentRef = ref(database, 'comments');
    push(commentRef, {
        comment:comment,
       uid:uid,
       postId:postId,
       userName:userName
    });
}