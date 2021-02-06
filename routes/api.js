const router = require("express").Router();

const checkAuth = require("../middlewares/checkAuth");

const {
  addUser,
  getWebsites,
  addWebsite,
  getWordCount,
  deleteHistory,
  toggleFavourite,
} = require("../controllers/api");

router.get("/getwebsites", checkAuth, getWebsites);
router.get("/deletehistory/:id", checkAuth, deleteHistory);
router.get("/favourite/:id", checkAuth, toggleFavourite);

router.post("/adduser", addUser);
router.post("/addwebsite", checkAuth, addWebsite);
router.post("/getwordcount", checkAuth, getWordCount);

module.exports = router;
