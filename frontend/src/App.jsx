import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Editor from './components/Editor';
import Whiteboard from './components/Whiteboard';
import Homepage from './components/Homepage';
import TaskManager from './components/TaskManager';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import NotFound from './components/NotFound';




function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/whiteboard" element={<Whiteboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/task-manager" element={<TaskManager />} />
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
