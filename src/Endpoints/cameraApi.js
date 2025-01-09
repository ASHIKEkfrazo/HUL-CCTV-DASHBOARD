import { apiCall } from "../API/API";

export const camerasDataAPI = async () => {
    try {
        //console.log(pagination)
        const response = await apiCall.get(`cameras/`);
        return response.data
    } catch (error) {
        //console.log(error, "ERROR FETCHING DURING REPORT DATA")
        throw error
    }

}
export const addCamerasAPI = async (data) =>{
    try {
        const response = await apiCall.post("cameras/", data);
        return response.data
    } catch (error) {
        //console.log(error, "ERROR DURING POSTING API");
        throw error
    }
}

export const updateCamerasAPI = async (id,data) =>{
    try {
        const response = await apiCall.put(`cameras/${id}/`, data);
        return response.data
    } catch (error) {
        //console.log(error, "ERROR DURING POSTING API");
        throw error
    }
}
export const deleteCamerasAPI = async (id) =>{
    try {
        const response = await apiCall.delete(`cameras/${id}/`);
        return response.data
    } catch (error) {
        //console.log(error, "ERROR DURING POSTING API");
        throw error
    }
}