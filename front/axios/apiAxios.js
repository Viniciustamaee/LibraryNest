import axios from "axios";

const apiFecth = axios.create({
    baseURL: import.meta.env.VITE_URL_API,
    responseType: "json",
});

export default apiFecth;