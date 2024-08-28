import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import useSendMessage from "../../Hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading , sendMessage} = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if(!message) return ;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-4 bg-gray-900 border-t border-gray-700 rounded-lg">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 p-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none"
        placeholder="Type your message..."
      />
      <button 
        type="submit" 
        className="ml-2 p-2 text-white rounded-full hover:bg-blue-600 transition"
      >
        {loading ? <div className='loading loading-spinner'></div> : <FaPaperPlane />}
      </button>
    </form>
  );
};

export default MessageInput;
