"use client"

import React, { useRef, useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import Image from 'next/image';
import { GifPlayer } from './GifController';
import Link from 'next/link';

const TestCard = ({ name, color, index }) => {

  const [isHovered, setIsHovered] = useState(false);
  /*   const gifRef = useRef(null); */

  console.log(isHovered);

  /*   const togglePlay = () => {
      const gif = gifRef.current;
      if (gif) {
        if (isHovered) {
          gif.pause();
        } else {
          gif.play();
        }
        setIsHovered(!isHovered);
      }
    }; */

  return <>
    <Link href="/insrtructions">
      <div className={`w-72 h-72 rounded-lg p-6 flex flex-col justify-between text-white ${color} shadow-lg mx-4 mb-8 overflow-hidden transition-all duration-300 transform hover:scale-105 hover:translate-y-[-15px] hover:translate-x-[-5px] hover:shadow-2xl hover:shadow-black/60`}>
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <div className="flex items-center mt-2">
            <span className="bg-black text-white px-2 py-1 rounded-md text-xs">Graded by AI</span>
          </div>
        </div>
        <div className="text-center flex justify-end items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          {/* <Image
          src="/i4.png"
          width={200}
          height={200}
          /> */}
          {/* <GifPlayer gifUrl="/i4.gif" previewUrl="/i4.png" width={200} height={200} /> */}
          {isHovered ? <Image
            /* src={`/mock-${index}.gif`} */
            src="/i4.gif"
            alt="Your GIF"
            width={200}
            height={200}
            style={{ cursor: "pointer" }}
          /> : <Image
            /* src={`/static-mock-${index}.gif`} */
            src="/i6.gif"
            width={200}
            height={200}
          />}
          {/* <Image src="/i2.gif" width={200} height={200} /> */}
        </div>
      </div>
    </Link>
  </>
};

export default TestCard;
