import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import amazon from '../../../assets/brands/amazon.png'
import vector from '../../../assets/brands/amazon_vector.png'
import casio from '../../../assets/brands/casio.png'
import moonStar from '../../../assets/brands/moonstar.png'
import randstad from '../../../assets/brands/randstad.png'
import star from '../../../assets/brands/star.png'
import starPeople from '../../../assets/brands/start_people.png'
import { Autoplay } from 'swiper/modules';

const brandLogos = [amazon, vector, casio, moonStar, randstad, star, starPeople]

const Brands = () => {

    return (
        <Swiper className='my-10'
            slidesPerView={4}
            centeredSlides={true}
            spaceBetween={30}
            grabCursor={true}
            modules={[Autoplay]}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
        >
            {
                brandLogos.map((logo, index) => <SwiperSlide key={index}>
                    <img src={logo} alt="" />
                </SwiperSlide>)
            }

        </Swiper>
    );
};

export default Brands;