import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const apiKey = process.env.TMDB_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "TMDB key is missing" },
        { status: 404 },
      );
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json({ error: "Query is missing." }, { status: 404 });
    }

    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "error while fetching movie" },
        { status: 500 },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { error: "Server error while searching movies!" },
      { status: 500 },
    );
  }
}
