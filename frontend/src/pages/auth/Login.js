import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { useContext } from "react";

const API_URL = "/api/users/";

const Login = () => {
  const navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext);

  const [formData, setFormData] = useState({
    email:"",
    password:""
  });

  const {email, password} = formData;

  useEffect(()=>{
    if(state.isError){
      toast.error(state.message);
    }
    if(state.user || state.isSuccess){
      navigate("/");
    }
    dispatch({type:"RESET"});
  }, [state.isError, state.isLoading, state.isSuccess, state.user, state.message, navigate, dispatch]);


  const onChange = (e) => {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL+"login", formData);
      dispatch({type:"LOGIN_USER", payload: response.data});
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      dispatch({type:"ERROR", payload:error.response.data.message});
    }
  }

  if(state.isLoading){
    return <Spinner />
  }

  return (
    <>
       <section className="container p-6 mx-auto w-full max-w-md">
          <form className="bg-gray-100 shadow-sm rounded-md p-8" onSubmit={handleSubmit}>
              <h2 className="lg:text-2xl text-center font-semibold mb-6">Login</h2>
              <div className="mb-6">
                  <label htmlFor="email" className="mb-3 block text-gray-700">Email address:</label>
                  <input type="email" id="email" value={email} name="email" onChange={onChange} className="bg-white rounded-md border border-gray-200 p-3 focus:outline-none w-full" placeholder="john.doe@company.com" required />
              </div>
              <div className="mb-6">
                  <label htmlFor="password" className="mb-3 block text-gray-700">Password:</label>
                  <input type="password" name="password" value={password} onChange={onChange} id="password" className="bg-white rounded-md border border-gray-200 p-3 focus:outline-none w-full" placeholder="Password" required />
              </div>
              <button type="submit" className="py-3 px-12 bg-teal-500 hover:bg-teal-600 mr-5 rounded-md text-white text-lg focus:outline-none w-full">Submit</button>
          </form>
       </section>
    </>
  )
}
export default Login