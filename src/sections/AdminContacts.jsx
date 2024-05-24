import React, { useEffect, useState } from 'react'
import { AdminCard } from '../components/AdminCard'
import { toast } from 'react-toastify';

const AdminUser = () => {
    const [data, setData] = useState([]);
    async function fetchData() {
        try {
            let response = await fetch("http://localhost:5000/api/admin/contacts", {
                method: "Get",
                headers: {
                    "Authorization": localStorage.getItem("token"),
                },
                cache: 'default'
            });

            let res = await response.json();
            if (response.ok) {
                setData(res);
            }
            else {
                throw new Error(JSON.stringify(res) || "Error occurred");
            }
        } catch (error) {
            console.log('Error: ', error);
            let message = error.message || "";
            let errorMessageObject = JSON.parse(message);
            message = "";
            Object.entries(errorMessageObject).forEach(([key, value]) => {
                message += Object.keys(errorMessageObject).length > 1 ? value + ", " : value;
            });
            toast.error(message);
        }
    }

    useEffect(() => {
        try {
            console.log('Fetching data...');
            fetchData();
        } catch (error) {
            toast.error(error.message);
        }
    }, [])

    const handleClick = async (email) => {
        try {
            console.log(JSON.stringify({ email }));
            let response = await fetch("http://localhost:5000/api/admin//delete/contact", {
                method: "Delete",
                headers: {
                    "Authorization": localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
                cache: 'default'
            });
            let res = await response.json();
            if (response.ok) {
                toast.success(res.message);
                setData(data.filter((item) => item.email !== email));
            }
            else {
                throw new Error(res.message);
            }
            console.log('res: ', res);
        } catch (error) {
            console.log('Error: ', error);
            let message = error.message || "";
            let errorMessageObject = JSON.parse(message);
            message = "";
            Object.entries(errorMessageObject).forEach(([key, value]) => {
                message += Object.keys(errorMessageObject).length > 1 ? value + ", " : value;
            });
            toast.error(message);
        }
    }

    return (
        <div className="w-full h-full border-2 border-white p-2">
            <div className='grid grid-cols-4 justify-items-center'>
                {
                    data.map((item) => <AdminCard username={item.username} email={item.email} key={item._id} handleClick={handleClick} />)
                }
            </div>

        </div>
    )
}

export default AdminUser