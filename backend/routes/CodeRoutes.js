const express = require("express");
const {submitCode, CheakCode} = require("../controller/codeController");
const { chatWithGemini } = require("../controller/hintController");
const router = express.Router();
router.post("/submit", submitCode);
router.post("/submit-result", CheakCode);
router.post("/hint", chatWithGemini);

module.exports = router;

