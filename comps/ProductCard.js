"use client";
import { MEDIA_URL } from "@/urls";
import Image from "next/image";
import Link from "next/link";

const DiscountTag = ({ value }) => {
  return (
    <span className="absolute top-1 left-1 bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white">
      {value}% off
    </span>
  );
};

const ProductCard = ({ id, title, price, image, discount }) => {
  const acctualPrice = price - (discount * price) / 100;
  return (
    <Link href={`/products/${id}`}>
      <div className="w-52 border border-gray-200 rounded relative overflow-hidden hover:shadow-sm">
        <div className="overflow-hidden">
          <img
            width={600}
            height={600}
            src={MEDIA_URL + image?.replace("/media/", "")}
            className="w-[13rem] h-[13rem] object-cover transition-transform duration-300 transform hover:scale-125"
            alt="Product Image"
          />
        </div>
        {discount ? <DiscountTag value={discount} /> : ""}
        <div className="px-4 py-2">
          <h2 className="font-bold text-lg text-gray-900">{title}</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-ccenter py-1">
              <div className="flex text-lg font-bold text-gray-900">
                {discount ? acctualPrice.toFixed(2) : price}
                <div className="text-sm font-bold text-gray-900">DA</div>
              </div>
              {discount ? (
                <div className="px-2 self-end text-sm line-through text-gray-500">
                  DA{price}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
