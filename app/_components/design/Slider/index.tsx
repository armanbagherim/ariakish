'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, Scrollbar, A11y } from 'swiper/modules'
import { Swiper as SwiperType } from 'swiper'
import { useState, useRef } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2'

export interface SliderProps {
    children: React.ReactNode[]
    spaceBetween?: number
    slidesPerView?: number | 'auto'
    centeredSlides?: boolean
    loop?: boolean
    autoplay?: boolean | {
        delay: number
        disableOnInteraction?: boolean
        pauseOnMouseEnter?: boolean
    }
    navigation?: boolean | {
        nextEl?: string | HTMLElement
        prevEl?: string | HTMLElement
    }
    pagination?: boolean | {
        clickable?: boolean
        dynamicBullets?: boolean
    }
    scrollbar?: boolean | {
        draggable?: boolean
    }
    breakpoints?: Record<string, { spaceBetween?: number; slidesPerView?: number }>
    onSlideChange?: (swiper: SwiperType) => void
    onSwiper?: (swiper: SwiperType) => void
    className?: string
    slideClassName?: string
    allowTouchMove?: boolean
    resistance?: boolean
    resistanceRatio?: number
    watchSlidesProgress?: boolean
    watchSlidesVisibility?: boolean
    grabCursor?: boolean
    freeMode?: boolean
    speed?: number
    effect?: 'slide' | 'fade' | 'cube' | 'flip' | 'coverflow' | 'creative'
    direction?: 'horizontal' | 'vertical'
}

const Slider = ({
    children,
    spaceBetween = 0,
    slidesPerView = 1,
    centeredSlides = false,
    loop = false,
    autoplay = false,
    navigation = false,
    pagination = false,
    scrollbar = false,
    breakpoints,
    onSlideChange,
    onSwiper,
    className = '',
    slideClassName = '',
    allowTouchMove = true,
    resistance = true,
    resistanceRatio = 0.85,
    watchSlidesProgress = false,
    watchSlidesVisibility = false,
    grabCursor = false,
    freeMode = false,
    speed = 300,
    effect = 'slide',
    direction = 'horizontal'
}: SliderProps) => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)
    const prevRef = useRef<HTMLButtonElement>(null)
    const nextRef = useRef<HTMLButtonElement>(null)

    const modules = [Navigation, Pagination, Autoplay, Scrollbar, A11y]

    const swiperConfig = {
        spaceBetween,
        slidesPerView,
        centeredSlides,
        loop,
        autoplay: autoplay === true ? { delay: 3000 } : autoplay,
        navigation: navigation === true ? {
            prevEl: prevRef.current,
            nextEl: nextRef.current,
        } : navigation,
        pagination: pagination === true ? { clickable: true } : pagination,
        scrollbar: scrollbar === true ? { draggable: true } : scrollbar,
        breakpoints,
        onSlideChange,
        onSwiper: (swiper: SwiperType) => {
            setSwiperInstance(swiper)
            onSwiper?.(swiper)
        },
        allowTouchMove,
        resistance,
        resistanceRatio,
        watchSlidesProgress,
        watchSlidesVisibility,
        grabCursor,
        freeMode,
        speed,
        effect,
        direction,
        modules
    }

    return (
        <div dir="ltr" className={`relative ${className}`}>
            <Swiper {...swiperConfig}>
                {children.map((child, index) => (
                    <SwiperSlide key={index} className={slideClassName}>
                        {child}
                    </SwiperSlide>
                ))}
            </Swiper>

            {navigation === true && (
                <>
                    <button
                        ref={prevRef}
                        className="swiper-button-prev !absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
                        aria-label="Previous slide"
                    >
                        <HiArrowLeft size={10} />
                    </button>
                    <button
                        ref={nextRef}
                        className="swiper-button-next !absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
                        aria-label="Next slide"
                    >
                        <HiArrowRight size={10} />
                    </button>
                </>
            )}
        </div>
    )
}

export default Slider