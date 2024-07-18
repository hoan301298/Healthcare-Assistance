import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import { socket }  from './RoomDetails';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [typingStatus, setTypingStatus] = useState('');
    const [roomDetails, setRoomDetails] = useState({});
    const lastMessageRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
        console.log(messages)
    }, [socket, location, messages]);
    useEffect(() => {
        socket.on('roomDetails', (data) => {
            setRoomDetails({
                roomID: data.roomID,
                selectedName: data.selectedName,
                title: data.title
            })
        });
    }, []);
    useEffect(() => {
        socket.on('typingResponse', (data) => setTypingStatus(data));
    }, [socket]);

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chat__main">
            <ChatBody 
                roomDetails={roomDetails}
                messages={messages}
                typingStatus={typingStatus}
                lastMessageRef={lastMessageRef}
            />
            <ChatFooter
                roomDetails={roomDetails}
                socket={socket} 
            />
        </div>
    );
};

export default ChatPage;