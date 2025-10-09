

import axios from "axios";

export const bookBaseaseUrl = axios.create({
    baseURL:"http://localhost:8000/book"
}) 