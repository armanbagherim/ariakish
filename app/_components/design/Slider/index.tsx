'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Scrollbar, A11y } from 'swiper/modules'
import { Swiper as SwiperType } from 'swiper'
import { useState, useRef, useEffect } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'

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
    autoHeight?: boolean
    // ما این prop را برای نمایش یا عدم نمایش دکمه‌های سفارشی نگه می‌داریم
    navigation?: boolean 
}

const Slider = ({
    children,
    spaceBetween = 0,
    slidesPerView = 1,
    centeredSlides = false,
    loop = false,
    autoplay = false,
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
    direction = 'horizontal',
    autoHeight = false,
    navigation = true, // به طور پیش‌فرض دکمه‌ها را نشان می‌دهیم
}: SliderProps) => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)
    const [isBeginning, setIsBeginning] = useState(true)
    const [isEnd, setIsEnd] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    // ماژول Navigation را دیگر نیازی نداریم
    const modules = [Pagination, Autoplay, Scrollbar, A11y]

    const swiperConfig = {
        spaceBetween,
        slidesPerView,
        centeredSlides,
        loop,
        autoplay: autoplay === true ? { delay: 3000 } : autoplay,
        // prop navigation را حذف می‌کنیم چون خودمان آن را پیاده‌سازی می‌کنیم
        pagination: pagination === true ? { clickable: true } : pagination,
        scrollbar: scrollbar === true ? { draggable: true } : scrollbar,
        breakpoints,
        onSlideChange: (swiper: SwiperType) => {
            // وضعیت دکمه‌ها را با هر تغییر اسلاید آپدیت می‌کنیم
            setIsBeginning(swiper.isBeginning)
            setIsEnd(swiper.isEnd)
            onSlideChange?.(swiper)
        },
        onSwiper: (swiper: SwiperType) => {
            setSwiperInstance(swiper)
            // وضعیت اولیه دکمه‌ها را تنظیم می‌کنیم
            setIsBeginning(swiper.isBeginning)
            setIsEnd(swiper.isEnd)
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
        autoHeight,
        modules
    }

    // استایل پایه برای دکمه‌های ما
    const navButtonClass = `
        absolute top-1/2 -translate-y-1/2 z-10 w-12 h-12 
        flex items-center justify-center 
        bg-white/20 backdrop-blur-md border border-white/30 
        text-white rounded-full 
        transition-all duration-300 ease-in-out
        ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
    `

    return (
        <div 
            dir="ltr" 
            className={`relative group ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Swiper {...swiperConfig}>
                {children.map((child, index) => (
                    <SwiperSlide key={index} className={slideClassName}>
                        {child}
                    </SwiperSlide>
                ))}
            </Swiper>

            {navigation && (
                <>
                    <button
                        className={`${navButtonClass} left-4`}
                        onClick={() => swiperInstance?.slidePrev()}
                        disabled={isBeginning}
                        aria-label="Previous slide"
                        style={{
                            pointerEvents: isBeginning ? 'none' : 'auto', // جلوگیری از کلیک در حالت غیرفعال
                            cursor: isBeginning ? 'not-allowed' : 'pointer',
                            opacity: isBeginning ? 0.5 : (isHovered ? 1 : 0), // شفافیت کمتر در حالت غیرفعال
                        }}
                    >
                        <HiChevronLeft size={24} />
                    </button>
                    <button
                        className={`${navButtonClass} right-4`}
                        onClick={() => swiperInstance?.slideNext()}
                        disabled={isEnd}
                        aria-label="Next slide"
                        style={{
                            pointerEvents: isEnd ? 'none' : 'auto',
                            cursor: isEnd ? 'not-allowed' : 'pointer',
                            opacity: isEnd ? 0.5 : (isHovered ? 1 : 0),
                        }}
                    >
                        <HiChevronRight size={24} />
                    </button>
                </>
            )}
        </div>
    )
}

export default Slider