import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMoviesResponse } from "../utils/api";
import Loading from "../utils/Loading";
import MovieList from "../components/MovieList";

const Search = () => {
  const [movieSearch, setMovieSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const param = useParams();
  const keyword = param.userId;
  console.log(param);

  useEffect(() => {
    getMoviesResponse(
      { resource: "api/movie" },
      { query: `search=${keyword}` }
    ).then((res) => {
      setMovieSearch(res?.data?.data?.data);
      setIsLoading(false);
    });
  }, [param]);

  if (movieSearch.length === 0) {
    return <div>No movies found for "{keyword}"</div>;
  }

  return (
    <div>
      {isLoading && <Loading />}
      <p className="pt-4 pl-4 -mb-5 text-xl font-semibold">
        Search for {keyword} ...
      </p>
      <MovieList api={movieSearch} />
    </div>
  );
};

export default Search;
