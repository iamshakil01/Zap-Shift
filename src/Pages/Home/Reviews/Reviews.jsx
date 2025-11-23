import React, { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from './ReviewCard';

const Reviews = ({ reviewsPromise }) => {
    const reviews = use(reviewsPromise)

    return (
        <div className='my-24'>
            <div className='text-center mb-24'>
                <h3 className='text-3xl text-center font-bold my-8'>Reviews</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aliquid officia illo enim provident quasi adipisci? Praesentium error quo minima voluptatibus dolor doloremque, corporis dolorum, dolore vero ab temporibus a quaerat reiciendis nam vel! Earum, hic. Perspiciatis voluptates ab aut totam cumque ad, eaque officiis necessitatibus nostrum perferendis amet veritatis!</p>
            </div>
            <Swiper
                loop={true}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                coverflowEffect={{
                    rotate: 30,
                    stretch: '50%',
                    depth: 200,
                    scale: 0.75,
                    modifier: 1,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper"
            >
                {
                    reviews.map((reviews) => <SwiperSlide key={reviews.id}>
                        <ReviewCard reviews={reviews}></ReviewCard>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Reviews;