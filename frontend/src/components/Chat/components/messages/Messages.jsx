import Message from "./Message";

const Messages = () => {
    return (
        <div className="flex flex-col space-y-4 p-4 bg-gray-100 rounded-lg">
            <div className="flex flex-col items-end space-y-2">
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
            </div>
        </div>
    );
};

export default Messages;
