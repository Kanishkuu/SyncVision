import { useAuthContext } from "../../../../context/AuthContext";
import { useConversation } from "../../../../context/ConversationContext";
import { extractTime } from "../../../../utils/extractTime";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();

    const fromMe = message.senderId === authUser._id;
    const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-violet-600";
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const formattedTime = extractTime(message.createdAt);

    return (
        <div className={`flex flex-col ${fromMe ? "items-end" : "items-start"} my-1`}>
            <div className="flex items-center">
                {!fromMe && (
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                            alt="User avatar"
                            src={profilePic}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                <div className={`max-w-xs p-2.5 rounded-xl text-white ${bubbleBgColor} mx-3`}>
                    {message.message}
                </div>
                {fromMe && (
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                            alt="User avatar"
                            src={profilePic}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </div>
            <div className={`opacity-50 text-xs mt-1 ${fromMe ? "self-end" : "self-start"}`}>
                {formattedTime}
            </div>
        </div>
    );
};

export default Message;
