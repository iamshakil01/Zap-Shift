import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [SearchParams] = useSearchParams();
    const sessionId = SearchParams.get('session_id');
    const [paymentInfo, setPaymentInfo] = useState({});
    const axiosSecure = useAxiosSecure()


    console.log(sessionId);

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data);
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId,

                    })
                })
        }

    }, [sessionId, axiosSecure])


    return (
        <div className='m-5 font-bold text-green-600'>
            <h2 className='text-4xl'>Payment Successful</h2>
            <p>Your Transaction Id: {paymentInfo.transactionId}</p>
            <p>Your Parcel Tracking Id: {paymentInfo.trackingId}</p>
        </div>
    );
};

export default PaymentSuccess;