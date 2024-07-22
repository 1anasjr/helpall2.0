"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import pushNotification from "../../../lib/notification/pushNotification";
import getNotificationUId from "../../../lib/notification/getNotificationById";
import { useAuth } from "./AuthProvider";

const NotificationContext = createContext();

export default function NotificationProvider({ children }) {
    const [refresh, setRefresh] = useState(false); // Initialize loading state
    const [notifications, setNotifications] = useState([]); // Initialize loading state
    const { currentUser } = useAuth();

    const addNotification = async (uid, txt, link) => {
        try {
            await pushNotification(uid, txt, link);
            setRefresh(true);
        } catch (error) {
            console.error("Error pushing notification:", error);
        }
    };

    const getNotificationByUserId = async (uid) => {
        try {
            const notifications = await getNotificationUId(uid);
            // Handle notifications (e.g., update state with the notifications)
            setNotifications(notifications);
            setRefresh(false);
        } catch (error) {
            console.error("Error getting notifications by user ID:", error);
        }
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            if (currentUser?.uid) {
                await getNotificationByUserId(currentUser.uid);
            }
        };

        fetchNotifications();
    }, [currentUser?.uid, refresh]);
    return (
        <NotificationContext.Provider value={{ addNotification, notifications }}>
            {children}
        </NotificationContext.Provider>
    );
}

export const useNotification = () => useContext(NotificationContext);
