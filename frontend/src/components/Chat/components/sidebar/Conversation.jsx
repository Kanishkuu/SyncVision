import { useConversation } from "../../../../context/ConversationContext";

const Conversation = ({ conversation, emoji }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;

    return (
        <div
            onClick={() => setSelectedConversation(conversation)}
            className={`flex items-center p-3 hover:bg-blue-500 rounded-2xl cursor-pointer transition-all duration-200 ease-in-out mb-3 my-auto
            ${isSelected ? "bg-blue-500" : "" }`}
        >
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-600">
                <img
                    src={conversation.profilePic}
                    alt="user avatar"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="ml-4 flex-grow">
                <p className="text-white font-semibold">{conversation.username}</p>
            </div>
            <span className="text-xl">{emoji}</span>
        </div>
    );
};

export default Conversation;
