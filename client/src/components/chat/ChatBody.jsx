import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatBody = ({ roomDetails, messages, typingStatus, lastMessageRef }) => {
    const navigate = useNavigate();

    const handleLeaveChat = () => {
        navigate('/');
        window.location.reload();
    };

    return (
        <div className='chat__layout'>
            <header className="chat__mainHeader">
                <p>Room ID: {roomDetails.roomID} ---------- Title: {roomDetails.title}</p>
                <button className="leaveChat__btn" onClick={handleLeaveChat}>
                LEAVE CHAT
                </button>
            </header>

            {/*This shows messages sent from you*/}
            <div className="message__container">
                {messages.map((message) =>
                    message.roomDetails.roomID === roomDetails.roomID && (
                    message.roomDetails.selectedName === roomDetails.selectedName ? (
                        <div className="message__chats" key={message.id}>
                            <p className="sender__name">You</p>
                            <div className="message__sender">
                                <p>{message.text}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="message__chats" key={message.id}>
                            <p>{message.roomDetails.selectedName}</p>
                            <div className="message__recipient">
                                <p>{message.text}</p>
                            </div>
                        </div>
                    ))
                )}
                
                {/*This is triggered when a user is typing*/}
                {/* <div className="message__status">
                <p>Someone is typing...</p>
                </div> */}
                <div ref={lastMessageRef} />
                <div className="message__status">
                    <p>{typingStatus}</p>
                </div>
            </div>
        </div>
    );
};

export default ChatBody;