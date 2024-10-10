// components/Carousel.js
import React from 'react';
import Slider from 'react-slick';
import { Box } from '@chakra-ui/react';
import CarouselItem from './CarouselItem'; // Import CarouselItem.js

const Carousel = () => {
  // Data carousel yang sebelumnya kamu berikan
  const carouselItems = [
    {
      image: 'https://via.placeholder.com/800x400',
      alt: 'Donor Darah 1',
      title: 'Ayo Donor Darah!',
      description: 'Menyumbangkan darah adalah tindakan yang mulia untuk membantu sesama.',
      buttonLabel: 'Pelajari Lebih Lanjut',
      onButtonClick: () => alert('Pelajari lebih lanjut tentang donor darah!'),
    },
    {
      image: 'https://via.placeholder.com/800x400',
      alt: 'Donor Darah 2',
      title: 'Selamatkan Nyawa',
      description: 'Dengan setetes darah, Anda dapat menyelamatkan nyawa seseorang.',
      buttonLabel: 'Donor Sekarang',
      onButtonClick: () => alert('Donor sekarang!'),
    },
    {
      image: 'https://via.placeholder.com/800x400',
      alt: 'Donor Darah 3',
      title: 'Donor Darah Teratur',
      description: 'Donor darah tidak hanya bermanfaat bagi penerima, tetapi juga bagi kesehatan pendonor.',
      buttonLabel: 'Mulai Donor',
      onButtonClick: () => alert('Mulai donor sekarang!'),
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box w="80%" mx="auto" mt={4}>
      <Slider {...settings}>
        {carouselItems.map((item, index) => (
          <CarouselItem
            key={index}
            image={item.image}
            alt={item.alt}
            title={item.title}
            description={item.description}
            buttonLabel={item.buttonLabel}
            onButtonClick={item.onButtonClick}
          />
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
