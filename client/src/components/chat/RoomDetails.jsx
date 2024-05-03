import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import socketIO from "socket.io-client";
let socket;

const RoomDetails = () => {

    const [rooms, setRooms] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [selectedName, setSelectedName] = useState('');

    const navigate = new useNavigate();

    const username = localStorage.getItem('username');

    const connectSocket = () => {
        socket = socketIO.connect('http://localhost:5000');
    }

    const handleCreateRoom = (e) => {
        e.preventDefault();
        if(title != '' && selectedName != '' ) {
            connectSocket();
            socket.emit('create', {
                username,
                selectedName,
                title
            });
            navigate('/chat');
        }
    };

    const handleJoinRoom = (room) => {
        if(selectedName != '') {
            connectSocket();
            room.selectedName = selectedName;
            socket.emit('join', room);
            navigate('/chat');
        }
    }

    const handleShowRoom = () => {
        connectSocket();
        setIsVisible(true);
        socket.emit('getRooms');
        socket.on('roomsList', (roomsList) => {
            setRooms(roomsList)
        });
        setTimeout(() => {
            socket.disconnect();
        }, 2 * 1000);
    }

    return (
        <div className="home__container">
            <form className="home__container">
                <input type="text" placeholder="Your name" value={selectedName} minLength={5} maxLength={10} onChange={(e) => setSelectedName(e.target.value)} required/>
                <input type="text" placeholder="Type title of disease" value={title} maxLength={20} onChange={(e) => setTitle(e.target.value)}/>
                <button className="home__cta" onClick={handleCreateRoom}>Create Room</button>
                <button className="home__cta" onClick={handleShowRoom}>Show Rooms</button>
                <h2>Available Rooms:</h2>
                {isVisible && 
                    ( rooms.length !== 0? (
                        rooms.map((room, index) => {
                            return (
                                
                                <ul key={index}>
                                    <li>
                                        <button onClick={() => handleJoinRoom(room)}>
                                            Room: {room.roomID} ---- Title: {room.title}
                                        </button>
                                    </li>
                                </ul>
                            );
                    })
                    ) : (
                        <h2>No Room Available!</h2>
                    ))
                }
            </form>
        </div>
    )
}

export {RoomDetails, socket}