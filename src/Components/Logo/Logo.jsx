import React from 'react';
import logoImg from '../../assets/logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return <div>
        <Link to={'/'}>
            <div className='flex items-end'>
                <img src={logoImg} alt="" />
                <h3 className='text-3xl font-bold -ms-2.5'>ZapShift</h3>
            </div>
        </Link>
    </div>
        ;
};

export default Logo;