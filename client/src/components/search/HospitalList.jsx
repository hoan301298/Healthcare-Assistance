import React from 'react';
import RedirectToLoginPage from '../account_service/action/RedirectToLoginPage';


const HospitalList = ({ hospitals }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    const handleHospitalButtonClick = (hospital) => {
        localStorage.setItem('selectedHospital', JSON.stringify(hospital));
        if(isAuthenticated) {
            window.location.href ='/appointment';
        } else {
            const alertMessage = "Please Login to reserve your appointment!";
            RedirectToLoginPage({ pathname: '/appointment', alertMessage});
        }
    }
    
    return (
        <div>
        <h3>Hospitals Near Your Location: (Within 3 kilometers)</h3><br />
        <ul>
            {hospitals.map((hospital, index) => (
            <li key={index}>
                <h3>{hospital.name}</h3>
                Address: {hospital.information.details.formatted_address} <br />
                Phone Number: {hospital.information.details.formatted_phone_number} <br />
                <a href={hospital.information.details.website}>Visit Website</a> <br />
                Distance: {hospital.information.distance/1000}km <br />
                    {hospital.information.details.opening_hours && hospital.information.details.opening_hours.weekday_text && (
                        <div>
                            <h4>Opening Hours:</h4>
                            <ul>
                                {hospital.information.details.opening_hours.weekday_text.map(text => (
                                <li>{text}</li>
                                ))}
                            </ul>
                        </div>
                    )}    
                <button onClick={() => handleHospitalButtonClick(hospital)}>Book Appointment</button>
                <p>-----------------------------------------------------------------------------</p>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default HospitalList;