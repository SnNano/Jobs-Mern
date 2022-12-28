import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useContext } from "react";
import Spinner from "./Spinner";


const Header = () => {
    const {state, dispatch} = useContext(UserContext);
    const navigate = useNavigate();
    const onLogout = async () => {
        dispatch({type:"LOGOUT"});
        localStorage.removeItem("user");
        dispatch({type:"RESET"});
        navigate("/login");
    }
    if (state.isLoading) {
        return <Spinner />
    }
  return (
    <>
     <header className="drop-shadow-md">
        <nav className="container mx-auto flex items-center justify-between p-6">
            <Link to="/" id="logo">
                LOGO
            </Link>
            <div className="text-lg text-gray-600 lg:flex hidden" id="menu">
                <Link to="/" className="block mt-4 lg:inline-block text-teal-600 lg:mt-0 mr-10">
                    Home
                </Link>
                {state.user ? (<>
                    <Link to="/manage-jobs" className="block mt-4 lg:inline-block hover:text-gray-700 lg:mt-0 mr-5">
                    <i className="fa-solid fa-list-check"></i> Manage jobs
                </Link>
                <div className="mr-5 lg:mr-0 hidden lg:inline-block">
                <Link to="/new-job" className="cursor-pointer py-2 px-6 bg-teal-500 hover:bg-teal-600 rounded-full text-white text-lg mr-5">Post job</Link>
                 <button onClick={onLogout} className="block hover:text-gray-700 mt-4 lg:inline-block lg:mt-0">
                    Logout
                </button>
                </div>
                </>) : (
                <div className="mr-5 lg:mr-0 hidden lg:inline-block">
                     <Link to="/login" className="cursor-pointer py-2 px-6 border border-teal-500 rounded-full text-teal-500 hover:text-gray-700 text-lg mr-5">Login</Link>
                     <Link to="/register" className="cursor-pointer py-2 px-6 bg-teal-500 hover:bg-teal-600 rounded-full text-white text-lg">Sign up</Link>
                 </div>
                )}
            </div>
            <div className="block lg:hidden">
                <button id="btn-toggle"
                    className="flex items-center px-4 py-3 border rounded text-teal-500 border-teal-500 focus:outline-none">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
        </nav>
    </header>
    </>
  )
}
export default Header