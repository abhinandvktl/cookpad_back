// 1
require('dotenv').config()

// 2
require('./DB/connection')

// 3
const express=require('express')

// 7
const router=require('./Routes/router')

// 4
const cors=require('cors')

// 5 creating server
const cookpadServer=express()
cookpadServer.use(cors())
cookpadServer.use(express.json())

// 8
cookpadServer.use(router)

cookpadServer.use('/uploads',express.static('./uploads'))

// 6
const PORT=3000||process.env.PORT
cookpadServer.listen(PORT,()=>{
    console.log(`cookpadServer running ${PORT}`);
})