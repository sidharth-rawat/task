import axios from "axios";
import { getAuthToken } from "./storage.service";

const BASE_URL = process.env.REACT_APP_BASE_API_URL

export const http = axios.create({
    baseURL: BASE_URL, // host name 
    headers: {
        'Authorization': `${getAuthToken()}`
    }
});
