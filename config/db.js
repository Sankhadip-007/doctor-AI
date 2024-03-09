const mongoose=require('mongoose')

const connectDB=async()=>{
    try{
      await mongoose.connect(process.env.MONGODB_URL)
      console.log(`database connected ${mongoose.connection.host}`)

    }catch(error){
    console.log(`MongoDB server error: ${error}`)

    }
}
module.exports=connectDB;