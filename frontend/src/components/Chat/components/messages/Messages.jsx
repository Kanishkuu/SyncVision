import { useRef, useEffect } from "react";
import useGetMessages from "../../Hooks/useGetMessages";
import Message from "./Message";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessages from "../../Hooks/useListenMessages";

const Messages = () => {
    const { messages, loading } = useGetMessages();
    useListenMessages();
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div
            ref={messagesContainerRef}
            className="flex flex-col p-4 bg-gray-900 rounded-lg h-full overflow-y-auto"
        >
            <div className="flex flex-col space-y-2">
                {!loading &&
                    messages.length > 0 &&
                    messages.map((message) => (
                        <div key={message._id}>
                            <Message message={message} />
                        </div>
                    ))}

                {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

                {!loading && messages.length === 0 && (
                    <p className='self-center text-white'>Send a message to start the conversation</p>
                )}
            </div>
            <div ref={messagesEndRef}/>
        </div>
    );
};

export default Messages;
