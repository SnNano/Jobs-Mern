import { useContext, useEffect, useReducer } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";
import { initialState, jobReducer } from "../Reducers/jobReducer";
import { getOneJob, deleteJob } from "../services/jobsService";
const URL = "http://localhost:5000/";

const JobItem = () => {
    const {id} = useParams();
    const {state} = useContext(UserContext);
    const [jobState, dispatch] = useReducer(jobReducer, initialState);
    const navigate = useNavigate();
    const token = jobState.user ? jobState.user.token : "";

    useEffect(()=>{
        getOneJob(id, dispatch);
    },[id]);
    
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);

    const goToWebsite = () => {
        const websiteUrl = jobState.job.website;
        let isHttps = websiteUrl.startsWith('https://') || websiteUrl.startsWith('http://');;
        isHttps ? window.location.href=websiteUrl : window.location.href=`https://${websiteUrl}`;
    }

    const handleDelete = (jobId)=>{
        alert("Are you sure?");
        deleteJob(token, jobId, dispatch);
        navigate("/");
    }

  return (
    <>
        <section className="container p-6 mx-auto w-full max-w-lg text-center">
           <div className="w-full">
            <img src={URL+jobState.job.logo} alt="logo" className="w-40 rounded-lg mb-5 inline-block" />
           </div>
           <h2 className="text-teal-500 lg:text-3xl text-xl font-semibold mb-2">{jobState.job.title}</h2>
           <p className="lg:text-lg text-md font-bold mb-2">{jobState.job.company}</p>
           <p className="lg:text-lg text-md font-semibold"><i className="fa-solid fa-location-dot"></i> {jobState.job.location}</p>
           <hr className="mt-3 mb-5" />
           <h3 className="text-teal-600 lg:text-2xl text-xl font-semibold mb-2">Job description</h3>
           <p className="text-gray-600 text-lg sm:text-md font-light">{jobState.job.description}</p>
            <div className="mt-10">
                <button onClick={goToWebsite} className="cursor-pointer py-2 px-6 bg-teal-500 hover:bg-teal-600 rounded-md text-white text-lg"><i className="fa-brands fa-firefox-browser"></i> Visit their website</button>
            </div>
            {state.user ? (jobState.job.user === state.user._id ? (
                <div className="mt-10">
                <Link to={`/new-job/${jobState.job._id}`} className="py-2 px-6 text-teal-500"><i className="fa-regular fa-pen-to-square"></i> Edit</Link>
                <button onClick={()=>handleDelete(jobState.job._id)} className="py-2 px-6 text-red-400"><i className="fa-solid fa-trash"></i> Delete</button>
            </div>
            ) : (<></>)) : (<></>)}
        </section>
    </>
  )
}
export default JobItem