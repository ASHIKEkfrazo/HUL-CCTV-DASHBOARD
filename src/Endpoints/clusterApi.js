import { apiCall } from "../API/API";

export const clusterDataAPI = async () => {
    try {
        //console.log(pagination)
        const response = await apiCall.get(`clusters/`);
        return response.data
    } catch (error) {
        //console.log(error, "ERROR FETCHING DURING REPORT DATA")
        throw error
    }

}
export const addClusterAPI = async (data) =>{
    try {
        const response = await apiCall.post("clusters/", data);
        return response.data
    } catch (error) {
        //console.log(error, "ERROR DURING POSTING API");
        throw error
    }
}

export const updateClusterAPI = async (id,data) =>{
    try {
        const response = await apiCall.put(`clusters/${id}/`, data);
        return response.data
    } catch (error) {
        //console.log(error, "ERROR DURING POSTING API");
        throw error
    }
}
export const deleteClusterAPI = async (id) =>{
    try {
        const response = await apiCall.delete(`clusters/${id}/`);
        return response.data
    } catch (error) {
        //console.log(error, "ERROR DURING POSTING API");
        throw error
    }
}