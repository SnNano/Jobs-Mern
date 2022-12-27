const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const {
    getJobs,
    postJob,
    getOneJob,
    putJob,
    deleteJob,
    getUserJobs,
    upload
  } = require("../controllers/jobController");

router.route("/").post(protect,upload.single("logo"), postJob).get(getJobs);
router.route("/user/:id").get(protect, getUserJobs);
router.route("/:id").put(protect, upload.single("logo"),putJob).delete(protect, deleteJob).get(getOneJob);
module.exports = router;