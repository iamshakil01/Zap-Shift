import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from 'sweetalert2';

const UsersManagement = () => {

    const axiosSecure = useAxiosSecure()

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['/users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    })

    const handleMakeUser = (user) => {
        // Must ask for confirmation before make him admin
        const roleInfo = { role: 'admin' }
        axiosSecure.patch(`/users/${user._id}`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName} Marked As Admin`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            })
    }


    const handleRemoveAdmin = (user) => {
         // Must ask for confirmation before remove him from admin
        const roleInfo = { role: 'user' }
        axiosSecure.patch(`/users/${user._id}`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName} Remove From Admin`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            })
    }



    return (
        <div>
            <h2 className="text-4xl font-bold m-5">Manage Users: {users.length}</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Action</th>
                            <th>Others</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => <tr key={user._id}>
                            <th>
                                {index + 1}
                            </th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={user.photoURL}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{user.displayName}</div>
                                        <div className="text-sm opacity-50">United States</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {user.email}
                            </td>
                            <td>
                                {user.role}
                            </td>
                            <td>
                                {user.role === 'admin' ? <button onClick={() => handleRemoveAdmin(user)} className='btn bg-red-400'> <FiShieldOff /> </button> : <button className='bg-green-500 w-12 h-10 px-4'
                                onClick={() => handleMakeUser(user)}><FaUserShield /> </button>

                                }
                            </td>
                            <td>Purple</td>
                            <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th>
                        </tr>)}

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default UsersManagement;