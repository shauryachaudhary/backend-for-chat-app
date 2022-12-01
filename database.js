const mongoose = require("mongoose");

const connectToDB = async() => {
  const MONGO_URL = process.env.MONGO_URI;
  try{
  const conn = await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`.blue.bold);
} catch(error){
  console.log("Error occure database no connected");
  process.exit();
}
};

module.exports = connectToDB;
