import { ref, push } from 'firebase/database';
import { database } from '../../firebase'; // Adjust the import path according to your project structure

export default function addPost(post) {
    const { isEmergency, emiratesId, uid ,recipientDescription,userName,email, date, totaldonate, title, document, thumbnail ,profileImg ,type } = post;
    const postsRef = ref(database,  `posts/${uid}/userPosts` );
    push(postsRef, {
        title:title,
        isEmergency: isEmergency =='' ? 0 : parseInt(isEmergency),
        emiratesId: emiratesId,
        uid:uid,
        recipientDescription: recipientDescription,
        totaldonate: parseInt(totaldonate),
        currentDonation: 0, // assuming currentDonation starts at 0
        userName: userName, // assuming userDetail is defined somewhere
        email: email, // assuming userDetail is defined somewhere
        document: document,
        status: 0, //0 = pending , 1 = approved , -1 = reject
        thumbnail: thumbnail,
        profileImg: profileImg,
        type:type,
        date:date
    });
}
