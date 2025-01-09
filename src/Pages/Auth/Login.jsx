import React from 'react'
import { Button, Input, Select, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { notification } from 'antd';
import { loginApi } from '../../Endpoints/authApi'; 
import {KeyOutlined ,MailFilled} from "@ant-design/icons"
import './login.css';


const Login = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const { handleSubmit, control, formState: { errors } } = useForm();

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
            navigate('/dashboard');
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


  // return (
  //   <>
  //     {contextHolder}

  //     <div className='flex justify-center items-center h-screen bg-[#e3ffff] font-serif'>
  //       <div className="shadow-lg h-full max-h-[500px] w-full max-w-[500px] flex rounded-3xl  bg-white">
  //         {/* <div className="bg-login-bg bg-cover bg-no-repeat rounded-3xl  w-1/2 bg-right"></div> */}
  //         <div className="w-full h-full flex justify-center items-center ">
  //           <div className="w-3/4 h-full flex justify-center items-center flex-col gap-4">
  //             <img src="https://eimkeia.stripocdn.email/content/guids/CABINET_da6ee826f68eb108c924726d5460f5082d1a9899e8e50c985dc4e82f63bec700/images/image_1_1.png" alt="" className="object-cover" />
  //             <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4' >
  //               <div className="w-full">
  //                 <label htmlFor="" className='fw-bolder'><span className='text-red-600 fw-bolder'>*</span>Enter Username</label>
  //                 {/* <Input

  //               placeholder='Enter Email/Username'
  //               style={{
  //                 padding: '1rem ',
  //                 marginTop: '0.5rem'

  //               }}
  //             /> */}

  //                 <Controller
  //                   name="username"
  //                   control={control}
  //                   rules={{ required: "Username required*" }}
  //                   render={({ field }) => (
  //                     <Input
  //                       {...field}
  //                       type="text" // Use HTML date input
  //                       placeholder="Enter Email/Username"
  //                       style={{ width: '100%', height: "3rem" }} // Full width input
  //                     />
  //                   )}
  //                 />
  //                 {errors.username && (
  //                   <span style={{ color: 'red' }}>{errors.username.message}</span>
  //                 )}
  //               </div>
  //               <div className="w-full">
  //                 <label htmlFor="" className='fw-bolder'><span className='text-red-600 '>*</span>Enter Password</label>
  //                 {/* <Input.Password
  //                 placeholder='Enter Password'
  //                 style={{
  //                   padding: '1rem',
  //                   marginTop: '0.5rem'
  //                 }}
  //               /> */}


  //                 <Controller
  //                   name="password"
  //                   control={control}
  //                   rules={{ required: "Password required*" }}
  //                   render={({ field }) => (
  //                     <Input.Password
  //                       {...field}
  //                       type="text" // Use HTML date input
  //                       placeholder="Enter Password"
  //                       style={{ width: '100%', height: "3rem" }} // Full width input
  //                     />
  //                   )}
  //                 />
  //                 {errors.password && (
  //                   <span style={{ color: 'red' }}>{errors.password.message}</span>
  //                 )}
  //                 <label htmlFor="" className='text-red-600 fw-bolder text-sm text-end w-full cursor-pointer'>Forgot Password</label>
  //               </div>
  //               <button htmlType="submit" className='py-2 px-5 bg-theme-green text-white fw-bolder rounded-lg cursor-pointer text-center'>Login</button>
  //             </form>
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //   </>
  // )
  return (
    <>
    {contextHolder}
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex max-w-3xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Right Section: Custom Blue Background */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-r from-[rgb(6,23,93)] to-[rgb(6,23,93)] text-white p-8">
          <h1 className="text-3xl font-bold mb-4">WELCOME!</h1>
          <p className="text-sm text-center mb-6">
            Enter your details and start your journey with us
          </p>
          <button className="bg-white text-[rgb(6,23,93)] font-semibold py-2 px-6 rounded-full hover:bg-gray-100"
           onClick={()=>navigate('/signup')}>
            SIGNUP
          </button>
        </div>
  
        {/* Left Section: Login Form */}
        <div className="w-full md:w-1/2 p-8">
        <div className="flex justify-center bg-[#06175d] p-1">
          <img
            src="https://eimkeia.stripocdn.email/content/guids/CABINET_8270216c780e362a1fbcd636b59c67ae376eb446dc5f95e17700b638b8c3f618/images/indus_logo_dev.png"
            alt="Logo"
            className="object-contain w-36"
          /> 
        </div>
          <h2 className="text-2xl font-bold my-2 text-gray-800 text-center">
            Login 
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            {/* Username Input */}
            <div>
              <label className="block text-gray-600 mb-2" htmlFor="username">
                Username
              </label>
              <Controller
                name="username"
                control={control}
                rules={{ required: "Username is required" }}
                render={({ field }) => (
                  <div className="flex items-center border rounded-lg p-2 gap-2 shadow-sm">
                    <span className="text-gray-500">
                      {/* <i className="fas fa-envelope"></i> */}
                      <MailFilled />
                    </span>
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter your username"
                      className="w-full outline-none bg-transparent"
                    />
                  </div>
                )}
              />
              {errors.username && (
                <span className="text-red-500 text-sm">
                  {errors.username.message}
                </span>
              )}
            </div>
  
            {/* Password Input */}
            <div>
              <label className="block text-gray-600 mb-2" htmlFor="password">
                Password
              </label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                }}
                render={({ field }) => (
                  <div className="flex items-center border rounded-lg rounded-left-lg p-2 gap-2 shadow-sm">
                    <span className="text-gray-500">
                      {/* <i className="fas fa-key"></i> */}
                      <KeyOutlined />
                    </span>
                    <input
                      {...field}
                      type="password"
                      placeholder="Enter your password"
                      className="w-full outline-none bg-transparent"
                    />
                  </div>
                )}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
  
            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center text-gray-600 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[rgb(6,23,93)]" />
                Remember me
              </label>
              <a href="#" className="hover:text-[rgb(6,23,93)]">
                Reset Password?
              </a>
            </div>
  
            {/* Login Button */}
            <button
              type="submit"
              className="bg-[rgb(6,23,93)] hover:bg-[#041b6e] text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <i className="fas fa-sign-in-alt"></i> LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
 
}

export default Login