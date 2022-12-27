import { useEffect, useReducer } from "react";
import {Link} from "react-router-dom";
import { initialState, jobReducer } from "../Reducers/jobReducer";
import { deleteJob, getUserJobs } from "../services/jobsService";
import { toast } from 'react-toastify';
import Spinner from "../components/Spinner";



const ManageJobs = () => {

    const [state, dispatch] = useReducer(jobReducer, initialState);
    const {user, jobs, isLoading, isError, message} = state;
    const token = user.token;

    useEffect(()=>{
        if(isError){
            toast.error(message);
          }
        getUserJobs(user._id, token, dispatch);
    }, [user._id, isError, message, token]);

    const handleDelete = (jobId)=>{
        alert("Are you sure?");
        deleteJob(token, jobId, dispatch);
    }

    if (isLoading) {
        return <Spinner />
      }
  return (
    <>
      <section className="container p-6 mx-auto w-full">  
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
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
                        {jobs.length > 0 && user ? (
                            jobs.map((job)=>{
                                return     <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
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
                            })
                        ) : (
                            <div className="flex items-center justify-center">
                                <h3 className="text-2xl text-gray-500"> You have not set any goals</h3>
                            </div>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    </>
  )
}
export default ManageJobs