import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import { keyUser, socket }  from './Contact';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const location = useLocation();
    const [typingStatus, setTypingStatus] = useState('');
    const lastMessageRef = useRef(null);
    
    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
    }, [socket, location, messages]);

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        socket.on('typingResponse', (data) => setTypingStatus(data));
    }, [socket]);

    return (
        <div className="chat__main">
            <ChatBody 
                messages={messages} 
                uniqueId={keyUser}
                typingStatus={typingStatus}
                lastMessageRef={lastMessageRef}
            />
            <ChatFooter 
                socket={socket} 
                uniqueId={keyUser} 
            />
        </div>
    );
};

export default ChatPage;