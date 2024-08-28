import { useEffect } from "react";
import axios from "axios";
import { useConversation } from "../../../context/ConversationContext";
import { useState } from "react";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/messages/${selectedConversation._id}`);
        setMessages(res.data);
      } catch (error) {
        console.error("Failed to fetch messages:", error.message);
      } finally{
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages]);

  return { messages ,loading };
};

export default useGetMessages;
