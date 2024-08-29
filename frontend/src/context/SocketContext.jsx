import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuthContext } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const newSocket = io("http://localhost:5000", {
                query: { 
                    userId: authUser._id ,
                },
                withCredentials: true,
            });

            newSocket.on('connect', () => {
                console.log('Socket connected:', newSocket.id);
            });
    
            newSocket.on('disconnect', () => {
                console.log('Socket disconnected:', newSocket.id);
            });

            setSocket(newSocket);

            return () => {
                newSocket.close();
                console.log('Socket disconnected');
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
