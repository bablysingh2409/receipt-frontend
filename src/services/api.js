import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL,
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// });

//  Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: "https://api.mulltiply.org"
});

// Added a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const defaultWorkspaceId = localStorage.getItem("current");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Setting default workspace ID in the request headers if available
    if (defaultWorkspaceId) {
        config.headers["current"] = defaultWorkspaceId;
      }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Added a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

//sending workspace id
export const postCurrentWorkspace = async (workspaceId) => {
    try {
      const res = await axiosInstance.post("/users/switch-workspace", {
        attributeSet: {
          workspace: workspaceId,
        },
      });
      console.log(
        "workspace res",
        res.data.data.attributeSet.defaultWorkspace._id
      );
      return res.data.data.attributeSet.defaultWorkspace._id
    } catch (err) {
      console.log("workspace error", err);
    }
  };

  // Axios instance to get profile
export const getProfile = async () => {
    try {
      const response = await axiosInstance.get("/users/profile");
      //   console.log('new profile data..',response)
      const data=await response.data;
      return data;
    } catch (error) {
      // console.error(error);    
      throw error.response.data;
    }
  };
  
