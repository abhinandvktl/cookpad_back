// 1
const mongoose=require('mongoose')

const connectionString=process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log("cook-pad server connected successfully to mongodb atlas");
}).catch((err)=>{
    console.log(`mongodb connection failed error:${err}`);
})