const doctorModel = require('../models/doctorModels')
const userModel = require('../models/userModels')

const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({}) // all

        res.status(200).send({
            data: users,
            message: 'users list',
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(
            {
                success: false,
                message: `error while fetching users`,
                error
            })
    }
}
const getAllDoctorsController = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}) // all

        res.status(200).send({
            data: doctors,
            message: 'doctors list',
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(
            {
                success: false,
                message: `error while fetching doctors data`
            })
    }
}

// doctor acc status
const chnageAccountStatusController= async (req,res)=>{
    try {
        const {doctorId,status}=req.body 
        const doctor = await doctorModel.findByIdAndUpdate(doctorId,{status})
        const user=await userModel.findOne({_id:doctor.userId})
        const notification=user.notification
        notification.push({
            type:'doctor-account-request-updated',
            message:`your Doctor Account request has ${status}`,
            onClickPath:'/notification'
        })
        user.isDoctor = status==='approved'?true:false 
        await userModel.findByIdAndUpdate(user._id, { notification });
        await user.save()
        res.status(201).send({
            data: doctor,
            message: 'Account status updated',
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(
            {
                success: false,
                message: `error in acc status`
            })
    }
}
module.exports = { getAllDoctorsController, getAllUsersController,
                  chnageAccountStatusController }