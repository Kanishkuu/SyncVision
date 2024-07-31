import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Editor from './components/Editor';
import Whiteboard from './components/Whiteboard';
import Homepage from './components/Homepage';
import TaskManager from './components/TaskManager';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute'; // Adjust the path if needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
        <Route path="/editor" element={<PrivateRoute element={Editor} />} />
        <Route path="/whiteboard" element={<PrivateRoute element={Whiteboard} />} />
        <Route path="/task-manager" element={<PrivateRoute element={TaskManager} />} />
      </Routes>
    </Router>
  );
}

export default App;
