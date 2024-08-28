import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useConversation } from '../../../../context/ConversationContext';
import useGetConversations from '../../Hooks/useGetConversations';

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const { setSelectedConversation } = useConversation();
    const { conversations } = useGetConversations();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (search.length < 3) {
            console.log("Search term must be at least 3 characters long");
            return;
        }

        if (!conversations || conversations.length === 0) {
            console.log("No conversations available.");
            return;
        }

        const filteredConversations = conversations.filter(conversation =>
            conversation.username.toLowerCase().includes(search.toLowerCase())
        );

        if (filteredConversations.length > 0) {
            setSelectedConversation(filteredConversations[0]);
            setSearch(""); 
        } else {
            console.log("No matching conversations found.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center bg-gray-900 p-2 rounded-lg">
            <input 
                type="text" 
                placeholder="Search…" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 p-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none"
            />
            <button 
                type="submit" 
                className="ml-2 p-2 text-white rounded-full hover:bg-blue-600 transition"
            >
                <FaSearch />
            </button>
        </form>
    );
};

export default SearchInput;
