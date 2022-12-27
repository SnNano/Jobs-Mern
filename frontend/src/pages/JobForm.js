import { useEffect, useReducer, useState } from "react";
import { initialState, jobReducer } from "../Reducers/jobReducer";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { editJob, getJob, postJob } from "../services/jobsService";


const JobForm = () => {

  const [state, dispatch] = useReducer(jobReducer, initialState);
  const navigate = useNavigate();
  const {id} = useParams();
  const [formData, setFormData] = useState({
    title:"",
    company:"",
    location:"",
    b_desc:"",
    website:"",
    logo:null,
    description:""
  });
  const {title, company, location, b_desc, website, description} = formData;
  const handleChange = (e) => {
    setFormData(
      {...formData,
      [e.target.name]: e.target.name === "logo" ? e.target.files[0] : e.target.value
      })
  }
  useEffect(()=>{
    if(state.isError){
      toast.error(state.message);
    }
    if(state.isSuccess){
      toast.success(state.message);
      navigate("/manage-jobs")
    }
    dispatch({type:"RESET"});
  }, [state.isError, state.message, state.isSuccess, navigate]);

  useEffect(()=>{
    const setEditedData = async ()=>{
      if(id){
        const response = await getJob(id);
        setFormData({
          ...state,
          ...response.data
        })
      }
    }
    setEditedData(id);
  }, [state, id])
  // getting token from state
  const token = state.user.token;
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const jobData = new FormData();
    for(const key of Object.keys(formData)){
      jobData.append(key, formData[key]);
    }
    if(id){
      editJob(token, id, jobData, dispatch);
    } else {
      // Calling the function from job service
      postJob(token, jobData, dispatch);
    }
    
  }
  return (
    <>
          <section className="container p-6 mx-auto w-full max-w-lg">
            <form onSubmit={handleSubmit} className="bg-gray-100 shadow-sm rounded-md p-8">
                <h2 className="lg:text-2xl text-center font-semibold mb-6">Post job offer </h2>
                <div className="mb-6">
                    <label htmlFor="title" className="mb-3 block text-gray-700">Title:</label>
                    <input type="text" id="title" value={title} onChange={handleChange} name="title" className="bg-white rounded-md border border-gray-200 p-3 focus:outline-none w-full" placeholder="Web developer" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="company" className="mb-3 block text-gray-700">Company:</label>
                    <input type="text" id="company" value={company} onChange={handleChange} name="company" className="bg-white rounded-md border border-gray-200 p-3 focus:outline-none w-full" placeholder="Facebook" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="b_desc" className="mb-3 block text-gray-700">Brief description:</label>
                    <input type="text" id="b_desc" value={b_desc} onChange={handleChange} name="b_desc" className="bg-white rounded-md border border-gray-200 p-3 focus:outline-none w-full" placeholder="we want a junior web developer" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="website" className="mb-3 block text-gray-700">Website:</label>
                    <input type="text" id="website" value={website} onChange={handleChange} name="website" className="bg-white rounded-md border border-gray-200 p-3 focus:outline-none w-full" placeholder="www.facebook.com" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="location" className="mb-3 block text-gray-700">Location:</label>
                    <input type="text" id="location" value={location} onChange={handleChange} name="location" className="bg-white rounded-md border border-gray-200 p-3 focus:outline-none w-full" placeholder="Agadir, Morocco" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="logo" className="mb-3 block text-gray-700">Logo:</label>
                    <input type="file" id="logo" name="logo" onChange={handleChange} className="bg-white rounded-md border border-gray-200 p-3 focus:outline-none w-full"  />
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="mb-3 block text-gray-700">Description:</label>
                    <textarea name="description" value={description} onChange={handleChange} id="description" className="bg-white rounded-md border border-gray-200 p-3 focus:outline-none w-full" required></textarea>
                </div>
                <button type="submit" className="py-3 px-12 bg-teal-500 hover:bg-teal-600 mr-5 rounded-md text-white text-lg focus:outline-none w-full">Submit</button>
            </form>
       </section>
    </>
  )
}
export default JobForm