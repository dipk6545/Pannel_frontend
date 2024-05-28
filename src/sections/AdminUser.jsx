import React, { useCallback, useEffect, useState } from 'react'
import { AdminCard } from '../components/AdminCard'
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import { adminUserSubcribe } from '../recoil/selectors/selectors';
import { adminUserPublish } from '../recoil/atoms/atoms';

// Component for displaying and managing admin users
const AdminUser = () => {
    // State for storing user data
    const [data, setData] = useState([]);
    const [editedData, setEditedData] = useRecoilState(adminUserPublish);

    // Function to fetch user data from the server
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/users", {
                method: "Get",
                headers: {
                    "Authorization": localStorage.getItem("token"),
                },
                cache: 'default'
            });

            const res = await response.json();
            if (response.ok) {
                setData(res);
            }
            else {
                const message = Object.values(res).join(", ");
                throw new Error(message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // Function to handle user deletion
    const handleClick = async (email) => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/delete/user", {
                method: "Delete",
                headers: {
                    "Authorization": localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
                cache: 'default'
            });
            const res = await response.json();

            if (response.ok) {
                toast.success(res.message);
                setData(data.filter((item) => item.email !== email));
            }
            else {
                const message = Object.values(res).join(", ");
                throw new Error(message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if(editedData!==undefined){
            console.log('I am not undefined');
            setData(data.map((item)=>item._id === editedData._id ? editedData : item));
            setEditedData(undefined);
        }
    }, [editedData]);

    // Call the fetchData function when the component mounts
    useEffect(() => {
        try {
            fetchData();
        } catch (error) {
            toast.error(error.message);
        }
    }, []);

    return (
        <div className="w-full h-auto border-2 border-white p-2">
            <div className='grid grid-cols-4 justify-items-center'>
                {/* Map over the data array and render an AdminCard component for each user */
                    data.map((item) => <AdminCard data={item} key={item._id} handleClick={handleClick} />)
                }
            </div>
        </div>
    )
}

export default AdminUser
