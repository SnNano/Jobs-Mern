const asyncHandler = require("express-async-handler");
const Job = require("../models/jobModel");
const fs = require("fs");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      cb(null, Math.round(Math.random() * 1e9) + file.originalname);
    },
  });
  
const upload = multer({ storage });

// @desc   Post a job
// @route  GET /api/jobs
// @access  Public
const postJob = asyncHandler(async(req, res)=>{
    const {title, company, b_desc, website, location, description}= req.body;
    if(!title || !company || !b_desc || !website || !location || !description || !req.file){
        res.status(401);
        throw new Error("All fields must be filled");
    }
    const newJob = await Job.create({
        user:req.user.id,
        title:title,
        company:company,
        b_desc:b_desc,
        website:website, 
        location: location, 
        description:description,
        logo: req.file.path
    });
    res.status(200).json(newJob);
});

// @desc   Get all jobs
// @route  GET /api/jobs
// @access  Public
const getJobs = asyncHandler(async(req, res)=>{
    const jobs = await Job.find();
    if(!jobs){
        res.status(401);
        throw new Error("No Jobs found");
    }
    return res.status(201).json(jobs);
});

// @desc   Get user jobs
// @route  GET /api/jobs
// @access  Public
const getUserJobs = asyncHandler(async(req, res)=>{
    const jobs = await Job.find({user:req.user.id});
    if(!jobs){
        res.status(401);
        throw new Error("No Jobs found");
    }
    return res.status(201).json(jobs);
});

// @desc   Get user jobs
// @route  GET /api/jobs/job/:id
// @access  Public
const getOneJob = asyncHandler(async(req, res)=>{
    const job = await Job.findById(req.params.id);
    if(!job){
        res.status(401);
        throw new Error("No Job found with this ID");
    }
    return res.status(201).json(job);
});

// @desc   update job
// @route  PUT /api/jobs
// @access  Public
const putJob = asyncHandler(async(req, res)=>{
    const job = await Job.findById(req.params.id);
    if(!job){
        res.status(401);
        throw new Error("All fields must be filled");
    }
    if (req.file) {
        await fs.unlinkSync(job.logo);
        req.body.logo = req.file.path;
      }
    if(req.user.id === job.user.toString()){
        const updateJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.status(201).json(updateJob);
    } else {
        res.status(401);
        throw new Error("Unauthorized access");
    } 
});

// @desc   Get job
// @route  GET /api/jobs
// @access  Public
const deleteJob = asyncHandler(async(req, res)=>{
    const job = await Job.findById(req.params.id);
    if(!job){
        res.status(401);
        throw new Error("No job with this ID");
    }
    if(req.user.id === job.user.toString()){
         // Remove the targeted image
        await fs.unlinkSync(job.logo);
        await job.remove();
        res.status(201).json({message:"the job is deleted successfully"});
    } else {
        res.status(401);
        throw new Error("Unauthorized access");
    }
});

module.exports = {
    postJob,
    getJobs,
    getOneJob,
    getUserJobs,
    putJob,
    deleteJob,
    upload
}