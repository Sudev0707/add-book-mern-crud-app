import axios from "axios";

export const bookBaseaseUrl = axios.create({
  baseURL: "http://localhost:8000/book",
});
export const userBaseURL = axios.create({
  baseURL: "http://localhost:8000/user",
});
