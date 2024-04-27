const { Schema, model } = require('mongoose');

const AppointmentSchema = new Schema ({
    patient_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    time: { type: Date, required: true },
    booking_time: { type: Date, default: Date.now }
})

const AppointmentDetail = model('appointment_details', AppointmentSchema);

module.exports = AppointmentDetail;