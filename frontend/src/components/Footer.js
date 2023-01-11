import { UserContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useContext } from "react";

const Footer = () => {
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
    <footer className="bg-gray-100">   
        <div className="container p-6 mx-auto ">
            <div className="grid lg:grid-cols-4 gap-2 grid-cols-2">
                <div>
                    <h2 className="my-6 text-sm font-semibold text-gray-800 uppercase dark:text-white">Overview</h2>
                    <ul className="text-gray-600 dark:text-gray-400">
                        <li className="mb-4">
                            <a href="/" className="hover:underline">Features</a>
                        </li>
                        {state.user ?(
                          <>
                            <li className="mb-4">
                                <Link to="/new-job" className="hover:underline">Post job</Link>
                            </li>
                            <li className="mb-4">
                            <button onClick={onLogout} className="block hover:text-gray-700 mt-4 lg:inline-block lg:mt-0">
                            Logout </button>
                            </li>
                          </>
                        ):(
                        <>
                            <li className="mb-4">
                                <Link to="/login" className="hover:underline">Login</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/register" className="hover:underline">Signup</Link>
                            </li>
                            <li className="mb-4">
                                <a href="/" className="hover:underline">About us</a>
                            </li>
                        </>
                        )}                      
                    </ul>
                </div>
                <div>
                    <h2 className="my-6 text-sm font-semibold text-gray-800 uppercase dark:text-white">Company</h2>
                    <ul className="text-gray-600 dark:text-gray-400">
                        <li className="mb-4">
                            <a href="/" className="hover:underline">About us</a>
                        </li>
                        <li className="mb-4">
                            <a href="/" className="hover:underline">Careers</a>
                        </li>
                        <li className="mb-4">
                            <a href="/" className="hover:underline">Press</a>
                        </li>
                        <li className="mb-4">
                            <a href="/" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="my-6 text-sm font-semibold text-gray-800 uppercase dark:text-white">Resources</h2>
                    <ul className="text-gray-600 dark:text-gray-400">
                        <li className="mb-4">
                            <a href="/" className="hover:underline">Blog</a>
                        </li>
                        <li className="mb-4">
                            <a href="/" className="hover:underline">Help center</a>
                        </li>
                        <li className="mb-4">
                            <a href="/" className="hover:underline">Events</a>
                        </li>
                        <li className="mb-4">
                            <a href="/" className="hover:underline">Newsletter</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="my-6 text-sm font-semibold text-gray-800 uppercase dark:text-white">Legal</h2>
                    <ul className="text-gray-600 dark:text-gray-400">
                        <li className="mb-4">
                            <a href="/" className="hover:underline">Terms</a>
                        </li>
                        <li className="mb-4">
                            <a href="/" className="hover:underline">Privacy</a>
                        </li>
                        <li className="mb-4">
                            <a href="/" className="hover:underline">Cookies</a>
                        </li>
                        <li className="mb-4">
                            <a href="/" className="hover:underline">Settings</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <hr className="mt-6 border-gray-300 sm:mx-auto dark:border-gray-700 lg:mt-8" />
        <div className="text-center py-3">
            <span className="text-sm text-teal-500 dark:text-gray-400">© 2023 <a href="/" className="hover:underline">JobsListing</a>. All Rights Reserved.
            </span>
        </div>
    </footer>
    </>
  )
}
export default Footer