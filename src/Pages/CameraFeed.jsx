import React, { useContext, useEffect, useReducer } from "react";
import {CameraFilled ,CaretDownOutlined  }  from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import {Spin ,Switch} from "antd";
import { ClusterContext } from "../ContextApi/clustercontext";
import { CamDataContext } from "../ContextApi/CamDataContext";
import { clusterMachineCameras } from "../Endpoints/ApiCall";
import CameraStream from "./CameraStream";

const CameraFeed  = () =>{
    const initialActiveState = {
      activeMachineId:null,
      activeCameraId:null,
      activeSwtich:false
    } 
    const {state_Cluster , dispatchCluster } = useContext(ClusterContext)
    const {state_CamData , dispatchCamData} = useContext(CamDataContext)
    const [activeId, setActiveId] = useState(initialActiveState);
    useEffect(()=>{
setActiveId(initialActiveState)
    }, [state_Cluster?.activeCluster?.id])

// useEffect(()=>{
//     const url = `http://localhost:8000/api/clusters/${state_Cluster?.activeCluster?.id}/cameras/`
//     axios.get(url).then((res)=>dispatchCamData({type:"CAM_DATA",payload:res.data})).catch(err => console.log(err))
// },[state_Cluster?.activeCluster])

const handleChange= async (val) =>{
try {
  setActiveId((prev)=>({...prev,activeMachineId:val.id }))
  setActiveId((prev)=>({...prev,activeSwtich:false }))
  // setActiveId((prev)=>({...prev,activeCameraId:null }))
  clusterMachineCameras(val.id).then((res)=>{
    dispatchCamData({type:"CAM_DATA", payload:res})
  })
} catch (error) {
  console.log(error)
}

}



useEffect(() => {
  let intervalId; // To store the interval ID for cleanup

  if (activeId.activeSwtich) {
    let currentIndex = 0; // Start with the first camera

    const switchCamera = () => {
      if (state_CamData.data.length > 0) {
        const currentCamera = state_CamData.data[currentIndex];
        handleCameraChange(currentCamera); // Change the active camera
        console.log(`Switching to camera: ${currentCamera.id}`);

        // Move to the next camera, looping back to the start
        currentIndex = (currentIndex + 1) % state_CamData.data.length;
      }
    };

    // Call the function immediately, then every 10 seconds
    switchCamera();
    intervalId = setInterval(switchCamera, 10000);
  }

  // Cleanup the interval when `activeSwtich` becomes false or component unmounts
  return () => clearInterval(intervalId);
}, [activeId.activeSwtich, state_CamData.data]);




const handleCameraChange = (val) =>{
  setActiveId((prev)=>({...prev,activeCameraId:val.id }))
  dispatchCamData({type:'LOADING',payload:true})
  dispatchCamData({type:"CAM_STATUS",payload:val.id})
  dispatchCamData({type:"ACTIVE_ID",payload:val.id})
  setTimeout(()=>{
      dispatchCamData({type:'LOADING',payload:false})
  },[3000])
}
  
const handleSwtichChange =  (e) =>{
setActiveId((prev)=>({...prev,activeSwtich:e}))
}
return (
<>

<div className="  text-3xl px-5 py-3 rounded-tr-lg rounded-tl-lg  font-semibold flex justify-between  items-center text-[#06175d]">
<span className="w-1/2">
{state_Cluster?.activeCluster?.name}
</span>
<span className="flex gap-2 items-end justify-center flex-col text-sm w-1/2">
{
  activeId.activeMachineId && state_CamData.data?.length > 0 && (
<>
{activeId.activeSwtich ? "Automatic Switching" : "Manual Switching"}
 <Switch size="large" onChange={handleSwtichChange} checked={activeId.activeSwtich}/>
</>

  )
  
}
</span>
</div>

<div className="flex p-3 gap-3">
    <div className="w-[35%] h-1/2 min-h-[350px] rounded-lg p-3 flex flex-col gap-4 " style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
      {
        state_Cluster?.clusterMachineData.length > 0 ? 
        <>
        {

        state_Cluster?.clusterMachineData?.map((item )=>{
          const isActive = activeId.activeMachineId === item.id; // Check if this item is active
          return (
            <div className={` p-1 rounded-md ${isActive ? "bg-[#d2d7e9]" : null }`}>

            <li
                  key={item.id}
                  onClick={() => handleChange(item)}
                  className={`Camera-link ${isActive ? "active" : ""}`}
                  style={{
                    backgroundColor:  "#2861fe", // Apply bg color dynamically
                    cursor: "pointer", // Optional for better UX
                  }}
                >
                  {item.name}
                 
               
                  <CaretDownOutlined />
  
            </li>
            {
              isActive &&   (
                <ul 
                className={`overflow-hidden transition-all duration-5000 ease-in-out mt-1 ${
                  isActive ? "animate-slideDown" : "max-h-0 opacity-0"
                }`}
                >
                  {
                    state_CamData?.data?.length > 0 ? 
                    state_CamData?.data?.map((item)=>{
                      const isActive = activeId.activeCameraId === item.id; // Check if this item is active
                      
                      return(
                        <li
                        key={item.id}
                        onClick={() => handleCameraChange(item)}
                        className={`Camera-link my-2 ${ isActive ? "!bg-[#43996a]" : "!bg-[#06175d]"} `}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {item.name}
                        <CameraFilled />
                  </li>
                      )
                     }) 
                    
                    : <div className=" font-bold mt-3">No Cameras found for above machine</div>
                  }
             
           
            </ul>
              )
            }
          
            </div>

                
          )
        })
        }
  
        </>
        :
      //   state_CamData?.data.length > 0 ?

      //  <>
      //  {state_CamData?.data?.map((cam, index) => {
      //   const isActive = state_CamData?.activeId === cam.id; // Check if this item is active
      //   return (
      //     <li
      //       key={cam.id}
      //       onClick={() => handleChange(cam)}
      //       className={`Camera-link ${isActive ? "active" : ""}`}
      //       style={{
      //         backgroundColor: isActive ? "#43996a" : "#06175d", // Apply bg color dynamically
      //         cursor: "pointer", // Optional for better UX
      //       }}
      //     >
      //       {cam.name}
      //       <CameraFilled />
      //     </li>
      //   );
      // })}
      //  </>
       <div className="text-black flex items-center w-full h-full justify-center font-bold">No Machines  </div>
 
      }
      
    
    
    </div>
    <div className="w-full bg-gray-200 h-full rounded-md">
        {
            state_CamData.activeId ?

            <div className="">
        {  
            state_CamData.loading ? <div className="flex w-full h-[300px] justify-center items-center"><Spin/></div>  :
            state_CamData.data && (
<CameraStream cameraId={activeId.activeCameraId}/>         

)
        }
</div> :
<div className="flex w-full h-[500px] justify-center items-center font-bold text-2xl">
Please Select Camera
</div>
        }


    </div>
</div>
</>
    )
}


export default CameraFeed;
