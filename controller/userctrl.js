const userModel = require('../models/userModels')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const doctorModel = require('../models/doctorModels')
const appointmentModel = require('../models/appointmentModel')
const moment = require('moment')

const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email })
    if (existingUser) {
      return res.status(200).send({ message: 'User already exists', success: false })
    }
    const password = req.body.password
    const salt = await bcrypt.genSalt(9)
    const hashed_password = await bcrypt.hash(password, salt)
    req.body.password = hashed_password

    const newUser = new userModel(req.body)
    await newUser.save()
    res.status(201).send({ message: 'registration successful', success: true })
  } catch (error) {
    console.log(error)
    res.status(500).send(
      { success: false, message: `Register Controller ${error.message}` })
  }
}

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email })
    if (!user) {
      return res.status(200).send({ message: "user not found", success: false })
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch) {
      return res.status(200).send({ message: 'Invalid email or password', success: false })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.status(200).send({ message: 'Login success', success: true, token })
  } catch (error) {
    console.log(error)
    res.status(500).send(
      { success: false, message: `Login Controller ${error.message}` })
  }
}
const authcontroller = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId })
    user.password = undefined
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false
      })
    }

    res.status(200).send({
      data: user,
      success: true
    })
  } catch (error) {
    console.log(error)
    res.status(500).send(
      { success: false, message: `Auth Controller ${error.message}` })
  }
}
// APpply DOctor CTRL
const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    //console.log("applydoctorcontroller new doctor")
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;

    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    console.log("applydoctor controller after push")
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Applying For Doctor",
    });
  }
};

const GetAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification)
    user.notification = []
    user.seennotification = notification
    const updatedUser = await user.save()

    res.status(201).send({
      success: true,
      message: "all notifications marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in notifications",
    });
  }
};
const deleteNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = []
    user.seennotification = []
    const updatedUser = await user.save()
    updatedUser.password = undefined

    res.status(201).send({
      success: true,
      message: "Notifications deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in deleting notifications",
    });
  }
};
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });

    res.status(201).send({
      success: true,
      message: "Doctor list fetched successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while fetching doctor list",
    });
  }
}

const bookAppointmentController = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, 'DD-MM-YYYY').toISOString()
    req.body.time = moment(req.body.time, 'HH:mm').toISOString()
    req.body.status = 'pending'
    const newAppointment = new appointmentModel(req.body)
    newAppointment
    await newAppointment.save()

    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: 'New Appointment request',
      message: `A new appointment request from ${req.body.userInfo.name}`,
      onClickPath: '/user/appointments'
    })
    await user.save()
    res.status(201).send({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while booking appoinment",
    });
  }
}
//  bookingAvailabilityController
const bookingAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, 'DD-MM-YYYY').toISOString()
    const fromTime = moment(req.body.time, 'HH:mm').subtract(1, 'hours').toISOString()
    const toTime = moment(req.body.time, 'HH:mm').add(1, 'hours').toISOString()
    const doctorId = req.body.doctorId
    const appointments = await appointmentModel.find({
      doctorId, date,
      time: {
        $gte: fromTime, $lte: toTime
      }
    })

    if (appointments.length > 0) {
      return (
        res.status(201).send({
          success: true,
          message: "Appointment not available at this time",
        })
      )
    } else {
      return res.status(200).send(
        {
          success: true,
          message: 'Appointments available'
        }
      )
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while booking appoinment",
    });
  }
}
const userAppointmentsController=async(req,res)=>{
  try {
    const appointments=await appointmentModel.find({userId:req.body.userId})
    
    res.status(201).send({
      success: true,
      message: "Appointment list fetched",
      data:appointments
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting appoinments list",
    });
  }
}
const PredictDiseaseController = async(req,res)=>{
  try {
    console.log(req.body)
    res.status(201).send({
      success: true,
      message: "success",
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: "error",
    });
  }
}
module.exports = {
  loginController, registerController, authcontroller,
  applyDoctorController, GetAllNotificationController,
  deleteNotificationController, getAllDoctorsController,
  bookAppointmentController, bookingAvailabilityController,
  userAppointmentsController,PredictDiseaseController
}