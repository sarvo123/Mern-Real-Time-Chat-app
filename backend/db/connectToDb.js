import mongoose from "mongoose";


const connectToDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Successfully Connect to Database");
    }catch(err){
        console.log("Error connecting to database " , err.message);
    }
};

export default connectToDb;