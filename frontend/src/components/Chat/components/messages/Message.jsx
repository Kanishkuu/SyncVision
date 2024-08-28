const Message = () => {
    return (
        <div className="flex items-start space-x-3 flex-row-reverse">
            <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                    alt="User avatar"
                    src="https://cdn.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="bg-blue-500 text-white p-3 rounded-xl">
                Hi there! How’s it going?
            </div>
        </div>
    );
};

export default Message;
