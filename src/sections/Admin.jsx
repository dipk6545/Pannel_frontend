import React, { useState, useEffect } from 'react'
import { Link, useNavigate, Outlet } from "react-router-dom"
import { useRecoilState, useRecoilValue } from 'recoil'
import { adminSelector, tokenSelector } from '../recoil/selectors/selectors'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import { AdminModal } from '../components/AdminModal'
import { adminState } from '../recoil/atoms/atoms'

/**
 * Admin component is the main component of the admin panel.
 * It handles rendering of admin panel components and navigation.
 */
const Admin = () => {
    const token = useRecoilValue(tokenSelector) // Get the token from the state
    const [spin, setSpin] = useState(true) // State for the spinner
    const navigate = useNavigate() // Navigation hook
    const isAdmin = useRecoilValue(adminSelector);
    const [_, setGlobalAdmin] = useRecoilState(adminState);


    useEffect(() => {
        setTimeout(() => {
            if (localStorage.getItem("token") === null) {
                navigate('/')
                return;
            }
        }, 2000);
        if(isAdmin)
            setTimeout(() => setSpin(false), 2000) // Hide the spinner after 2 seconds
        else{
            navigate('/')
            setGlobalAdmin(false);
            toast.error("Unauthorized access")
        }
    }, [localStorage.getItem("token")])

    return (
        <section>
            <AdminModal/>
            <div className="grid grid-cols-6 gap-4 h-screen bg-gray-100 dark:bg-gray-900">
                {spin && <Spinner />} {/* Render spinner */}
                <div className="w-64 dark:bg-gray-900 pt-16 top-16 ">
                    <div className="flex flex-col flex-1 overflow-y-auto">
                        <nav className="flex-1 px-2 py-4">
                            {/* Navigation links */}
                            <Link to="/admin/user" className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                Users
                            </Link>
                            <Link to="/admin/contact" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Contact
                            </Link>
                        </nav>
                    </div>
                </div>

                {/* Main content */}
                <div className='flex flex-col flex-1 dark:bg-gray-900 m-3 col-span-5'>
                    <h1 className="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Admin Panel</h1>
                    <Outlet/>
                </div>
            </div>
        </section>
    )
}

export default Admin

