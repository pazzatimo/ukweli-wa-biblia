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
    title: 'Imani',
    subtitle: 'Warumi 10:17',
    description: 'Basi imani, chanzo chake ni kusikia; na kusikia huja kwa neno la Kristo.',
    image: '/images/hero-1.jpg',
    ctaText: 'Soma Makala',
    ctaLink: '/makala',
  },
  {
    id: 2,
    title: 'Wokovu',
    subtitle: 'Je umeokolewa?',
    description: 'Wokovu ni zawadi ya bure ya Mungu, inayopokelewa kwa njia ya imani katika Yesu Kristo si kwa matendo, taratibu za kidini, au sifa fulani. ',
    image: '/images/hero-2.jpg',
    ctaText: 'Sikiliza Mahubiri',
    ctaLink: '/mahubiri',
  },
  {
    id: 3,
    title: 'Imani moja',
    subtitle: 'Waefeso 4:5',
    description: 'Bwana mmoja, imani moja, ubatizo mmoja.',
    image: '/images/hero-3.jpg',
    ctaText: 'Wasiliana Nasi',
    ctaLink: '/wasiliana',
  },
  {
    id: 4,
    title: 'Ukweli Wa Biblia Uliorejeshwa',
    subtitle: 'Malaki 4:5-6',
    description: '5. Angalieni, nitawapelekea Eliya nabii, kabla haijaja siku ile ya Bwana, iliyo kuu na kuogofya. 6 Naye ataigeuza mioyo ya baba iwaelekee watoto, na mioyo ya watoto iwaelekee baba zao, ili nisije nikaipiga dunia kwa laana.',
    image: '/images/hero-4.jpg',
    ctaText: 'Soma Makala',
    ctaLink: '/makala',
  },
  {
    id: 5,
    title: 'Mungu Mmoja',
    subtitle: 'Waebrania 13:8',
    description: 'Yesu Kristo ni yeye yule jana na hata milele',
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