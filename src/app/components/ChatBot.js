"use client";
import { lazy, Suspense, useEffect, useState } from "react";
import conversation from "../data/chatBotConvo";
const ChatBot = lazy(() => import("react-chatbotify"));

const ChatBotComponent = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
      setIsLoaded(true);
    }, [])


    const flow = {
        start: {
            message: "Hello Sir/Madam, How can I help you?",
            options: [
                "Ask about website trustworthiness",
                ,"Contact support",
                ,"Other inquiries"
                ,"whatisyourname"
            ],
            path: "end"
        },
        end: {
            message: (params) => conversation(params.userInput),
            path: "end"
        }
    };
    
    
  
    return (
      <>
      {isLoaded && (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="hidden md:flex absolute bottom-10 right-10">
                <ChatBot flow={flow} />
            </div>
        </Suspense>
      )}
      </>
    );
}

export default ChatBotComponent