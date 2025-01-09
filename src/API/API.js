import axios from "axios"

const baseUrl = "http://localhost:8000/api"

const apiCall = axios.create({
    baseURL: baseUrl
})

export { apiCall }