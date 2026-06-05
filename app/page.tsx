"use client";
import GlassTimeCard from "@/components/GlassTime";
import HeroSection from "@/components/HeroSection";
import { PlayIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import BorderGlow from "../components/BorderGlow";
import LightRays from "@/components/LightRays";

import Link from "next/link";

export interface MovieData {
  vote_average: number;
  title: string;
  poster_path: string;
  overview: string;
  id: number;
  release_date: string;
}

export default function Home() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    async function fetchTopRelatedMovies() {
      try {
        const response = await fetch("/api/movies/top-rated");
        const data = await response.json();
        setMovies(data.results || []);
        console.log(data);
      } catch (error) {
        console.error("error fetching top related movies", error);
      } finally {
        isLoading(false);
      }
    }

    fetchTopRelatedMovies();
  }, []);

  useEffect(() => {
    async function searchMovies(search: string) {
      if (search.length < 2) {
        return;
      }
      try {
        const response = await fetch(`/api/movies/search?query=${search}`);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.log("error ", error);
      }
    }

    searchMovies(search);
  }, [search]);

  return (
    <div className="relative">
      <div className="absolute  inset-0 ">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ff0000"
          raysSpeed={1}
          lightSpread={0.4}
          rayLength={1}
          followMouse={true}
          mouseInfluence={0.3}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
          pulsating={false}
          fadeDistance={2}
          saturation={-30}
        />
      </div>

      <HeroSection search={search} setSearch={setSearch} movies={movies} />
      <div className="flex flex-col md:mx-10 mx-4 ">
        <div className="space-y-5 mb-7 flex md:flex-row flex-col items-center justify-between ">
          <h1 className="font-bold md:text-4xl text-3xl">
            Popular Movies right now!
          </h1>
          <div className="hidden md:block">
            <GlassTimeCard showTimezone showSeconds />
          </div>
        </div>
        <div className="grid lg:grid-cols-5 grid-cols-2 gap-5  ">
          {movies.map((data, index) => (
            <BorderGlow
              className=""
              key={index}
              edgeSensitivity={30}
              glowColor="40 80 80"
              backgroundColor="#120F17"
              borderRadius={28}
              glowRadius={40}
              glowIntensity={1}
              coneSpread={25}
              animated={false}
              colors={["#c084fc", "#f472b6", "#38bdf8"]}
            >
              <div
                className=" overflow-hidden flex items-center md:h-[380px] h-[280px] justify-center  rounded-2xl   group relative"
                key={index}
              >
                <div className="absolute z-10 inset-0 bg-linear-to-t from-woodsmoke/50  to-transparent "></div>
                <Image
                  src={
                    data.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
                      : "/placeholder-image.svg"
                  }
                  alt={data.title}
                  fill
                  className="object-cover w-full h-full group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute flex flex-col z-10 px-5  text-left  bg-woodsmoke text-[#FFFFFF]  w-full h-12 right-0 bottom-0">
                  <span className="md:text-xl group-hover:text-red-500 transition-all duration-300 text-sm line-clamp-1">
                    {data.title}
                  </span>
                  <span className="md:text-base text-xs">
                    {data.release_date.split("-")[0]}
                  </span>
                </div>
                <div className="absolute flex  items-center space-x-2 px-2  justify-center rounded-2xl flex-row  top-2 right-2 bg-dark-black">
                  <span className="text-lg font-semibold">
                    {data.vote_average.toFixed(2)}
                  </span>
                  <StarIcon size={20} color="yellow" />
                </div>
                {/* <div className="absolute shadow-2xl p-2 bottom-10">
                  <span className="text-base leading-5 text-center opacity-0  group-hover:opacity-90 transition-all duration-300 line-clamp-3">
                    {data.overview}
                  </span>
                </div> */}
                <Link
                  href={`https://www.vidking.net/embed/movie/${data.id}`}
                  className="absolute rounded-full p-3 backdrop-blur-md shadow-2xl  opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-500 z-10 cursor-pointer top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <PlayIcon color="green" size={50} />
                  <p className="md:text-lg text-sm text-green-700">Watch now</p>
                </Link>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </div>
  );
}
