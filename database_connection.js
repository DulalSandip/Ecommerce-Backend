require("dotenv").config()
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI,{}).then(()=>{
    console.info(`Mongodb connected succesfully`)
}).catch((error) => {
    console.log(error);
    console.error(
      "Error : Mongoose cannot be connected at this moment due to no internet or poor connection ❌ ❌ ❌ ❌"
    );
  
    
  });

  // for mongoose termination
process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log("Mongoose is disconnected due to app termination ❌ ❌ ❌ ❌");
    });
    process.exit(0);
  });