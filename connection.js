import mongoose from "mongoose";

export const connect = async (environment) => {
  try {
    if (environment == "dev") await mongoose.connect(process.env.DEV_DB_URI);
    else if (environment == "prod")
      await mongoose.connect(process.env.PROD_DB_URI);
    console.log("Database Connection Successful");
  } catch (e) {
    console.log(e);
  }
};
