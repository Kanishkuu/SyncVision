import { useState, useEffect } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { useParams } from 'react-router-dom';
import { useSocket } from '../../context/SocketContext';

const Whiteboard = () => {
  const { roomId } = useParams();
  const socket = useSocket();
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [tool, setTool] = useState('line');

  useEffect(() => {
    if (!socket) return;

    socket.emit('joinRoom', roomId);

    socket.on('draw', (line) => {
      setLines((prevLines) => [...prevLines, line]);
    });

    socket.on('clear', () => {
      setLines([]);
    });

    return () => {
      socket.off('draw');
      socket.off('clear');
    };
  }, [roomId, socket]);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const { x, y } = e.target.getStage().getPointerPosition();
    if (tool === 'line') {
      const newLine = { points: [x, y], color, tool };
      setLines((prevLines) => [...prevLines, newLine]);
      socket.emit('draw', { roomId, line: newLine });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const { x, y } = e.target.getStage().getPointerPosition();

    if (tool === 'line') {
      setLines((prevLines) => {
        const lastLine = prevLines[prevLines.length - 1];
        lastLine.points = [...lastLine.points, x, y];
        socket.emit('draw', { roomId, line: lastLine });
        return [...prevLines];
      });
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    setLines([]);
    socket.emit('clear', { roomId });
  };

  const handleExit = () => {
    navigate('/dashboard');
  };

  const drawLine = (line, index) => (
    <Line
      key={index}
      points={line.points}
      stroke={line.color}
      strokeWidth={5}
      lineCap="round"
      lineJoin="round"
    />
  );

  return (
    <div className="flex flex-col h-screen text-gray-100">
      <div className="bg-gray-800 p-4 flex justify-between items-center shadow-md">
        <div className="flex space-x-4">
          <button
            onClick={() => setTool('line')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Line
          </button>
          <input
            type="color"
            onChange={(e) => setColor(e.target.value)}
            value={color}
            className="ml-4 border-none p-1 rounded-md"
          />
          <button
            onClick={handleClear}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Clear
          </button>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleExit}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Exit
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(roomId)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Copy Room ID
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <Stage
          width={window.innerWidth}
          height={window.innerHeight - 56}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <Layer>
            {lines.map((line, index) => drawLine(line, index))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Whiteboard;
