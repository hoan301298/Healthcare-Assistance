import React, { useState } from 'react';
import RedirectToLoginPage from '../account_service/RedirectToLoginPage';


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
        <h3>Hospitals Near Your Location:</h3>
        <ul>
            {hospitals.map((hospital, index) => (
            <li key={index}>
                <h3>{hospital.name}</h3>
                Address: {hospital.information.details.formatted_address} <br />
                Phone Number: {hospital.information.details.formatted_phone_number} <br />
                <a href={hospital.information.details.website}>Visit Website</a> <br />
                Distance: {hospital.information.distance/1000}km <br />
                <h4>Opening Hours:</h4>
                
                    {hospital.information.details.opening_hours && hospital.information.details.opening_hours.weekday_text && (
                        <ul>
                            {hospital.information.details.opening_hours.weekday_text.map(text => (
                            <li>{text}</li>
                            ))}
                        </ul>
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