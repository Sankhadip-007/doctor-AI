const authmw = require('../middlewares/authmw')


const express = require('express')
const {
    loginController, registerController, authcontroller,
    applyDoctorController, GetAllNotificationController,
    deleteNotificationController,getAllDoctorsController,
    bookAppointmentController,bookingAvailabilityController,
    userAppointmentsController,PredictDiseaseController
} = require('../controller/userctrl')

const router = express.Router()

// LOGIN || POST
router.post('/login', loginController)

// register || post
router.post('/register', registerController)

// AUTH || POST
router.post('/getUserData', authmw, authcontroller)
// apply doctor || POST
router.post('/apply-doctor', authmw, applyDoctorController)
// notification || POST
router.post('/get-all-notification', authmw, GetAllNotificationController)
router.post('/delete-all-notification', authmw, deleteNotificationController)

// GET all doctors
router.get('/getAllDoctors',authmw,getAllDoctorsController)

// BOOK Appoinment
router.post('/book-appointment',authmw,bookAppointmentController)
//BOOKING Availability
router.post('/booking-availability',authmw,bookingAvailabilityController)

// Appointment lists
router.get('/user-appointments',authmw,userAppointmentsController)

// POST || predict disease
router.post('/predict_disease',authmw,PredictDiseaseController)
module.exports = router;