import React from 'react';
import Logo from '../Components/Logo/Logo';
import { Outlet } from 'react-router';
import authImg from '../assets/authImage.png'

const AuthLayout = () => {
    return (
        <div className=''>
            <Logo></Logo>
            <div className='flex items-center border mt-20 p-5'>
                <div className='flex-2'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1'>
                    <img src={authImg} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;