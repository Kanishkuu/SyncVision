import MessageContainer from "./components/messages/MessageContainer";
import Sidebar from "./components/sidebar/Sidebar";

const ChatPage = () => {
    return (
        <div className="relative flex items-center justify-center h-screen bg-gradient-to-br from-pink-300 to-indigo-700 overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-gradient-to-br from-indigo-800 to-transparent opacity-50 rounded-full"></div>
            <div className="absolute top-[-10%] right-[-10%] w-72 h-72 bg-gradient-to-bl from-indigo-800 to-transparent opacity-50 rounded-full"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-72 h-72 bg-gradient-to-tr from-indigo-800 to-transparent opacity-50 rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-gradient-to-tl from-indigo-800 to-transparent opacity-50 rounded-full"></div>

            <div className="flex  fixed w-full max-w-4xl h-4/5 bg-white shadow-2xl rounded-lg overflow-hidden">
                <Sidebar />
                <MessageContainer />
            </div>
        </div>
    );
};

export default ChatPage;
