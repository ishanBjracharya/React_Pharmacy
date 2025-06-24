"use client"

import React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"

const slides = [
  {
    src: "/silder.png",
    caption: "Cough Syrup - Soothes your throat",
  },
  {
    src: "/slider1.png",
    caption: "Relief from cough symptoms",
  },
  {
    src: "/slider3.png",
    caption: "Vitamin C - Boost your immunity",
  },
]

export default function Slider() {
  return (
    <div className="w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="w-full"
      >
        {slides.map(({ src, caption }, idx) => (
       <SwiperSlide key={idx}>
  <div className="relative w-full h-[300px] sm:h-[500px] flex justify-center items-center">
    <Image
      src={src}
      alt={caption}
      className="rounded-md"
      fill
      priority={idx === 0}
      quality={100}
    
    />
    <div className="absolute bottom-4 left-0 right-0 bg-white bg-opacity-70 text-slate-800 p-2 text-center text-base font-medium">
      {caption}
    </div>
  </div>
</SwiperSlide>


        ))}
      </Swiper>
    </div>
  )
}
