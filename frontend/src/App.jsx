import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Editor from './components/Editor';
import Whiteboard from './components/Whiteboard/Whiteboard';
import TaskManager from './components/TaskManager';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import NotFound from './components/NotFound';
import Room from './components/Whiteboard/Room';
import ChatPage from './components/Chat/ChatPage';
import { AuthContext } from './context/AuthContext';

function App() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-800 text-white text-lg font-semibold">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}/>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />}/>
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />}/>
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}/>
        <Route path="/chatpage" element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />}/>
        <Route path="/editor" element={isAuthenticated ? <Editor /> : <Navigate to="/login" />}/>
        <Route path="/whiteboard" element={isAuthenticated ? <Room /> : <Navigate to="/login" />}/>
        <Route path="/whiteboard/:roomId" element={isAuthenticated ? <Whiteboard /> : <Navigate to="/login" />}/>
        <Route path="/task-manager" element={isAuthenticated ? <TaskManager /> : <Navigate to="/login" />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
