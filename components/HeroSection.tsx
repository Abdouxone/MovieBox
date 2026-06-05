import { Popcorn, Search } from "lucide-react";
import Image from "next/image";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { TypingText } from "./TextEffect";
import GlassTimeCard from "./GlassTime";

export interface MovieData {
  vote_average: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
}

export default function HeroSection({
  search,
  setSearch,
  movies,
}: {
  search: string;
  setSearch: (value: string) => void;
  movies: MovieData[];
}) {
  return (
    <header className="relative  md:h-[70vh] h-[60vh]  items-center justify-center flex">
      <div className="absolute inset-0 opacity-50 grid grid-cols-5 gap-1 top-0">
        {Array(5)
          .fill(1)
          .map((_, index) => (
            <div key={index}>
              <Image
                className="object-contain w-full"
                src={
                  movies[index + 1]?.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movies[index + 1].poster_path}`
                    : "/movie-img.webp"
                }
                width={250}
                height={250}
                alt="movie-poster"
              />
            </div>
          ))}
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-woodsmoke via-woodsmoke/80  to-transparent"></div>
      <div className="absolute inset-0 bg-linear-to-t from-woodsmoke/90 via-transparent  to-woodsmoke/90"></div>

      <div className="flex relative  z-10 flex-col items-center justify-center space-y-5">
        <div className="items-center w-14 h-14 rounded-xl bg-red-500 shadow-lg flex mb-4 justify-center">
          <Popcorn className="h-7 w-7" />
        </div>
        <h1 className="text-center text-6xl text-white font-bold">
          Netfrjo Box
        </h1>
        {/* <p className="text-center p-4 text-xl text-santas-gray">
          Discover the most popular movies trending right now
        </p> */}
        <TypingText />
        <div className="flex md:min-w-2xl min-w-sm  flex-row p-3 h-10 items-center bg-dark-black rounded-xl">
          <Search className="mr-2 " size={30} />
          <input
            type="text"
            className="border-none outline-none  w-full"
            placeholder="Search for movies..."
            // value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="md:hidden">
          <GlassTimeCard showTimezone showSeconds />
        </div>
      </div>
    </header>
  );
}
