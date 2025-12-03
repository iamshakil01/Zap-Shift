import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const Rider = () => {
    const { register,
        handleSubmit,
        control,
        // formState: { errors }
    } = useForm();


    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();


    const serviceCenters = useLoaderData();
    const regionsDuplicates = serviceCenters.map(c => c.region);
    const regions = [...new Set(regionsDuplicates)];

    const districtsByRegion = region => {
        const regionDistricts = serviceCenters.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district)
        return districts
    }
    const riderRegion = useWatch({ control, name: 'region' })


    const handleRiderApplication = (data => {
        axiosSecure.post('/riders', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Application Has Been Submitted!",
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            })
    })


    return (
        <div>
            <h2 className="text-4xl text-primary">Be A Rider</h2>

            <form onSubmit={handleSubmit(handleRiderApplication)} className='mt-12 p-5 text-black'>


                {/* Two column */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    {/* sender info */}
                    <div>
                        <h2 className='text-2xl font-semibold'>Rider Details</h2>

                        {/* Rider Name */}
                        <fieldset className="fieldset">
                            <label className="label">Rider Name</label>
                            <input type="text" {...register('name')}
                                defaultValue={user?.displayName}
                                className="input w-full" placeholder="Rider Name" />
                        </fieldset>

                        {/* Rider Email */}
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input type="text" {...register('email')}
                                defaultValue={user?.email}
                                className="input w-full" placeholder="Sender Email" />
                        </fieldset>

                        {/* Address */}
                        <fieldset className="fieldset">
                            <label className="label">Address</label>
                            <input type="text" {...register('address')}
                                className="input w-full" placeholder="Address" />
                        </fieldset>


                        {/* Region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Region</legend>
                            <select {...register('region')} defaultValue="Select Your Region"
                                className="select">
                                <option disabled={true}>Select Your Region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        {/* Districts */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">District</legend>
                            <select {...register('district')} defaultValue="Select Your district"
                                className="select">
                                <option disabled={true}>Pick Your district</option>
                                {
                                    districtsByRegion(riderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>
                    </div>


                    {/* More Information */}
                    <div>
                        <h2 className='text-2xl font-semibold'>More Details</h2>

                        {/* Driving License */}
                        <fieldset className="fieldset">
                            <label className="label">Driving License</label>
                            <input type="text" {...register('license')}
                                className="input w-full" placeholder="Driving License" />
                        </fieldset>


                        {/* Bike Info */}
                        <fieldset className="fieldset">
                            <label className="label">Bike Info</label>
                            <input type="text" {...register('bike')}
                                className="input w-full" placeholder="Bike Info" />
                        </fieldset>


                        {/* NID */}
                        <fieldset className="fieldset">
                            <label className="label">NID</label>
                            <input type="text" {...register('nid')}
                                className="input w-full" placeholder="Nid" />
                        </fieldset>

                        {/* Phone Number */}
                        <fieldset className="fieldset">
                            <label className="label">Phone Number</label>
                            <input type="text" {...register('phoneNumber')}
                                className="input w-full" placeholder="Phone Number" />
                        </fieldset>
                    </div>
                </div>
                <input type="submit" className='btn btn-primary text-black mt-5' value="Apply as a Rider" />
            </form>
        </div>
    );
};

export default Rider;