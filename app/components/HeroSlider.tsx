'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

// Add or remove slides here to match your images
const slides = [
  {
    id: 1,
    title: 'Ukweli Wa Biblia',
    subtitle: 'Kutangaza Neno la Mungu kwa uaminifu',
    description: 'Kanisa linalojitolea katika uinjilisti, kufundisha Neno, na kuweka imani katika Kristo.',
    image: '/images/hero-1.jpg',
    ctaText: 'Soma Makala',
    ctaLink: '/makala',
  },
  {
    id: 2,
    title: 'Neno Linalobadilisha Maisha',
    subtitle: 'Fundisho la Kimaandiko',
    description: 'Jiunge nasi katika kujifunza Neno la Mungu na kupata mwongozo wa maisha.',
    image: '/images/hero-2.jpg',
    ctaText: 'Sikiliza Mahubiri',
    ctaLink: '/mahubiri',
  },
  {
    id: 3,
    title: 'Umoja katika Kristo',
    subtitle: 'Familia ya Imani',
    description: 'Tunakukaribisha katika familia yetu ya imani, pamoja tunakua katika neema.',
    image: '/images/hero-3.jpg',
    ctaText: 'Wasiliana Nasi',
    ctaLink: '/wasiliana',
  },
  {
    id: 4,
    title: 'Ibada ya Kweli',
    subtitle: 'Kumwabudu Mungu kwa Roho na Kweli',
    description: 'Kanisa linaloabudu kwa nguvu zote na kuheshimu Neno la Mungu.',
    image: '/images/hero-4.jpg',
    ctaText: 'Soma Makala',
    ctaLink: '/makala',
  },
  {
    id: 5,
    title: 'Furaha ya Wokovu',
    subtitle: 'Uzima wa Milele katika Kristo',
    description: 'Tuna furaha kubwa kukutana nawe na kushiriki neema ya Mungu.',
    image: '/images/hero-5.jpg',
    ctaText: 'Jiunge Nasi',
    ctaLink: '/wasiliana',
  },
]

export function HeroSlider() {
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
      className="w-full h-[600px] md:h-[700px]"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-primary-800">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={slide.id === 1}
                className="object-cover"
                sizes="100vw"
                quality={90}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-white">
                  <p className="text-gold-300 font-semibold text-sm md:text-base uppercase tracking-widest mb-4">
                    {slide.subtitle}
                  </p>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl opacity-90 max-w-2xl mb-8 leading-relaxed">
                    {slide.description}
                  </p>
                  <Link
                    href={slide.ctaLink}
                    className="inline-block bg-gold-500 hover:bg-gold-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {slide.ctaText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}