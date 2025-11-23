import React from 'react';
import { useForm } from 'react-hook-form';

const SendParcel = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleSendParcel = (data) => {
        console.log(data)
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
                        <input type="text" {...register('senderName')}
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
                        <fieldset className="fieldset">
                            <label className="label">Sender Name</label>
                            <input type="text" {...register('senderName')}
                                className="input w-full" placeholder="Sender Name" />
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label">Address</label>
                            <input type="text" {...register('address')}
                                className="input w-full" placeholder="address" />
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label">Sender Phone Number</label>
                            <input type="text" {...register('phoneNumber')}
                                className="input w-full" placeholder="Phone Number" />
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label">Your District</label>
                            <input type="text" {...register('district')}
                                className="input w-full" placeholder="Sender Name" />
                        </fieldset>
                    </div>



                    {/* receiver info */}
                    <div>
                        <h2 className='text-2xl font-semibold'>Receiver Details</h2>
                        <fieldset className="fieldset">
                            <label className="label">Receiver Name</label>
                            <input type="text" {...register('receiverName')}
                                className="input w-full" placeholder="Receiver Name" />
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label">Receiver Address</label>
                            <input type="text" {...register('receiverAddress')}
                                className="input w-full" placeholder="Address" />
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label">Receiver Contact Number</label>
                            <input type="number" {...register('receiverNumber')}
                                className="input w-full" placeholder="Receiver Contact Number" />
                        </fieldset>
                    </div>
                </div>
                <input type="submit" className='btn btn-primary text-black' value="send parcel" />
            </form>
        </div>
    );
};

export default SendParcel;