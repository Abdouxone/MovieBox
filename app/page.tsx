"use client";
import HeroSection from "@/components/HeroSection";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface MovieData {
  vote_average: number;
  title: string;
  poster_path: string;
  overview: string;
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
    <div>
      <HeroSection search={search} setSearch={setSearch} />
      <div className="flex flex-col mx-10 ">
        <div className="space-y-5 mb-7 ">
          <h1 className="font-bold text-4xl">Popular Movies right now!</h1>
          <p className="text-lg text-santas-gray">Explore new names today</p>
        </div>
        <div className="grid lg:grid-cols-5 grid-cols-2 gap-5  ">
          {movies.map((data, index) => (
            <div
              className=" overflow-hidden flex items-center justify-center  rounded-lg shadow  group relative"
              key={index}
            >
              <div className="absolute z-10 inset-0 bg-linear-to-t from-woodsmoke/50  to-transparent "></div>
              <Image
                src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                alt=""
                height={400}
                width={250}
                className="object-cover w-full h-full group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute flex flex-col z-10 px-2  text-left  bg-woodsmoke text-[#FFFFFF]  w-full h-12 right-0 bottom-0">
                <span className="text-xl">{data.title}</span>
                <span className="text-base">
                  {data.release_date.split("-")[0]}
                </span>
              </div>
              <div className="absolute flex  items-center space-x-2 px-2  justify-center rounded-2xl flex-row  top-2 right-2 bg-dark-black">
                <span className="text-lg font-semibold">
                  {data.vote_average.toFixed(2)}
                </span>
                <StarIcon size={20} color="yellow" />
              </div>
              <div className="absolute shadow-2xl p-2 bottom-20">
                <span className="text-lg text-center opacity-0  group-hover:opacity-90 transition-all duration-300 line-clamp-3">
                  {data.overview}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
