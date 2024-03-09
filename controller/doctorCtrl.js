const doctorModel = require('../models/doctorModels')
const appointmentModel=require('../models/appointmentModel')
const userModel = require('../models/userModels')

const getDoctorInfoController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId })

        res.status(200).send(
            {
                success: true,
                message: "Doctor info fetched",
                data: doctor
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While getting Doctor info",
        });
    }
}
const UpdateProfileController=async(req,res)=>{
    try {
        const doctor = await doctorModel.findOneAndUpdate({ userId: req.body.userId },req.body)
        res.status(200).send(
            {
                success: true,
                message: "Profile updated successfully",
                data: doctor
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While updating info",
        });
    }
}

const getDoctorByIdController =async(req,res)=>{
    try {
        const doctor = await doctorModel.findOne({ _id: req.body.doctorId })

        res.status(200).send(
            {
                success: true,
                message: "Doctor info fetched",
                data: doctor
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While getting Doctor info",
        });
    }
}

const doctorAppointmentController=async (req,res)=>{
    try {
        const doctor=await doctorModel.findOne({userId:req.body.userId})
        const appointments = await appointmentModel.find({doctorId:doctor._id})
        


        res.status(200).send(
            {
                success: true,
                message: "Doctor appointments fetched",
                data: appointments
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Doctor appointments",
        });
    }
}
const updateStatusController=async (req,res)=>{
    try {
        const {appoinmentsId,status}=req.body
        const appointments = await appointmentModel.findByIdAndUpdate(appoinmentsId,{status})
        const user = await userModel.findOne({ _id: appointments.userId });
        const notification=user.notification
        notification.push({
          type: 'Status-updated',
          message: `your appointments has been updated ${status}`,
          onClickPath: '/doctor-appointments'
        })
        await user.save()
        res.status(200).send(
            {
                success: true,
                message: "Doctor appointments updated "+status,
                data: appointments
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating status",
        });
    }
}

module.exports = { getDoctorInfoController ,UpdateProfileController,
                  getDoctorByIdController,doctorAppointmentController,
                  updateStatusController}