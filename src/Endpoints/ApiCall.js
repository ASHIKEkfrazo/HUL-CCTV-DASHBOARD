import { apiCall } from "../API/Api-Instance";


const clusterApiCall =  async()=>{
    try {
        let url = 'clusters/'
        const response =  await apiCall.get(url)
        return response

    } catch (error) {
        console.log(error)
    }
}


const clusterMcahineApi = async(clusterId) =>{
    try {
     
        let url = `machines/?cluster_id=${clusterId}`
        const response = await apiCall.get(url)
        return response
    } catch (error) {
        console.log(error)
    }
}

const clusterMachineCameras = async(machineId)=>{
    try {
     
        let url = `cameras/?machine_id=${machineId}`
        const response = await apiCall.get(url)
        return response.data.results
    } catch (error) {
        console.log(error)
    }
}

export {
     clusterApiCall,
     clusterMcahineApi,clusterMachineCameras
}