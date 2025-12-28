const mongoose = require("mongoose");



const dailyProgressSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  questionsAttempted: Number,
  questionsSolved: Number,
  timeSpent: Number 
});


const userSchema = new mongoose.Schema({
  userId: {type: String},
  name: { type: String, required: true },
  emailId: {type: String,required: true,unique:true},
  password: {type: String,required: true},
  github: {  type: String},
  stats: {
    totalQuestions: { type: Number, default: 0 },
    solved: { type: Number, default: 0 },
    attempted: { type: Number, default: 0 },
    accuracy: { type: Number, default: 0 },
    totalTimeSpent: { type: Number, default: 0 }
  },
  dailyProgress: [dailyProgressSchema],
  createdAt: {type: Date,default: Date.now}
});


const User = mongoose.model("User", userSchema);
module.exports = User;
