// 4

const express=require('express')

const postController=require('../controllers/postController')

const userController=require('../controllers/userController')

const jwtMiddleware =require('../middleware/jwtMiddleware')
const multerConfig = require('../middleware/multerMiddleware')

const router=new express.Router()

// router.get('/home',postController.getAllPostController)

// router.get('/home',userController.getAllUserController)

// register
router.post('/register',userController.registerController)

// login
router.post('',userController.loginController)

// addpost
router.post('/home',jwtMiddleware,multerConfig.single('image'),postController.addPosts)

module.exports=router