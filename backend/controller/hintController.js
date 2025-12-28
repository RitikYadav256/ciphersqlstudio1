const model = require("../models/gemini.js");

const chatWithGemini = async (req, res) => {
  try {
    const { questionDetails } = req.body;
    console.log("Incoming body:", req.body);

    const result = await model.generateContent(
      `Give a helpful SQL hint for this question (do not give full answer):\n${questionDetails}`
    );

    const hint = result.response.text();

    res.json({ hint });
  } catch (error) {
  console.error("Gemini FULL error:", error);
  res.status(500).json({
    error: "Failed to generate hint",
    details: error.message,
  });
}
};

module.exports = { chatWithGemini };
