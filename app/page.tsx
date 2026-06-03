"use client";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);
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
  return (
    <div>
      <HeroSection />
      <div className="flex flex-col mx-10 ">
        <div className="space-y-5">
          <h1 className="font-bold text-4xl">Popular Movies right now!</h1>
          <p className="text-lg">Explore new names today</p>
        </div>
        <div className="grid grid-cols-5 gap-3 ">
          {movies.map((data, index) => (
            <div
              className=" overflow-hidden rounded-lg shadow h-100 group relative"
              key={index}
            >
              <div className="absolute z-10 inset-0 bg-linear-to-t from-woodsmoke/50  to-transparent "></div>
              <div className="">
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                  alt=""
                  fill
                  className="object-cover h-fit group-hover:scale-105 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
