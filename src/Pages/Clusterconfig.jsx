import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { loginApi } from '../Endpoints/authApi';
import TabComponent from "./TabComponent";
export const Clusterconfig = () => {
    const navigate = useNavigate();
    const { handleSubmit, control, formState: { errors } } = useForm();
    const clusters = ["Cluster A", "Cluster B", "Cluster C"];
    const [api, contextHolder] = notification.useNotification();
    

  // TOASTER NOTIFICATION
        const openNotification = (message, type) => {
            api[type]({
            message: <div className="font-bold">{message}</div>,
            duration: 5, // Adjust duration as needed
            });
        };
        const onSubmit = (data) => {
           loginApi(data)
             .then((res) => {
               openNotification(res?.data?.message || 'Successfully logged in!', 'success');
               localStorage.setItem("login", true)
               if (res?.data?.message) {
                 setTimeout(() => {
                   navigate('/machine');
                 }, [1000])
               }
             })
             .catch((err) => {
               // Use openNotification with the error message
              // openNotification(err?.response?.data?.error || 'Login failed.', 'error');
               openNotification(err?.response.data.error || 'Login failed.', 'error');
       
              // console.log(err)
             });
         };
      
         return (
            // <div
            //   className="flex items-center justify-center min-h-screen bg-gray-100"
            // >
            <TabComponent />
            
            // </div>
          );
          
     
    }
      export default Clusterconfig;
    
  