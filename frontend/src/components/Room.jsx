import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { v4 as uuidv4 } from 'uuid';

const Room = () => {
  const [roomId, setRoomId] = useState('');
  const [isCreating, setIsCreating] = useState(true);
  const navigate = useNavigate(); // useNavigate hook to programmatically navigate

  const handleCreateRoom = () => {
    const newRoomId = uuidv4(); // Generate a unique room ID
    console.log('Creating room:', newRoomId);
    navigate(`/whiteboard/${newRoomId}`); // Redirect to the whiteboard page with the new room ID
  };

  const handleJoinRoom = () => {
    if (!roomId.trim()) { // Trim to remove leading/trailing spaces
      alert('Please enter a valid room ID to join');
      return;
    }
    console.log('Joining room:', roomId);
    navigate(`/whiteboard/${roomId}`); // Redirect to the whiteboard page with the existing room ID
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isCreating ? 'Create a Room' : 'Join a Room'}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            isCreating ? handleCreateRoom() : handleJoinRoom();
          }}
          className="space-y-4"
        >
          {!isCreating && (
            <div>
              <label htmlFor="roomId" className="block text-sm font-medium text-gray-700 mb-2">
                Room ID
              </label>
              <input
                type="text"
                id="roomId"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter room ID"
                required
              />
            </div>
          )}
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isCreating ? 'Create Room' : 'Join Room'}
            </button>
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsCreating(!isCreating)}
              className="text-blue-500 hover:underline"
            >
              {isCreating ? 'Or Join an Existing Room' : 'Or Create a New Room'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Room;
