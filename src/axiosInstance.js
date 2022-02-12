import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

export const BASE_URL = "http://localhost:8080";

export default instance;
