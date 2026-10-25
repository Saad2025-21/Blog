
import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from "../components/Sidebar.jsx"

const Dashboard = () => {
    return (
        <div className='editorial-dashboard flex'>
            <Sidebar />
            <div className='dashboard-outlet flex-1'>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard