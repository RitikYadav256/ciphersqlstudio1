const pool = require("../models/db.js");
const Submission = require("../models/Submission");
const User = require("../models/User");



exports.submitCode = async (req, res) => {
  const { code } = req.body;
  
  if (!code) {
    return res.status(501).json({ eroor:"Code is empty"});
  }
  try {
    const result = await pool.query(code);
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}

exports.CheakCode = async (req, res) => {
  try {
    const {
      email_id,
      questionId,
      submittedCode,
      expectedOutput,
      userResult,
      timeSpent
    } = req.body;

    const normalizeResult = (rows) =>
      rows.map(row => Object.values(row));

    const isCorrect =
      JSON.stringify(expectedOutput) ===
      JSON.stringify(normalizeResult(userResult));

    const submission = new Submission({
      email_id,
      questionId,
      submittedCode,
      expectedOutput,
      userResult,
      isCorrect,
    });

    await submission.save();

    const user = await User.findOne({ emailId: email_id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.stats.attempted += 1;
    user.stats.totalQuestions += 1;

    if (isCorrect) {
      user.stats.solved += 1;
    }

    if (timeSpent) {
      user.stats.totalTimeSpent += timeSpent;
    }

    user.stats.accuracy = Number(
      ((user.stats.solved / user.stats.attempted) * 100).toFixed(2)
    );

    const today = new Date().setHours(0, 0, 0, 0);

    const daily = user.dailyProgress.find(
      d => new Date(d.date).setHours(0, 0, 0, 0) === today
    );

    if (daily) {
      daily.questionsAttempted += 1;
      if (isCorrect) daily.questionsSolved += 1;
      if (timeSpent) daily.timeSpent += timeSpent;
    } else {
      user.dailyProgress.push({
        date: new Date(),
        questionsAttempted: 1,
        questionsSolved: isCorrect ? 1 : 0,
        timeSpent: timeSpent || 0
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      isCorrect
    });

  } catch (error) {
    console.error("CheckCode Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
