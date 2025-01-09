import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "antd"

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div className='flex justify-center items-center h-screen flex-col'>
            <img src="https://eimkeia.stripocdn.email/content/guids/CABINET_da6ee826f68eb108c924726d5460f5082d1a9899e8e50c985dc4e82f63bec700/images/animation_notfound.gif" alt="" />
            <Button onClick={() => navigate('/')} style={{ background: "#006768", color: "#fff", padding: "1.5rem 3rem" }}>Back To Home</Button>
        </div>
    )
}

export default NotFound