import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RedirectToLoginPage from '../account_service/RedirectToLoginPage';

const Booking = () => {

    const [patientName, setPatientName] = useState('');
    const [Date, setDate] = useState('');
    const [Time, setTime] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [data, setData] = useState([]);
    const [hospital, setHospital] = useState([]);
    
    const selectedHospital = JSON.parse(localStorage.getItem('selectedHospital'));
    const username = localStorage.getItem('username');
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    // useEffect(() => {
    //     if(selectedHospital.information !== undefined) {
    //         setHospital({
    //             id: selectedHospital.information.place_id,
    //             name: selectedHospital.name,
    //             address: selectedHospital.information.details.formatted_address,
    //             phone: selectedHospital.information.details.formatted_phone_number,
    //             website: selectedHospital.information.details.website
    //         })    
    //     }
    // }, [selectedHospital]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHospital({
            id: selectedHospital.information.place_id,
            name: selectedHospital.name,
            address: selectedHospital.information.details.formatted_address,
            phone: selectedHospital.information.details.formatted_phone_number,
            website: selectedHospital.information.details.website
        })
        try {
            const response = await axios.post(`http://localhost:8080/booking-form/create/${username}`, {
                username,
                patientName,
                email,
                hospital,
                phoneNumber,
                Date,
                Time
            });
            console.log('Booking created:', response.data);
            setData(JSON.stringify(response.data));
            localStorage.setItem('selectedHospital', null);
            // Optionally, add logic to redirect or show success message
        } catch (error) {
            console.error('Error creating booking:', error);
        }
    };

    return (
        <div className='appointment'>
            {isAuthenticated && selectedHospital !== null ? (
                <div>
                    <h3>Hospital details: {selectedHospital.name}</h3> <br />
                    Phone Number: {selectedHospital.information.details.formatted_phone_number} <br />
                    Address: {selectedHospital.information.details.formatted_address}
                    <form className='booking-form' onSubmit={handleSubmit}>
                        <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Patient Name" required />
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                        <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" required />
                        <input type="date" value={Date} onChange={(e) => setDate(e.target.value)} required />
                        <input type="time" value={Time} onChange={(e) => setTime(e.target.value)} required /><br />
                        <button type="submit">Book Appointment</button>
                    </form>
                    {data}
                </div>
            ) : (
                <div>
                    {!isAuthenticated && selectedHospital &&
                        <RedirectToLoginPage pathname={window.location.pathname} alertMessage={'Please login to reserve the appointment!'}/>
                    }
                    {isAuthenticated && !selectedHospital &&
                        <RedirectToLoginPage pathname={'/map'} alertMessage={'No hospital selected. Please find your nearest hospital!'}/>
                    }
                    {!isAuthenticated && !selectedHospital &&
                        <RedirectToLoginPage pathname={'/map'} alertMessage={'Please login and select the nearest hospital!'}/>
                    }
                </div>
            )}
        </div>
    );
};

export default Booking;