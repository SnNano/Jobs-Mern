import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {createContext, useReducer} from "react";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Footer from './components/Footer';
import Header from './components/Header';
import Home from "./pages/Home";
import ManageJobs from "./pages/ManageJobs";
import JobItem from "./components/JobItem";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { initialState } from "./Reducers/authReducer";
import { authReducer } from "./Reducers/authReducer";

export const UserContext = createContext();


function App() {

  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
   <>
    <Router>
      <UserContext.Provider value={{state, dispatch}}>
          <Header />
          <main className="mt-12 lg:mt-32">
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/register" element={<Register />}/>
              <Route path="/manage-jobs" element={<ManageJobs />}/>
              <Route path="/job/:id" element={<JobItem />}/>
            </Routes>
            <ToastContainer />
          </main>
          <Footer />
     </UserContext.Provider>
    </Router>
   </>
  );
}

export default App;
