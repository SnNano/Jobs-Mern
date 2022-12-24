const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const {
    getJobs,
    postJob,
    putJob,
    deleteJob,
    getUserJobs,
    upload
  } = require("../controllers/jobController");

router.route("/").post(protect,upload.single("logo"), postJob).get(getJobs);
router.route("/:id").put(protect, upload.single("logo"),putJob).delete(protect, deleteJob).get(protect, getUserJobs);


module.exports = router;