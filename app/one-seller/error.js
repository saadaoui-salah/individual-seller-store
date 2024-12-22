"use client";
import Link from "next/link";

export default function CustomError({ error, reset }) {
  return (
    <section className="w-full bg-blue-50 flex flex-col items-center h-[82.6vh] justify-center">
      <h1 className="text-3xl text-red-500 font-semibold mb-4">
        Something went wrong ... 😢
      </h1>
      <div className="flex w-[280px] justify-between">
        <button
          onClick={() => reset()}
          className="border border-blue-500 bg-blue-500 text-white font-bold px-6 py-[9px] rounded-md mt-4"
        >
          Try again
        </button>
        <Link
          href={"/"}
          className="border border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white font-bold px-6 py-3 rounded-md mt-4"
        >
          Go Home
        </Link>
      </div>
    </section>
  );
}
