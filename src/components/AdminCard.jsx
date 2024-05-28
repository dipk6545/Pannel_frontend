import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { adminUserState, modalState } from '../recoil/atoms/atoms';

export const AdminCard = (props) => {
    const [modal, setModal] = useRecoilState(modalState);
    const { email, username } = props.data;
    const [adminuser, setAdminUser] = useRecoilState(adminUserState)
    return (
        <div className="w-[280px] h-32 p-2 my-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <p className="mb-2 tracking-tight text-gray-900 dark:text-white">Username: {username}</p>
            <p className="mb-2 tracking-tight text-gray-900 dark:text-white">Email: {email}</p>
            <div className='flex justify-between'>
                <button className="my-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => props.handleClick(email)}>
                    Delete
                </button>
                <button className={`${!props.data.message?"":"hidden"} my-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                    onClick={() => {
                        setModal(true);
                        setAdminUser(props.data);
                    }}>
                    Edit
                </button>
            </div>
        </div >
    )
}
