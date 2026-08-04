'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

export interface Slide {
  _id: string
  title: string
  subtitle: string
  description: string
  image: string
  ctaText: string
  ctaLink: string
}

export function HeroSlider({ slides }: { slides: Slide[] }) {
  if (!slides || slides.length === 0) {
    return null
  }

  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      effect="fade"
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{
        clickable: true,
        bulletActiveClass: 'swiper-pagination-bullet-active !bg-white',
      }}
      navigation={false}
      loop={true}
      className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={slide._id}>
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
              quality={90}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                {slide.subtitle && (
                  <p className="text-gold-300 font-semibold text-xs sm:text-sm md:text-base uppercase tracking-widest mb-2 sm:mb-4">
                    {slide.subtitle}
                  </p>
                )}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4 leading-tight">
                  {slide.title}
                </h1>
                {slide.description && (
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90 max-w-2xl mx-auto mb-4 sm:mb-6 md:mb-8 leading-relaxed">
                    {slide.description}
                  </p>
                )}
                <Link
                  href={slide.ctaLink}
                  className="inline-block bg-gold-500 hover:bg-gold-600 text-white px-5 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  {slide.ctaText}
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}