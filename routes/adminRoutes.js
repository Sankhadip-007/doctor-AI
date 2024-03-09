const express= require("express")
const authmw = require('../middlewares/authmw');
const { getAllUsersController, getAllDoctorsController,
        chnageAccountStatusController } = require('../controller/adminCtrl');

const router = express.Router()

// GET || users
router.get('/getAllUsers',authmw,getAllUsersController)
// GET || doctors
router.get('/getAllDoctors',authmw,getAllDoctorsController)

// POST account status
router.post('/changeAccountStatus',authmw,chnageAccountStatusController)
module.exports = router;