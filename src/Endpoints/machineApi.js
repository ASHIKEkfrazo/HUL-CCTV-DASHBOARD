import { apiCall } from "../API/API";

export const machineDataAPI = async () => {
    try {
        //console.log(pagination)
        const response = await apiCall.get(`machines/`);
        return response.data
    } catch (error) {
        //console.log(error, "ERROR FETCHING DURING REPORT DATA")
        throw error
    }

}
export const addMachineAPI = async (data) =>{
    try {
        const response = await apiCall.post("machines/", data);
        return response.data
    } catch (error) {
        //console.log(error, "ERROR DURING POSTING API");
        throw error
    }
}

export const updateMachineAPI = async (id,data) =>{
    try {
        const response = await apiCall.put(`machines/${id}/`, data);
        return response.data
    } catch (error) {
        //console.log(error, "ERROR DURING POSTING API");
        throw error
    }
}
export const deleteMachineAPI = async (id) =>{
    try {
        const response = await apiCall.delete(`machines/${id}/`);
        return response.data
    } catch (error) {
        //console.log(error, "ERROR DURING POSTING API");
        throw error
    }
}