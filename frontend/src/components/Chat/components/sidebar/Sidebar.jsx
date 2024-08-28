import Conversations from "./Conversations";
import ExitButton from "./ExitButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
    return (
        <div className="w-80 bg-gray-900 text-white flex flex-col border-r border-gray-700 rounded-l-lg">
            <div className="p-4">
                <SearchInput />
            </div>
            <div className="flex-1 overflow-y-auto">
                <Conversations />
            </div>
            <div className="p-4 border-t border-gray-700">
                <ExitButton />
            </div>
        </div>
    );
};

export default Sidebar;
