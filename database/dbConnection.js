import mongoose from "mongoose";

const dbConnection = async () => {
    mongoose.connect(process.env.MONGO_URI,{
        dbName:process.env.DB_NAME,
    }).then(()=>{
        console.log("Database connected successfully");
    }).catch((err)=>{
        console.log(`Error connecting to database: ${err}`);
    });
};

export { dbConnection };