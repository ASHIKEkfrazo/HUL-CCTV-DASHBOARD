import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Outlet/Layout";
import CameraFeed from "./Pages/CameraFeed";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/Auth/Login"
import Signup from "./Pages/Auth/Signup";
import { useContext } from "react";
import { Clusterconfig } from "./Pages/Clusterconfig";


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
    
    {
      path: "",
      element: <Layout />,
      children: [
     
        {
          path: 'dashboard',
          element: <CameraFeed />,
        },

        // {
        //   path: 'personal',
        //   element: <Personal />,
        // },
        {
          path:"config",
          element:<Clusterconfig />
        },
      ]
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);


  return (
    <>
      <RouterProvider router={router} />    </>
  )
}

export default App
