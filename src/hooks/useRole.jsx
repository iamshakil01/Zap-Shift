import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { isLoading, data: role = 'user' } = useQuery({
        queryKey: ['/users-role', user?.role],
        queryFn: async () => {
            const res = await axiosSecure.get(`'/users/${user.amail}/role`)
            return res.data;
        }
    })

    return { role, isLoading };
};

export default useRole;