import React, { useState } from 'react';

const ChatFooter = ({ roomDetails, socket }) => {
  const [message, setMessage] = useState('');
  const username = localStorage.getItem('username');

  const handleTyping = () => {
      socket.emit('typing', `${roomDetails.selectedName} is typing...`);
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && username) {
      socket.emit('message', {
        text: message,
        username: username,
        roomDetails: roomDetails,
        id: `${socket.id}${Math.random()}`
      });
    }
    setMessage('');
  };
  
  return (
    <div className="chat__footer"> 
      <form className="form">
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button onClick={(e) => handleSendMessage(e)} className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;