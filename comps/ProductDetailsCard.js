"use client";

import { MEDIA_URL } from "@/urls";
import Image from "next/image";
import { ShippingCard } from "./ShippingCard";
import { useCreateOrder } from "@/roupi/order";
import { CheckoutForm } from "./CheckoutForm";
import { useState } from "react";

const ProductDescription = ({ description }) => {
  return (
    <p className="py-10 text-gray-900 lg:col-span-2 lg:col-start-1 lg:pb-16 flex flex-col lg:pr-8 lg:pt-6">
      {/* <!-- Description and details --> */}
      <span className="text-gray-900 font-bold mb-2">Description:</span>
      <span>{description}</span>
    </p>
  );
};

const Choice = ({ image, title, currentPack, addPackID, id }) => {
  return (
    <button
      type="submit"
      onClick={(e) => {
        e.preventDefault();
        addPackID();
      }}
      className="w-16 h-20"
    >
      <label
        className={
          "group w-16 h-16 py-1 flex items-center justify-center rounded-md border text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm"
        }
      >
        <input
          type="radio"
          name="size-choice"
          value="M"
          className="sr-only"
          aria-labelledby="size-choice-3-label"
        />
        {/* <!--
              Active: "border", Not Active: "border-2"
              Checked: "border-indigo-500", Not Checked: "border-transparent"
        --> */}
        <img
          src={MEDIA_URL + image?.replace("/media/", "")}
          width={60}
          height={60}
          alt="Pack"
          id="size-choice-3-label"
          className={`pointer-events-none  ${
            id == currentPack && "ring-2 ring-indigo-500"
          } w-16 h-16 -inset-px rounded-md`}
        />
      </label>
      <p
        id="size-choice-3-label"
        className={`text-center mt-2 ${
          currentPack == id ? "text-indigo-500" : "text-gray-900"
        } font-bold`}
      >
        {title || "M"}
      </p>
    </button>
  );
};

const NotAvialableChoice = () => {
  return (
    <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-not-allowed bg-gray-50 text-gray-200">
      <input
        type="radio"
        name="size-choice"
        value="XXS"
        disabled
        className="sr-only"
        aria-labelledby="size-choice-0-label"
      />
      <span id="size-choice-0-label">XXS</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
      >
        <svg
          className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          stroke="currentColor"
        >
          <line
            x1="0"
            y1="100"
            x2="100"
            y2="0"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </span>
    </label>
  );
};

export const ProductChoices = ({ packs, packID, addPackID }) => {
  return (
    <div className="min-w-[200px]">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">
          {packs?.name || "size"}
        </h3>
        <a
          href="#"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          Size guide
        </a>
      </div>

      <fieldset className="mt-4">
        <div className="flex flex-wrap gap-4 w-full">
          {/* <!-- Active: "ring-2 ring-indigo-500" --> */}
          {packs?.map((pack) => (
            <Choice
              key={pack.id}
              id={pack.id}
              currentPack={packID}
              addPackID={() => addPackID(pack.id)}
              image={pack.image}
              title={pack.title}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export const ProductDetailsCard = ({
  title,
  price,
  description,
  discount,
  id,
  shipping,
  packs,
}) => {
  if (!id) return <p>Loading comp</p>;
  const acctualPrice = price - (discount * price) / 100;
  const { submit, setOrder, order } = useCreateOrder(id);
  return (
    <>
      <div className="block pt-16  md:px-6 w-[400px]">
        <div className="block lg:pr-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {title}
            </h1>
          </div>

          <div className="flex justify-between flex-col">
            <div className="mt-4 tracking-tight flex text-gray-900">
              <p className="flex text-3xl font-bold text-gray-900">
                {discount ? acctualPrice.toFixed(2) : price}
                <span className="text-3xl font-bold text-gray-900">DA</span>
              </p>
              {discount ? (
                <p className="px-2 text-xl self-end  line-through text-gray-500">
                  {price} DA
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="flex items-center mt-4 border shadow-sm rounded-md max-w-[138px]">
              <button
                onClick={() =>
                  setOrder((prev) => ({
                    ...prev,
                    quantity: prev.quantity === 1 ? 1 : prev.quantity - 1,
                  }))
                }
                className="px-4 border rounded-md font-bold text-2xl bg-gray-50"
              >
                -
              </button>
              <p className="text-2xl font-bold mx-4 ">{order.quantity}</p>
              <button
                onClick={() =>
                  setOrder((prev) => ({
                    ...prev,
                    quantity: prev.quantity + 1,
                  }))
                }
                className="px-4 border rounded-md font-bold text-2xl bg-gray-50"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <ProductDescription description={description} />
      </div>

      <form className="pt-16  max-w-[400px]">
        {/* <!-- Sizes --> */}
        <ProductChoices
          packs={packs}
          packID={order?.packID}
          addPackID={(id) =>
            setOrder((prev) => ({
              ...prev,
              packID: prev.packID === id ? null : id,
            }))
          }
        />
        <div className="mt-10 w-full">
          <ShippingCard
            shippingValue={order?.shippingID}
            shipping={shipping}
            addShipping={(id) =>
              setOrder((prev) => ({ ...prev, shippingID: id }))
            }
          />
        </div>
        <CheckoutForm submit={submit} hasPacks={packs.length > 0} />
      </form>
    </>
  );
};
