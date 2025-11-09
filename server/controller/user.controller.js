const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//
const handleSignupUserController = async (req, res) => {
  const body = req.body;

  if (!body.FirstName || !body.LastName || !body.Email || !body.Password) {
    return res
      .status(500)
      .json({ message: "All fields are required", status: false });
  }

  try {
    const existingUser = await User.findOne({ Email: body.Email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already exists", status: false });
    }

    // decrypt password
    const saltCount = 10;
    const hashPassword = await bcrypt.hash(body.Password, saltCount);

    // const signup = new User({ ...body, Password: hashPassword });
    // await signup.save();
    const signup = await User.create({ ...body, Password: hashPassword });

    //   const token = jwt.sign({ id: signup._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    if (signup) {
      return res.status(201).json({
        message: "User created successfully",
        status: true,
        success: true,
        id: signup?._id,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

//
const handleSigninUserController = async (req, res) => {
  const body = req.body;
  try {
    // check user input
    if (!body.Email || !body.Password) {
      return res
        .status(500)
        .json({ message: "Email and Password are required", success: false });
    }

    // validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.Email)) {
      return res
        .status(400)
        .json({ message: "Invalid email format", success: false });
    }

    // check registrerd email
    const user = await User.findOne({ Email: body.Email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User Doesn't exist ", success: false });
    }

    // match password
    const isPassowordMatch = await bcrypt.compare(body.Password, user.Password);
    if (!isPassowordMatch) {
      return res
        .status(500)
        .json({ message: "Password not matched", success: false });
    }

    // if mathched/ user found
    const token = jwt.sign(
      { email: user?.Email, id: user?._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    return res.status(200).json({
      message: "User Logged In Successfully",
      success: true,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.messsage, status: false });
  }
};

module.exports = { handleSignupUserController, handleSigninUserController };
