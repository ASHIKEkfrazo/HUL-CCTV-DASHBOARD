import { apiCall } from "../API/API"

export const reportDataAPI = async (pagination) => {
    try {
        //console.log(pagination)
        const response = await apiCall.get(`report/?page=${pagination.current}&page_size=${pagination.pageSize}`);
        return response.data
    } catch (error) {
        //console.log(error, "ERROR FETCHING DURING REPORT DATA")
        throw error
    }

}


export const reportPostApi = async (data) => {
    try {
        const response = await apiCall.post("report/", data);
        return response
    } catch (error) {
        //console.log(error, "ERROR DURING POSTING API");
        throw error
    }
}


export const searchDataApi = async (searchQuery, pagination) => {
    try {
        const response = await apiCall.get(`report/?search_key=${searchQuery}&page=${pagination.current}&page_size=${pagination.pageSize}`);
        return response.data
    } catch (error) {
        //console.log(error, "ERROR DURING POSTING API");
        throw error
    }
}