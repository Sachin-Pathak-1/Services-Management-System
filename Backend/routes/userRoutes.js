const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// PROFILE API
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role   // ✅ VERY IMPORTANT
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
