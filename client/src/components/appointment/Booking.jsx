import React, { useEffect, useState } from 'react';
import RedirectToLoginPage from '../account_service/action/RedirectToLoginPage';
import { BookingAppointment, SendEmail } from './Service';

const Booking = () => {

    const [patientName, setPatientName] = useState('');
    const [Date, setDate] = useState('');
    const [Time, setTime] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [hospital, setHospital] = useState({});
    const [getBooking, setGetBooking] = useState({});
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const selectedHospital = JSON.parse(localStorage.getItem('selectedHospital'));
    const username = localStorage.getItem('username');
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    useEffect(() => {
        if(selectedHospital) {
            setHospital({
                id: selectedHospital.information.place_id,
                name: selectedHospital.name,
                address: selectedHospital.information.details.formatted_address,
                phone: selectedHospital.information.details.formatted_phone_number,
                website: selectedHospital.information.details.website
            })    
        }
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const bookingForm = {
            username: username,
            patientName: patientName,
            email: email,
            hospital: hospital,
            phone: phoneNumber,
            date: Date,
            time: Time,
        }
        try {
            const appointment = await BookingAppointment(bookingForm);
            setGetBooking(appointment);
            setBookingSuccess(true);
        } catch (e) {
            console.log(e);
        }
    };
    
    const handleSendEmail = async () => {
        try {
            const response = await SendEmail(getBooking);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='appointment'>
            {isAuthenticated && selectedHospital !== null ? (
                <div>
                    <h3>Hospital details: {selectedHospital.name}</h3> <br />
                    Phone Number: {selectedHospital.information.details.formatted_phone_number} <br />
                    Address: {selectedHospital.information.details.formatted_address}
                    <form className='booking-form'>
                        <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Patient Name" required />
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                        <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" required />
                        <input type="date" value={Date} onChange={(e) => setDate(e.target.value)} required />
                        <input type="time" value={Time} onChange={(e) => setTime(e.target.value)} required /><br />
                        <button onClick={e => handleSubmit(e)}>Book Appointment</button>
                        {bookingSuccess && 
                            <button onClick={handleSendEmail}>Send Email</button>
                        }
                    </form>
                    
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