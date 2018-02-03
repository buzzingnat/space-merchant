const path = require("path");
const router = require("express").Router();
const userRoutes = require("./users");
const todoRoutes = require("./todos");

// API Routes
router.use("/api/users", userRoutes);
router.use("/api/todos", todoRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
