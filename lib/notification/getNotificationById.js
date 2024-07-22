import { ref, get } from 'firebase/database';
import { database } from '../../firebase';

export default async function getNotificationUId(uid) {
  const NotificationRef = ref(database, `notifications/${uid}/notification`);

  try {
    const snapshot = await get(NotificationRef);

    if (snapshot.exists()) {
      const notifications = [];
      snapshot.forEach(childSnapshot => {
        const NotificationId = childSnapshot.key;
        const NotificationData = childSnapshot.val();
        // Add each notification to the beginning of the array
        notifications.unshift({ uid, id: NotificationId, ...NotificationData });
      });
      return notifications;
    } else {
      console.log("No data available for the specified Notification ID");
      return null;
    }
  } catch (error) {
    console.error("Error fetching the Notification: ", error);
    return null;
  }
}
