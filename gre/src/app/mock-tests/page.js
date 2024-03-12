import VegetableCards from '@/components/VegetableCards'
import { SwipeCarousel } from '@/components/sections/SwipeCarousel'
import React from 'react'

const page = () => {
  return (
    <div>
        <SwipeCarousel />
        <VegetableCards />
    </div>
  )
}

export default page