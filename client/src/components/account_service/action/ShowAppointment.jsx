import axios from "axios";
import { useEffect, useState } from "react";

const ShowAppointment = (username) => {
    const [appointments, setAppointments] = useState([]);

    const getAllAppointment = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/booking-form/${username}`)
            setAppointments(response.data);    
        } catch (e) {
            console.error('Error fetching appointments:', e);
        }
    }
    
    useEffect(() => {
        getAllAppointment();
    }, [username])

    return (
        <div className="appointment-list">
            <h1>Your Appointments:</h1>
            {appointments.map((appointment, index) => (
                <li key={index}>{appointment.patientName}</li>
            ))}
            {/* <ul>
                {appointments && (
                    appointments.map((appointment, index) => {
                        return (
                            <li key={index + 1}>
                                <h2>{index + 1}</h2>
                                Patient Name: {appointment.patient_name}
                                Email: {appointment.email}
                                Phone: {appointment.phone}
                                Hospital: {appointment.hospital.name}
                                <ul>
                                    <li>Address: {appointment.hospital.address}</li>
                                    <li>Phone: {appointment.hospital.phoneNumber}</li>
                                    <li>Website: <a href={appointment.hospital.website}>Visit Website</a></li>
                                </ul>
                                Booking Time: Date {appointment.date} Time: {appointment.time}
                                Created At: {appointment.createdAt}
                            </li>
                        )
                }))}    
            </ul> */}
        </div>
    )
}

export default ShowAppointment;
