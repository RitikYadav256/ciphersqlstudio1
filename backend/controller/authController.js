const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SIGNUP

exports.signup = async (req, res) => {
  try {
    const { name, emailId, password, github } = req.body;
    console.log("Askign to sign");

    const userExists = await User.findOne({ emailId });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      emailId,
      password: hashedPassword,
      github,
    });

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    console.log("Asking to login");
    const user = await User.findOne({ emailId });
    if (!user) {
      console.log("Do not have acount");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user: { name: user.name, emailId: user.emailId } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.fetchProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // get from decoded JWT
    console.log("Fetching profile for userId:", userId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const responseData = {
      name: user.name,
      emailId: user.emailId,
      github: user.github || null,
      stats: {
        totalQuestions: user.stats?.totalQuestions || 0,
        attempted: user.stats?.attempted || 0,
        solved: user.stats?.solved || 0,
        accuracy: user.stats?.accuracy || 0,
        totalTimeSpent: user.stats?.totalTimeSpent || 0,
      },
      dailyProgress: user.dailyProgress || [],
    };

    return res.status(200).json(responseData);
  } catch (err) {
    console.error("Fetch profile error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
