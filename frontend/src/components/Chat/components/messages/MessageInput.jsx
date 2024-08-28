import { FaPaperPlane } from "react-icons/fa";

const MessageInput = () => {
  return (
    <div className="flex items-center p-4 bg-gray-900 border-t border-gray-700 rounded-lg">
      <input
        type="text"
        className="flex-1 p-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none"
        placeholder="Type your message..."
      />
      <button 
        type="submit" 
        className="ml-2 p-2 text-white rounded-full hover:bg-blue-600 transition"
      >
        <FaPaperPlane />
      </button>
    </div>
  );
};

export default MessageInput;
