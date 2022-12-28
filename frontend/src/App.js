import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {createContext, useReducer} from "react";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Footer from './components/Footer';
import Header from './components/Header';
import Home from "./pages/Home";
import NotFound from "./components/NotFound";
import ManageJobs from "./pages/ManageJobs";
import JobItem from "./components/JobItem";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { initialState } from "./Reducers/authReducer";
import { authReducer } from "./Reducers/authReducer";
import JobForm from "./pages/JobForm";

export const UserContext = createContext();


function App() {

  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
   <>
    <Router>
      <UserContext.Provider value={{state, dispatch}}>
          <Header />
          <main className="my-12 lg:my-32 w-full">
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/register" element={<Register />}/>
              {state.user && <Route path="/manage-jobs" element={<ManageJobs />}/>}
              {state.user && <Route path="/new-job" element={<JobForm />}/>}
              <Route path="/new-job/:id" element={<JobForm />}/>
              <Route path="/job/:id" element={<JobItem />}/>
              <Route path='*' element={<NotFound />}/>
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
