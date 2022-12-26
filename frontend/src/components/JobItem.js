import axios from "axios";
import { useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import { initialState, jobReducer } from "../Reducers/jobReducer";
const URL = "http://localhost:5000/";

const JobItem = () => {
    const {id} = useParams();
    const [state, dispatch] = useReducer(jobReducer, initialState);
   useEffect(()=>{
    const getJob = async (id)=>{
        try {
            const response = await axios.get(`/api/jobs/${id}`);
            dispatch({type:"SINGLE_JOB", payload:response.data});
        } catch (error) {
            dispatch({type:"ERROR", payload:error.response.data.message})
        }
    }
    getJob(id);
   },[id])
  return (
    <>
          <section className="container p-6 mx-auto w-full max-w-lg text-center">
           <div className="w-full">
            <img src={URL+state.job.logo} alt="logo" className="w-40 rounded-lg mb-5 inline-block" />
           </div>
           <h2 className="text-teal-500 lg:text-3xl text-xl font-semibold mb-2">{state.job.title}</h2>
           <p className="lg:text-lg text-md font-bold mb-2">{state.job.company}</p>
           <p className="lg:text-lg text-md font-semibold"><i className="fa-solid fa-location-dot"></i> {state.job.location}</p>
           <hr className="mt-3 mb-5" />
           <h3 className="text-teal-600 lg:text-2xl text-xl font-semibold mb-2">Job description</h3>
           <p className="text-gray-600 text-lg sm:text-md font-light">{state.job.description}</p>
            <div className="mt-10">
                <Link to={state.job.website} className="cursor-pointer py-2 px-6 bg-teal-500 hover:bg-teal-600 rounded-md text-white text-lg mr-5"><i className="fa-brands fa-firefox-browser"></i> Visit their website</Link>
                <Link to="/" className="cursor-pointer py-2 px-6 border border-teal-500 hover:bg-teal-500 text-teal-500 rounded-md hover:text-white text-lg"><i className="fa-regular fa-envelope"></i> Contact company</Link>
            </div>
            {state.user ? (state.job.user === state.user._id ? (
                <div className="mt-10">
                <button className="py-2 px-6 text-teal-500"><i className="fa-regular fa-pen-to-square"></i> Edit</button>
                <button className="py-2 px-6 text-red-400"><i className="fa-solid fa-trash"></i> Delete</button>
            </div>
            ) : (<></>)) : (<></>)}
        </section>

    </>
  )
}
export default JobItem