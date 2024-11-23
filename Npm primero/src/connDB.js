import mongoose from "mongoose";
export const conectaDB=async(url, db)=>{
    try {
      await mongoose.connect(
        url,
        {
          dbName: db
        }
      )
      console.log("DB online..")
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  
  }