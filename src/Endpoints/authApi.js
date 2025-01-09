import { apiCall } from "../API/API";


export const loginApi = async (data) => {
    try {
        const response = await apiCall.post("login/", data)
        return response
    } catch (error) {
        console.log(error, "Error During Login")
        throw error
    }
}
export const signupApi = async (data) => {
    try {
        const response = await apiCall.post("users/", data); // Assuming "signup/" is the endpoint
        return response;
    } catch (error) {
        console.error("Error During Signup:", error);
        throw error;
    }
};