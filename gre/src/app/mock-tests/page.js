import MockTestCard from "@/components/MockTestCard";
import VegetableCards from "@/components/VegetableCards";
import { SwipeCarousel } from "@/components/sections/SwipeCarousel";
import { Button } from "@/components/ui/button";
import React from "react";
import Image from 'next/image'
import Footer from "@/components/Footer";
import Navbar from "@/components/sections/Navbar";
import RemainingCards from "@/components/RemainingCardsCaller";

const page = () => {

  return (
    <div>
      <Navbar />
      <div class="h-[300px] w-[80%] mx-auto flex items-center bg-gradient-to-l from-primary via-secondary to-tertiary text-text p-8 rounded-lg">
        <div class="w-[55%]">
          <h1 class="text-4xl font-bold mb-4 text-white">About GRE Mock Test</h1>
          <p class="text-lg text-white">
            Learn, practice, and excel with our GRE mock tests at MJ Academy.
            Prepare for success!
          </p>
        </div>
        <div class="w-1/3 ml-8">
          <Image
            src="/gre4.jpeg"
            width={200}
            height={200}
            alt="GRE Mock Test Image"
            class="w-full object-cover rounded-md"
          />
        </div>
      </div>

      {/* <SwipeCarousel /> */}
      <div className="w-[75%] flex mx-auto items-center justify-center gap-14 border-b-2 border-gradient-b mt-4">
        <Button
          theme="primary"
          className="mr-2 bg-white text-gray-500 font-bold hover:bg-strong/50 hover:text-white hover:font-extrabold"
        >
          Mock Tests
        </Button>
        <Button
          theme="success"
          className="mr-2 bg-white text-gray-500 font-bold hover:bg-strong/50 hover:text-white hover:font-extrabold"
        >
          Previous test scores
        </Button>
        <Button
          theme="danger"
          className="mr-2 bg-white text-gray-500 font-bold hover:bg-strong/50 hover:text-white hover:font-extrabold"
        >
          practice
        </Button>
      </div>
      <h1 className="text-3xl font-bold ml-16 mt-5">
        Mock Tests by <span className="text-strong">MJ Academy</span>
      </h1>
      <RemainingCards />
      <VegetableCards />
      {/* <MockTestCard /> */}
      <Footer />
    </div>
  );
};

export default page;
