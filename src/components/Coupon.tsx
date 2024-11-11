'use client'
import Image from 'next/image'
import { Tilt } from 'react-tilt'
import Cookies from 'js-cookie'

export const Coupon = () => {
  const surveyUUID = Cookies.get('surveyUUID')
  return (
    <Tilt style={{ transformStyle: "preserve-3d" }} className="transition-all duration-500 ease-out relative">
      <div className="absolute bottom-3 w-full text-center text-black uppercase font-bold font-oswald text-sm">{ surveyUUID || 'Without Number' }</div>
      <div className="absolute bottom-28 w-full text-center text-black uppercase font-oswald text-sm">Valid until: 12/31/2025</div>
      <Image src="/images/coupon.webp" width="300" height="500" alt="25% OFF Coupon" />
    </Tilt>
  )
}