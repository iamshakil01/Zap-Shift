import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Payment = () => {

    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();
    const { isLoading, data: parcel } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })


    if (isLoading) {
        return <div>
            <span className="loading loading-spinner loading-xl"></span>
        </div>
    };


    const handlePayment = async () => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.ParcelName
        }
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        console.log(res.data);
        window.location.href = res.data.url;
    }


    return (
        <div className='m-5'>
            <h2>Please Pay <span className='font-bold'>${parcel.cost}</span> For: {parcel.ParcelName}</h2>
            <button onClick={handlePayment} className='btn btn-primary text-black my-2'>Pay</button>
        </div>
    );
};

export default Payment;