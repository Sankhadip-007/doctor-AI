const express = require("express")
const authmw = require('../middlewares/authmw');
const { getDoctorInfoController, UpdateProfileController,
    getDoctorByIdController, doctorAppointmentController,
    updateStatusController
} = require("../controller/doctorCtrl");

const router = express.Router()
// POST single doctor info
router.post('/getDoctorInfo', authmw, getDoctorInfoController)
// POST update profile
router.post('/updateProfile', authmw, UpdateProfileController)
// POST || getDoctor by ID
router.post('/getDoctorById', authmw, getDoctorByIdController)

//Get || Appointments
router.get('/doctor-appointments', authmw, doctorAppointmentController)

// POST || update appointment status
router.post('/update-status',authmw,updateStatusController)
module.exports = router;