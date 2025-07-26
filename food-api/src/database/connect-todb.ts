import { connect } from "mongoose";

export const connectToDataBase = async () => {
  await connect(
    "mongodb+srv://admin:190602@cluster0.hpqd2rb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Connected to Database");
};
