import axios from "axios";

const API_BASE_URL = "https://localhost:5001";

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosClient;