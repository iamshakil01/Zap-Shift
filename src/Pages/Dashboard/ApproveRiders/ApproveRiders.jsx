import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrashCan, FaUserCheck } from 'react-icons/fa6';
import { IoPersonRemoveSharp } from "react-icons/io5";
import { MdPreview } from "react-icons/md";
import Swal from 'sweetalert2';

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: riders = [] } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    })

    const updateRiderStatus = (rider, status) => {
        const updateInfo = { status: status, email: rider.email }
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: ` Rider Status Is Set To ${status}.`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            })
    }

    const handleApproval = rider => {
        updateRiderStatus(rider, 'approved')
    }

    const handleRejection = (rider) => {
        updateRiderStatus(rider, 'rejected')
    }

    return (
        <div>
            <h2 className="text-4xl text-secondary m-5 font-bold">Approve Pending Riders:{riders.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>District</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            riders.map((rider, index) => <tr key={rider._id}>
                                <th>{index + 1}</th>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>
                                    <p className={`${rider.status === 'approved' ? 'text-green-700' : 'text-red-700'}`}>{rider.status}</p></td>
                                <td>{rider.district}</td>
                                <td>
                                    <button onClick={() => handleApproval(rider)} className='btn'><FaUserCheck></FaUserCheck></button>

                                    <button className='btn mx-5'><FaTrashCan></FaTrashCan></button>


                                    <button className='btn mx-5'><MdPreview /></button>


                                    <button onClick={() => handleRejection(rider)} className='btn'> <IoPersonRemoveSharp /> </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveRiders;