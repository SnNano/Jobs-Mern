import { useContext, useEffect, useReducer, useState } from "react";
import {Link} from "react-router-dom";
import { initialState, jobReducer } from "../Reducers/jobReducer";
import { deleteJob, getUserJobs } from "../services/jobsService";
import { toast } from 'react-toastify';
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import {UserContext} from "../App";


const ManageJobs = () => {

    const {state} = useContext(UserContext);
    const [jobState, dispatch] = useReducer(jobReducer, initialState);
    const {jobs, isLoading, isError, message} = jobState;
    const token = state.user ? state.user.token : "";
    const [currentPage, setCurrentPage]=useState(1);
    const [postsPerPage]=useState(5);

    useEffect(()=>{
        if(isError){
            toast.error(message);
          }
        getUserJobs(state.user._id, token, dispatch);
    }, [state.user._id, isError, message, token]);

    const handleDelete = (jobId)=>{
        alert("Are you sure?");
        deleteJob(token, jobId, dispatch);
    }
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentJobs = jobs.slice(indexOfFirstPost, indexOfLastPost).reverse();

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    if (isLoading) {
        return <Spinner />
      }
  return (
    <>
      <section className="container p-6 mx-auto w-full">  
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            {currentJobs.length > 0 && state.user ? (
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Job Title
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Location
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Modify
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                            {currentJobs.map((job)=>{
                                return <tr key={job._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {job.title}
                                </th>
                                <td className="py-4 px-6">
                                    {job.location}
                                </td>
                                <td className="py-4 px-6">
                                    <Link to={`/new-job/${job._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                </td>
                                <td className="py-4 px-6">
                                    <Link onClick={()=>handleDelete(job._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</Link>
                                </td>
                            </tr>
                            })}
                    </tbody>
                </table>
                ) : (
                    <div className="flex items-center justify-center">
                        <h3 className="text-2xl text-gray-500"> You have not post any job offers</h3>
                    </div>
                )}
            </div>
            <Pagination postsPerPage={postsPerPage} totalPosts={jobs.length} paginate={paginate} currentPage={currentPage}/>
        </section>
    </>
  )
}
export default ManageJobs