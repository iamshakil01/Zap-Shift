import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const SendParcel = () => {

    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const serviceCenters = useLoaderData();
    const regionsDuplicates = serviceCenters.map(c => c.region);
    const regions = [...new Set(regionsDuplicates)];
    const senderRegion = useWatch({ control, name: 'senderRegion' })
    const receiverRegion = useWatch({ control, name: 'receiverRegion' })

    const districtsByRegion = region => {
        const regionDistricts = serviceCenters.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district)
        return districts
    }


    const handleSendParcel = (data) => {
        const isDocument = data.parcelType === 'document';
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        const parcelWeight = parseFloat(data.parcelWeight);


        let cost = 0;
        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;
        }
        else {
            if (parcelWeight < 3) {
                cost = isSameDistrict ? 110 : 150;
            }
            {
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
                cost = minCharge + extraCharge;
            }
        }

        console.log(cost)
        Swal.fire({
            title: "Are you agree with the cost?",
            text: `You will be charged ${cost} taka !`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes,"
        }).then((result) => {
            if (result.isConfirmed) {
                // Swal.fire({
                //     title: "Deleted!",
                //     text: "Your file has been deleted.",
                //     icon: "success"
                // });
            }
        });

    }
    return (
        <div>
            <h2 className="text-5xl font-bold">Send A Parcel</h2>
            <form onSubmit={handleSubmit(handleSendParcel)} className='mt-12 p-5 text-black'>
                {/* document */}
                <div>
                    <label className='label mr-10'>
                        <input type="radio" {...register('parcelType')} value="document" className="radio" defaultChecked />
                        Document
                    </label>
                    <label className='label'>
                        <input type="radio" {...register('parcelType')} value="non-document" className="radio" />
                        Non-Document
                    </label>
                </div>

                {/* Parcel info: name weight */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-6'>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text" {...register('ParcelName')}
                            className="input w-full" placeholder="sender Name" />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight (kg)</label>
                        <input type="text" {...register('parcelWeight')}
                            className="input w-full" placeholder="Parcel Weight" />
                    </fieldset>

                </div>




                {/* Two column */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    {/* sender info */}
                    <div>
                        <h2 className='text-2xl font-semibold'>Sender Details</h2>

                        {/* Sender Name */}
                        <fieldset className="fieldset">
                            <label className="label">Sender Name</label>
                            <input type="text" {...register('senderName')}
                                className="input w-full" placeholder="Sender Name" />
                        </fieldset>

                        {/* Sender Email */}
                        <fieldset className="fieldset">
                            <label className="label">Sender Email</label>
                            <input type="text" {...register('senderEmail')}
                                className="input w-full" placeholder="Sender Email" />
                        </fieldset>

                        {/* Address */}
                        <fieldset className="fieldset">
                            <label className="label">Address</label>
                            <input type="text" {...register('SenderAddress')}
                                className="input w-full" placeholder="address" />
                        </fieldset>

                        {/* Phone Number */}
                        <fieldset className="fieldset">
                            <label className="label">Sender Phone Number</label>
                            <input type="text" {...register('phoneNumber')}
                                className="input w-full" placeholder="Phone Number" />
                        </fieldset>

                        {/* Region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Your Region</legend>
                            <select {...register('senderRegion')} defaultValue="Select Your Region"
                                className="select">
                                <option disabled={true}>Select Your Region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        {/* Districts */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Your District</legend>
                            <select {...register('senderDistrict')} defaultValue="Select Your district"
                                className="select">
                                <option disabled={true}>Select Your district</option>
                                {
                                    districtsByRegion(senderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>
                    </div>



                    {/* receiver info */}
                    <div>
                        <h2 className='text-2xl font-semibold'>Receiver Details</h2>

                        {/* Receiver Name */}
                        <fieldset className="fieldset">
                            <label className="label">Receiver Name</label>
                            <input type="text" {...register('receiverName')}
                                className="input w-full" placeholder="Receiver Name" />
                        </fieldset>

                        {/* Receiver Email */}
                        <fieldset className="fieldset">
                            <label className="label">Receiver Email</label>
                            <input type="text" {...register('ReceiverEmail')}
                                className="input w-full" placeholder="Receiver Email" />
                        </fieldset>

                        {/* Receiver Address */}
                        <fieldset className="fieldset">
                            <label className="label">Address</label>
                            <input type="text" {...register('ReceiverAddress')}
                                className="input w-full" placeholder="address" />
                        </fieldset>

                        {/* Phone Number */}
                        <fieldset className="fieldset">
                            <label className="label">Sender Phone Number</label>
                            <input type="text" {...register('phoneNumber')}
                                className="input w-full" placeholder="Phone Number" />
                        </fieldset>


                        {/*Receiver Region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Your Region</legend>
                            <select {...register('receiverRegion')} defaultValue="Select Your Region"
                                className="select">
                                <option disabled={true}>Select Your Region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>



                        {/*Receiver District */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Your District</legend>
                            <select {...register('receiverDistrict')} defaultValue="Select Your District"
                                className="select">
                                <option disabled={true}>Select Your District</option>
                                {
                                    districtsByRegion(receiverRegion).map((d, i) => <option key={i} value={d}>{d}</option>)
                                }
                            </select>
                        </fieldset>
                    </div>
                </div>
                <input type="submit" className='btn btn-primary text-black mt-5' value="Send Parcel" />
            </form>
        </div>
    );
};

export default SendParcel;