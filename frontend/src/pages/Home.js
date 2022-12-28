import { useReducer, useEffect } from "react";
import Hero from "../components/Hero";
import Testimonial from "../components/Testimonial";
import { initialState, jobReducer } from "../Reducers/jobReducer";
import Jobs from "./Jobs";

const Home = () => {
  const [state, dispatch] = useReducer(jobReducer, initialState);

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[]);

  return (
    <>
      <Hero  dispatch={dispatch}/>
      <Jobs state={state} dispatch={dispatch} search={state.search}/>
      <Testimonial />
    </>
  )
}
export default Home