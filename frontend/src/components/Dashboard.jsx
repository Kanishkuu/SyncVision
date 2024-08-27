import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboard, faComments, faRotate } from '@fortawesome/free-solid-svg-icons';
import Logout from './Auth/Logout';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Main content area */}
      <main className="flex-grow flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="flex justify-end items-center bg-gradient-to-r from-gray-700 to-gray-900 p-4 shadow-md border-b border-gray-800">
          <div className="flex items-center space-x-4">
            <Logout />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow flex flex-col items-center justify-center p-12 bg-gray-100 rounded-t-3xl shadow-lg">
          <div className="flex flex-col items-center justify-center mb-12">
            <FontAwesomeIcon icon={faRotate} className="text-blue-500 text-6xl mb-4 animate-spin" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">SyncVision</h1>
            <p className="text-xl text-center text-gray-600 mb-6 max-w-md">
              Collaborate in real-time, brainstorm ideas, and bring your vision to life with our powerful tools.
            </p>
          </div>
          
          <div className="flex space-x-8 mb-12">
            {/* Whiteboard Card */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-xl w-80 transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-200">
              <FontAwesomeIcon icon={faChalkboard} className="text-blue-600 text-4xl mb-4" />
              <h2 className="text-2xl font-semibold mb-4 text-white">Whiteboard</h2>
              <p className="text-white mb-4">Collaborate in real-time with a dynamic whiteboard tool. Create, draw, and brainstorm with ease.</p>
              <Link 
                to="/whiteboard" 
                className="block mt-4 text-blue-500 hover:underline transition-transform transform hover:scale-105"
              >
                Go to Whiteboard
              </Link>
            </div>

            {/* Chat Card */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-xl w-80 transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-200">
              <FontAwesomeIcon icon={faComments} className="text-blue-600 text-4xl mb-4" />
              <h2 className="text-2xl font-semibold mb-4 text-white">Chat</h2>
              <p className="text-white mb-4">Engage in real-time conversations, share ideas, and stay connected with the chat feature.</p>
              <Link 
                to="/chatpage" 
                className="block mt-4 text-blue-500 hover:underline transition-transform transform hover:scale-105"
              >
                Go to Chat
              </Link>
            </div>
          </div>

          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
