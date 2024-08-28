const Conversation = () => {
    return (
        <div className="flex items-center p-3 hover:bg-gray-800 rounded-lg cursor-pointer transition-all duration-200 ease-in-out">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-600">
                <img 
                    src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
                    alt="user avatar"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="ml-4 flex-grow">
                <p className="text-white font-semibold">John Doe</p>
            </div>
            <span className="text-xl">🎃</span>
        </div>
    );
};

export default Conversation;
