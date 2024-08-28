import { useEffect } from "react";
import { useConversation } from "../../../../context/ConversationContext";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti"; 
import { useAuthContext } from "../../../../context/AuthContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {

		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

    return (
        <div className="flex flex-col h-full w-full bg-gray-900 text-white rounded-r-lg">
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    <div className="bg-gray-800 p-4 shadow-md rounded-t-lg">
                        <span className="text-lg font-semibold">Chat with:</span>
                        <span className="text-lg font-bold ml-2">{selectedConversation.username}</span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 bg-gray-900">
                        <Messages />
                    </div>

                    <div className="p-3 border-t border-gray-700 bg-gray-800 rounded-b-xl">
                        <MessageInput />
                    </div>
                </>
            )}
        </div>
    );
};

export default MessageContainer;

const NoChatSelected = () => {
  const {authUser} = useAuthContext();
  return (
    <div className='flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black'>
      <div className='bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center gap-4'>
        <TiMessages className='text-4xl md:text-6xl text-gray-400 mb-4' />
        <p className='text-lg md:text-xl text-gray-200 font-semibold'>Welcome 👋 {authUser.username} ❄</p>
        <p className='text-sm md:text-lg text-gray-300'>Select a chat to start messaging</p>
      </div>
    </div>
  );
};