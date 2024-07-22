import { ref, push } from 'firebase/database';
import { database } from '../../firebase'; // Adjust the import path according to your project structure

export default function pushNotification(uid,text,link) {
    const notificationsRef = ref(database,  `notifications/${uid}/notification` );
    push(notificationsRef, {
        text,
        uid,
        link
    });
}
