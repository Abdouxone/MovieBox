import { NextResponse } from "next/server";

const url =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

export async function GET() {
  const accessToken = process.env.TMDB_KEY;

  if (!accessToken) {
    return NextResponse.json(
      { error: "TMDB access token is missing!" },
      { status: 500 },
    );
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      accept: "application/json",
    },
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch top rated movies!" },
      { status: response.status },
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
