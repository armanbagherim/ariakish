import Slider from './index'
import Image from 'next/image'

const HeroSlider = () => {
    const sliderImages = [
        '/slider/home1.jpg',
        '/slider/home3.jpg',
        '/slider/home4.jpg',
        '/slider/home5.jpg',
        '/slider/home6.jpg',
        '/slider/home9.jpg',
    ]

    return (
        <Slider
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            }}
            // حذف autoHeight برای کنترل دقیق ارتفاع
            navigation={true}
            loop={true}
            effect="slide"
            speed={800}
            // استفاده از aspect ratio برای دسکتاپ و موبایل
            className="w-full aspect-[2/1] md:aspect-[21/9] lg:max-h-[400px] rounded-3xl  overflow-hidden shadow-lg"
            slideClassName="h-full"
        >
            {sliderImages.map((imageSrc, index) => (
                <div key={index} className="relative w-full h-full">
                    <Image
                        src={imageSrc}
                        alt={`Hero slide ${index + 1}`}
                        // برگشت به متد عرض ۱۰۰٪ اما با کنترل ارتفاع در والد
                        width={1920}
                        height={1080}
                        sizes="100vw"
                        // این بخش جادویی کار است:
                        className="w-full h-full object-cover object-center"
                        priority={index === 0}
                    />
                </div>
            ))}
        </Slider>
    )
}

export default HeroSlider