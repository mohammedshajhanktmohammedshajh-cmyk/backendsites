const router = require("express").Router();
const User = require("../models/userschema");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    console.log("req from FE react js", req.body);
    const { username, email, password } = req.body;

    const userExist = await User.findOne({ email });
   console.log("userExist ::", userExist);

   if (userExist) {
     return res.status(400).json({ message: "User already exists!" });
   }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword =>", hashedPassword);

    const payload = {
      username,
      email,
      password: hashedPassword,
    };

    const user = await User.create(payload);
    console.log("user =>", user);

    return res.status(200).json({ message: "User created successfully!", user });
  } catch (error) {
    return res.status(500).json({ message: "Registration failed!", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "wrong you did not register first" });
    }

    const checkpass = await bcrypt.compare(password, user.password);
    if (!checkpass) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const userData = user.toObject();
    delete userData.password;
    return res.status(200).json({
      message: "Login successful!",
      user: userData,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    return res.status(500).json({ message: "login failed!", error: error.message });
  }
});

module.exports = router;










