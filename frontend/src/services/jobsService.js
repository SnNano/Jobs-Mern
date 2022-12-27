import axios from "axios";
const API_URL = "/api/jobs/";

export const fetchAllJobs = async (dispatch) => {
    try {
        const response = await axios.get(API_URL);
        dispatch({type: "FETCH_JOBS", payload:response.data});
      } catch (error) {
        dispatch({type:"ERROR", payload:error.response.data.message})
      }
}

export const getUserJobs = async (userId, token, dispatch) => {
    try {
        const response = await axios.get(API_URL+"user/"+userId, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
          });
        dispatch({type: "FETCH_JOBS", payload:response.data});
      } catch (error) {
        dispatch({type:"ERROR", payload:error.response.data.message})
      }
}



export const postJob = async (token, data, dispatch) => {
    try {
        await axios.post(API_URL, data, {
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
          }
        }
      );
        dispatch({type:"ADD_JOB"});
      } catch (error) {
        dispatch({type:"ERROR", payload:error.response.data.message});
      }
}

export const getOneJob = async (id, dispatch)=> {
    try {
        const response = await getJob(id);
        dispatch({type:"SINGLE_JOB", payload:response.data});
    } catch (error) {
        dispatch({type:"ERROR", payload:error.response.data.message})
    }
}
export const getJob = async (id)=> {
    return await axios.get(API_URL + id);
}

export const editJob = async (token,id, data, dispatch) => {
    try {
        await axios.put(API_URL+id, data, {
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
          }
        }
      );
        dispatch({type:"EDIT_JOB"});
      } catch (error) {
        dispatch({type:"ERROR", payload:error.response.data.message});
      }
}

export const deleteJob = async (token ,id, dispatch) => {
    try {
        await axios.delete(API_URL+id, {
          headers: {
              Authorization: `Bearer ${token}`
          }
        }
      );
        dispatch({type:"DELETE_JOB", payload:id});
      } catch (error) {
        dispatch({type:"ERROR", payload:error.response.data.message});
      }
}

