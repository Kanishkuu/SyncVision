import Conversation from "./Conversation";
import useGetConversations from "../../Hooks/useGetConversations";
import { getRandomEmoji } from "../../../../utils/emoji";

const Conversations = () => {
    const { loading, conversations } = useGetConversations();

    return (
        <div className="p-2">
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <span className='loading loading-spinner mx-auto'></span>
                </div>
            ) : (
                conversations.map((conversation) => (
                    <Conversation
                        key={conversation._id}
                        conversation={conversation}
                        emoji={getRandomEmoji()}
                    />
                ))
            )}
        </div>
    );
};

export default Conversations;
