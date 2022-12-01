const mongoose = require("mongoose");

const connectToDB = () => {
  const MONGO_URL = process.env.MONGO_URI;
  try{
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch(error){
  console.log(`Error: ${error.message}`);
  process.exit();
}

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Connection Error"));
  db.once("open", () => {
    console.log("Connected To Database!");
  });
};

module.exports = connectToDB;
