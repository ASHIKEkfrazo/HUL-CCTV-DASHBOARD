import axios from "axios"

// const baseUrl = "https://huldev.aivolved.in/api"
const baseURL = "http://localhost:8000/api/"


const apiCall = axios.create({
    baseURL: baseURL
})

export { apiCall }