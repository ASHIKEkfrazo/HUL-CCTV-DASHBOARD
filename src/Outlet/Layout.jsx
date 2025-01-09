import React, { useEffect, useState } from 'react'

import { Outlet, Navigate } from 'react-router-dom';
import Structure from '../Layout/Structure';
import Login from '../Pages/Auth/Login';
const Layout = () => {



  return (
    <>
          <Structure>
            <Outlet />
          </Structure>

    </>
  )
}

export default Layout