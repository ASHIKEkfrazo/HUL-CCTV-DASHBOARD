import { useReducer, usestate_Cluster } from "react";
import { createContext } from "react";


 export const ClusterContext = createContext();

const ClusterContextWrapper = ({children})=>{

    const initialstate_Cluster = {
        clusterData:[],
        clusterMachineData:[],
        activeCluster:null,
        activeId:{
            activeMachineId:null,
            activeCameraId:null,
            activeSwtich:false
        }
    }


    const reducer = (state_Cluster, action) =>{
        switch(action.type){
        case "CLUSTER_DATA":
            return{...state_Cluster,clusterData:action.payload}
        case "ACTIVE_CLUSTER":
            return {...state_Cluster,activeCluster:action.payload}   
        case 'CLUSTER_MACHINE_DATA':
            return{...state_Cluster,clusterMachineData:action.payload}  
        case  'ACTIVE_ID':
            return{...state_Cluster,activeId:action.payload}
        default:
            return state_Cluster    
        }
      
    }

    // const [state_Cluster, dispatchCluster] = useReducer(reducer,{
    //     ...initialstate_Cluster,activeCluster:initialstate_Cluster?.clusterData[0]
    // });
    const [state_Cluster, dispatchCluster] = useReducer(reducer, initialstate_Cluster)

    // const [clusterData  , setClusterData]  = usestate_Cluster([
        // {
        //     id:1,
        //     name:"Cluster 1"
        // },
        // {
        //     id:2,
        //     name:"Cluster 2"
        // },
    // ])

    // const [ activeCluster , setClusterActive] = usestate_Cluster(clusterData[0])
    return (
        <ClusterContext.Provider value={{state_Cluster, dispatchCluster}}>
         {children}
       </ClusterContext.Provider>
    )
}

export  default ClusterContextWrapper;