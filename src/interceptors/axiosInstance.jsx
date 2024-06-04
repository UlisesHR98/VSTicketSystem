import axios from "axios";

let refresh = false;

const axiosInstance = axios.create({
  baseURL: 'https://vds-app-vtreu.ondigitalocean.app', // Cambia esto a la URL base de tu API
});

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;

      console.log(localStorage.getItem("refresh_token"));
      const response = await axios.post(
        "https://vds-app-vtreu.ondigitalocean.app/refresh_login/",
        {
          refresh: localStorage.getItem("refresh_token"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data["access"]}`;
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);

        return axios(error.config);
      }
    }
    refresh = false;
    return error;
  }
);

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;