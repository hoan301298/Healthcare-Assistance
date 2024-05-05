import React from 'react';

const Sidebar = ({ updatePageCode }) => {
    return (
        <div className="sidebar">
            <ul>
                <li><button onClick={() => updatePageCode(0)}>Profile</button></li>
                <li><button onClick={() => updatePageCode(1)}>Appointment</button></li>
                <li><button onClick={() => updatePageCode(2)}>Reset Password</button></li>
            </ul>
        </div>
    );
}

export default Sidebar;