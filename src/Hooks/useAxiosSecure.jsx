import axios from "axios";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  axiosSecure.interceptors.request.use(
    async (config) => {
      const user = auth.currentUser;

      if (user) {
        const token = await user.getIdToken();
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response ? error.response.status : null;
      if (status === 401 || status === 403) {
        console.error("Unauthorized access detected. Logging out...");
        await signOut(auth);
        navigate("/login");
      }
      return Promise.reject(error);
    },
  );

  return axiosSecure;
};

export default useAxiosSecure;
