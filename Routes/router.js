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

// getallpost
router.get('/allposts',jwtMiddleware,postController.getallUsersPosts)

// getuserposts
router.get('/user/allposts',jwtMiddleware,postController.getUserPosts)

// edituser
router.put('/user/edit',jwtMiddleware,multerConfig.single("profile"),userController.editUser)

// edit post
router.put('/posts/edits/:id',jwtMiddleware,multerConfig.single("image"),postController.editPost)

// delete post
router.delete('/posts/delete/:id',jwtMiddleware,postController.deletepost)

// whopost
router.get('/user/:userId',userController.getWhoPost)

module.exports=router