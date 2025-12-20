import Slider from './index'
import Image from 'next/image'

const HeroSlider = () => {
    const sliderImages = [
        '/slider/home1.jpg',
        '/slider/home2.jpg',
        '/slider/home3.jpg',
        '/slider/home4.jpg',
        '/slider/home5.jpg',
        '/slider/home6.jpg',
        '/slider/home7.jpg',
        '/slider/home8.jpg',
        '/slider/home9.jpg'
    ]

    return (
        <Slider
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            }}
            navigation={true}
            loop={true}
            effect="slide"
            speed={800}
            className="md:h-[600px] rounded-2xl overflow-hidden"
            slideClassName="h-full"
        >
            {sliderImages.map((imageSrc, index) => (
                <div key={index} className="relative h-full">
                    <Image
                        src={imageSrc}
                        alt={`Hero slide ${index + 1}`}
                        width={0}
                        height={0}
                        sizes='100vw'
                        style={{ width: '100%', height: 'auto' }} // optional

                        className="object-cover"
                        priority={index === 0}
                    />
                </div>
            ))}
        </Slider>
    )
}

export default HeroSlider
