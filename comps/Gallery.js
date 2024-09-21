"use client";
import { MEDIA_URL } from "@/urls";
import { useState } from "react";
import Image from "next/image";

export const Gallery = ({ images }) => {
  if (!images) return;
  images = images.map((image) => image.image);
  const [bigImage, setBigImage] = useState(images[0]);
  const [smallImages, setSmallImages] = useState(
    images.slice(1, images.length)
  );
  const showImage = (image) => {
    setSmallImages(images.filter((im) => im != image));
    setBigImage(image);
  };
  return (
    <section className="h-90 pt-16 sm:col-span-1 md:col-span-2 lg:col-span-2 relative lg:gap-x-8 lg:px-8">
      <div className="flex justify-center">
        <div className="block space-y-4 mr-2">
          {smallImages.map((image, i) => {
            return (
              <img
                key={i}
                width={120}
                alt="image product"
                height={120}
                src={MEDIA_URL + image?.replace("/media/", "")}
                className="w-[60px] h-[60px] rounded-md cursor-pointer md:mb-2"
                onClick={() => showImage(image)}
              />
            );
          })}
        </div>
        <img
          alt="image product"
          width={220}
          height={220}
          src={MEDIA_URL + bigImage?.replace("/media/", "")}
          className="w-[300px] rounded-md h-[400px]"
        />
      </div>
    </section>
  );
};
