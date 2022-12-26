import { useEffect } from "react";
import { useReducer } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { initialState, jobReducer } from "../Reducers/jobReducer";
import axios from "axios";
import Spinner from "../components/Spinner";



const Jobs = () => {
  const [state, dispatch] = useReducer(jobReducer, initialState);
  const {jobs, isLoading, isError, message} = state;

  useEffect(()=>{
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/api/jobs");
        dispatch({type: "FETCH_JOBS", payload:response.data});
      } catch (error) {
        dispatch({type:"ERROR", payload:error.response.data.message})
      }
    }
    if(isError){
      toast.error(message);
    }
    fetchJobs();
  }, [dispatch, isLoading, isError, message]);

  
  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <section className="container mx-auto px-6">
            {jobs.length > 0 ? (jobs.map((job)=>{
              return <div key={job._id}>
              <hr className="my-8 border-gray-300 sm:mx-auto dark:border-gray-700"/>
            <div className=" p-6">
                <div className="flex items-center justify-between">
                    <h3 className="mt-4 text-2xl lg:text-3xl font-bold text-teal-600 mb-2 lg:mb-4">{job.title}</h3>
                    <Link key={job._id} to={`job/${job._id}`} className="font-bold text-teal-600">More Info<i className="ml-5 fa-solid fa-up-right-from-square"></i></Link>
                </div>
                <p className="text-md lg:text-lg font-semibold text-gray-700 mb-8">{job.b_desc}</p>
                 <Link className="cursor-pointer mr-5 rounded-full py-2 px-6 bg-transparent border border-teal-500 text-teal-500"><i className="fa-solid fa-location-dot"></i> 100% Remote</Link>
                 <Link className="cursor-pointer mr-5 rounded-full py-2 px-6 bg-transparent border border-teal-500 text-teal-500"><i className="fa-regular fa-clock"></i> Full time</Link>
            </div>              
              </div>
            })) : (
              <div className="flex items-center justify-center lg:mt-32 mt-12">
                <h3 className="text-2xl text-gray-500"> You have not set any goals</h3>
              </div>
            )}
        </section>
    </>
  )
}
export default Jobs