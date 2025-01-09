import React, { useContext, useEffect } from "react";
import {
  ClusterOutlined
} from "@ant-design/icons";
import { Menu, Modal } from "antd";
import { useNavigate, NavLink, useLocation ,Link  } from "react-router-dom";
import CurrentTime from "../Components/CurrenTime";
import { ClusterContext } from "../ContextApi/clustercontext";
import { clusterApiCall, clusterMachineCameras, clusterMcahineApi } from "../Endpoints/ApiCall";
import { CamDataContext } from "../ContextApi/CamDataContext";

const Sidenav = ({collapsed}) => {
  const { state_Cluster,dispatchCluster} = useContext(ClusterContext);
  const {state_CamData , dispatchCamData} = useContext(CamDataContext)

  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Extract the current page from the path
  const currentCluster =  state_Cluster?.clusterData?.id;
  const currentMachine = state_Cluster?.clusterMachineData?.id;

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  useEffect(()=>{
    const fetchData =  async ()=>{
      try {
        const response = await clusterApiCall()
        // console.log(response.data.results)
        dispatchCluster({type:"CLUSTER_DATA" , payload:response.data.results})
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[])





const handleActive  = (type,data) =>{
  dispatchCluster({type:"ACTIVE_CLUSTER", payload:data})

  if(type === "menu"){
    clusterMcahineApi(data.id).then((res)=>{
      dispatchCluster({type:"CLUSTER_MACHINE_DATA", payload:res.data.results})
    })
    .catch(err=>console.log(err))
  }


  }

const currentPage = "";

  return (
    <>
      {/* Logout Confirmation Modal */}


      {/* Side Navigation */}
      <div className="sideNav">
      <div className="flex justify-center p-3 bg-[#06175d]">
          <img
            src="https://eimkeia.stripocdn.email/content/guids/CABINET_8270216c780e362a1fbcd636b59c67ae376eb446dc5f95e17700b638b8c3f618/images/indus_logo_dev.png"
            alt="Logo"
            className="object-contain w-36"
          /> 
        </div>
        <Menu
  mode="inline"
  className="flex flex-col gap-3"
>
  {/* Reports Menu Item */}

  {state_Cluster?.clusterData?.map((item) => (

      <Menu.Item
        key={item.id}
        style={{
          background: currentPage === item.id ? "#43996a" : "#06175d",
          boxShadow:
            currentPage === item.id
              ? "rgba(0, 0, 0, 0.24) 0px 3px 8px;"
              : "",
        }}
        onClick={() => handleActive("menu",item)}
      >
        <NavLink to="dashboard" className="no-underline">

        <ClusterOutlined style={{ fontSize: "1rem", color: "#fff" }} />
        <span
          className="label"
          style={{
            color: currentPage === item.id ? "#fff" : "#fff",
            fontWeight: currentPage === item.id ? "700" : "500",
          }}
        >
          {item.name}
        </span>
        </NavLink>
      </Menu.Item>
    
  ))}
  {
    !state_Cluster?.clusterData?.length > 0 &&(
      <div className="text-center h-24 flex items-center justify-center font-bold">
        No clusters found
      </div>
    )
  }
      <Menu.Item key="settings" className="bg-white shadow-lg">
        <Link to="config" className="p-3 text-decoration-none">
          <span className="cursor-pointer text-black font-bold">
            Settings
          </span>
        </Link>
      </Menu.Item>
</Menu>
      </div>
          <CurrentTime collapsed={collapsed}/>
      
    </>
  );
};

export default Sidenav;
