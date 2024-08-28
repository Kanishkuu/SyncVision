import { BiExit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const ExitButton = () => {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/dashboard'); 
  };

  return (
    <div className="flex justify-items-center">
      <BiExit className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-600 transition" onClick={handleExit} />
    </div>
  );
};

export default ExitButton;
