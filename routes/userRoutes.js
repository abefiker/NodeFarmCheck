const express = require('express');
const userController = require('../controllers/userController')
const authController = require('../controllers/authController');
const router = express.Router()
router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)
router.patch('/updatePassword/:id', authController.updatePassword)

router.patch('/updateMe',authController.protect,userController.updateMe)
router.delete('/deleteMe',authController.protect,userController.deleteMe)

router.route('/').get(userController.getAllusers)
router.route('/:id')
.delete(userController.deleteUser)
.patch(userController.updateUser)
module.exports = router