import { useEffect } from "react";
import { useSocket } from "../../../context/SocketContext";
import { useConversation } from "../../../context/ConversationContext";

const useListenMessages = () => {
    const socket = useSocket(); 
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        if (!socket) {
            console.warn('Socket is not available');
            return; 
        }
      
        const handleNewMessage = (newMessage) => {
            console.log("New message received:", newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket, setMessages]);

};

export default useListenMessages;
