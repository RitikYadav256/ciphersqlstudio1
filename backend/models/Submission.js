const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    email_id:{type:String,required:true},
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Assignment",
    },
    submittedCode: {
      type: String,
      required: true,
    },
    expectedOutput: {
      type: Array,
      required: true,
    },
    userResult: {
      type: Array,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", submissionSchema);
