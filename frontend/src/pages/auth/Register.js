import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import Spinner from "../../components/Spinner";
import { toast } from 'react-toastify';
import axios from "axios";
import { UserContext } from "../../App";
import { useContext } from "react";
import {PropTypes} from "prop-types";

const API_URL = "/api/users/";

const Register = () => {
  const {state, dispatch} = useContext(UserContext);
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
  });
  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();

  useEffect(()=>{
    if(state.isError){
      toast.error(state.message);
    }
    if (state.isSuccess || state.user) {
      navigate('/');
    }
    dispatch({type:"RESET"});
  }, [state.isError, state.isSuccess, state.isLoading, state.message, navigate, state.user, dispatch]);

  // setForm data values
  const onChange = (e) => {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }
  // Submit the htmlForm
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== password2){
      toast.error("Password mismatch", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      const userData = {name, email, password};
      try {
        const response =  await axios.post(API_URL, userData);
        dispatch({type:"REGISTER_USER", payload:response.data});
        localStorage.setItem("user", JSON.stringify(response.data));
      } catch (error) {
        dispatch({type:"ERROR", payload:error.response.data.message});
      }
    }
  }
  if (state.isLoading) {
    return <Spinner />
}
  return (
    <>
    <section className="p-6 mx-auto w-full max-w-lg">
          <form className="bg-gray-100 shadow-sm rounded-md p-8" onSubmit={handleSubmit}>
              <h2 className="lg:text-2xl text-center font-semibold mb-6">Register</h2>
              <div className="mb-6">
                  <label htmlFor="name" className="mb-3 block text-gray-700">Username:</label>
                  <input type="text" id="name" value={name} name="name" onChange={onChange} className="bg-white rounded-md border border-gray-200 p-3 focus:outline-none w-full" placeholder="John Doe" required />
              </div>
              <div className="mb-6">
                  <label htmlFor="email" className="mb-3 block text-gray-700">Email address:</label>
                  <input type="email" id="email" value={email} name="email" onChange={onChange} className="bg-white rounded-md border border-gray-200 p-3 focus:outline-none w-full" placeholder="john.doe@company.com" required />
              </div>
              <div className="mb-6">
                  <label htmlFor="password" className="mb-3 block text-gray-700">Password:</label>
                  <input type="password" name="password" value={password} onChange={onChange} id="password" className="bg-white rounded-md border border-gray-200 p-3 focus:outline-none w-full" placeholder="Password" required />
              </div>
              <div className="mb-6">
                  <label htmlFor="password2" className="mb-3 block text-gray-700">Confirm password:</label>
                  <input type="password" id="password2" value={password2} onChange={onChange} name="password2" className="bg-white rounded-md border border-gray-200 p-3 focus:outline-none w-full" placeholder="Confirm Password" required />
              </div>
              <button type="submit" className="py-3 px-12 bg-teal-500 hover:bg-teal-600 mr-5 rounded-md text-white text-lg focus:outline-none w-full">Submit</button>
          </form>
       </section>
    </>
  )
}
Register.propTypes = {
  name:PropTypes.string,
  email:PropTypes.string,
  password:PropTypes.string,
  password2:PropTypes.string,
};
export default Register;