import Slider from './index'

// Example 1: Basic slider with navigation
export const BasicSlider = () => {
    return (
        <Slider
            navigation={true}
            spaceBetween={20}
            slidesPerView={1}
            className="w-full max-w-4xl mx-auto"
        >
            <div className="bg-blue-500 h-64 rounded-lg flex items-center justify-center text-white text-2xl">
                Slide 1
            </div>
            <div className="bg-green-500 h-64 rounded-lg flex items-center justify-center text-white text-2xl">
                Slide 2
            </div>
            <div className="bg-purple-500 h-64 rounded-lg flex items-center justify-center text-white text-2xl">
                Slide 3
            </div>
        </Slider>
    )
}

// Example 2: Auto-playing carousel with pagination
export const AutoPlaySlider = () => {
    return (
        <Slider
            autoplay={true}
            pagination={true}
            spaceBetween={10}
            slidesPerView={3}
            loop={true}
            centeredSlides={true}
            breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }}
            className="w-full max-w-6xl mx-auto"
        >
            <div className="bg-red-400 h-48 rounded-lg flex items-center justify-center text-white">
                Auto Slide 1
            </div>
            <div className="bg-yellow-400 h-48 rounded-lg flex items-center justify-center text-white">
                Auto Slide 2
            </div>
            <div className="bg-indigo-400 h-48 rounded-lg flex items-center justify-center text-white">
                Auto Slide 3
            </div>
            <div className="bg-pink-400 h-48 rounded-lg flex items-center justify-center text-white">
                Auto Slide 4
            </div>
        </Slider>
    )
}

// Example 3: Free mode draggable slider
export const FreeModeSlider = () => {
    return (
        <Slider
            freeMode={true}
            grabCursor={true}
            spaceBetween={15}
            slidesPerView={'auto'}
            scrollbar={true}
            className="w-full max-w-4xl mx-auto"
        >
            <div className="bg-teal-500 w-64 h-32 rounded-lg flex items-center justify-center text-white shrink-0">
                Free Slide 1
            </div>
            <div className="bg-orange-500 w-48 h-32 rounded-lg flex items-center justify-center text-white shrink-0">
                Free Slide 2
            </div>
            <div className="bg-cyan-500 w-56 h-32 rounded-lg flex items-center justify-center text-white shrink-0">
                Free Slide 3
            </div>
            <div className="bg-lime-500 w-72 h-32 rounded-lg flex items-center justify-center text-white shrink-0">
                Free Slide 4
            </div>
            <div className="bg-emerald-500 w-52 h-32 rounded-lg flex items-center justify-center text-white shrink-0">
                Free Slide 5
            </div>
        </Slider>
    )
}

// Example 4: Fade effect slider
export const FadeSlider = () => {
    return (
        <Slider
            effect="fade"
            navigation={true}
            pagination={true}
            loop={true}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false
            }}
            className="w-full max-w-2xl mx-auto h-96"
        >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-full rounded-lg flex items-center justify-center text-white text-3xl">
                Fade Slide 1
            </div>
            <div className="bg-gradient-to-r from-green-600 to-teal-600 h-full rounded-lg flex items-center justify-center text-white text-3xl">
                Fade Slide 2
            </div>
            <div className="bg-gradient-to-r from-red-600 to-orange-600 h-full rounded-lg flex items-center justify-center text-white text-3xl">
                Fade Slide 3
            </div>
        </Slider>
    )
}
