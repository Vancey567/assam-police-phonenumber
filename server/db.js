import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MongoDB_URI = process.env.MONGODB_URI;

async function connectToDB() {
  await connect(MongoDB_URI)
    .then(() => console.log("DB Connected Successfully!"))
    .catch((err) => console.log("DB Error", err));
}

export default connectToDB;
