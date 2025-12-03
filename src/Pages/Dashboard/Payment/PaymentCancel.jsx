import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div className='m-5'>
            <h2>Cancel Your Payment. Please Try Again </h2>
            <Link to={'/dashboard/my-parcels'}>
                <button className='btn btn-primary text-black'>Try Again</button>
            </Link>
        </div>
    );
};

export default PaymentCancel;