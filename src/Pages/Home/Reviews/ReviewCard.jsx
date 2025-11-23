import React from 'react';

const ReviewCard = ({ reviews }) => {
    const { userName, review, user_email, user_photoURL } = reviews;

    return (
        <div className="max-w-sm p-6 rounded-xl bg-[#FFFFFF] shadow-md border border-pink-100 my-10">
            {/* Quote Icon */}
            <div className="text-3xl text-green-400 mb-2">
                &ldquo;
            </div>

            {/* Content */}
            <p className="mb-4">
                {review}
            </p>

            {/* Divider */}
            <div className="border-t border-dashed border-gray-300 my-4"></div>

            {/* Profile Section */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary">
                    <img src={user_photoURL} alt="" />
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900">{userName}</h3>
                    <p className="text-xs text-gray-500">{user_email}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;