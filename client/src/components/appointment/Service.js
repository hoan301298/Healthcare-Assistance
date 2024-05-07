import axios from "axios";

const BookingAppointment = async ({ bookingForm }) => {
    await axios.post(`http://localhost:8080/booking-form/create/${bookingForm.username}`, bookingForm)
    .then(res => {
        console.log(res.data)
        return res.data;
    })
    .catch(e => {
        return e;
    })
}

const SendEmail = async ({ appointment }) => {
    let response = {
        message: '',
        status: ''
    };
    await axios.post('/send-email', appointment)
    .then(res => {
        response.message = res.data;
        response.status = 200;
    })
    .catch(e => {
        response.message = e;
        response.status = 500;
    })
    return response;
}

export { SendEmail, BookingAppointment } ;