const mongoose = require("mongoose");

const databaseConnection = async () => {
  // await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  mongoose
    .connect("mongodb://localhost:27017/bookstore")
    .then(() => {
      console.log("database connection success");
    })
    .catch((err) => {
      console.log("err", err.message);
    });
};

// export default databaseConnection ;  //  es6 export
module.exports = databaseConnection;
