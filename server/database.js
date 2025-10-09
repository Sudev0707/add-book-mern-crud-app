const mongoose = require("mongoose");

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database connection success");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
};

// export default databaseConnection ;  //  es6 export
module.exports = databaseConnection;
