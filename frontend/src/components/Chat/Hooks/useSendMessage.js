import axios from "axios";
import { useConversation } from "../../../context/ConversationContext";
import { useState } from "react";

const useSendMessage = () => {
    const { messages, setMessages, selectedConversation } = useConversation();
    const [ loading , setLoading] = useState(false);

    const sendMessage = async (message) => {
        try {
            const res = await axios.post(`/api/messages/send/${selectedConversation._id}`, 
                {message},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = res.data;
            if (data.error) throw new Error(data.error);

            setMessages([...messages, data]);
        } catch (error) {
            console.error(error.message);
        } finally {
			setLoading(false);
		}
    };

    return { loading , sendMessage };
};

export default useSendMessage;
