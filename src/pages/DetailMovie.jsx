import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMoviesResponse } from "../utils/api";
import Loading from "../utils/Loading";

const DetailMovie = () => {
  const [detailMovie, setDetailMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const param = useParams();
  const id = param.userId;

  useEffect(() => {
    getMoviesResponse({ resource: `api/movie/${id}` }, {}).then((res) => {
      setDetailMovie(res?.data?.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      {isLoading && <Loading />}

      <div className="pt-4 px-4">
        <h3 className="text-color-primary text-2xl">{detailMovie.title}</h3>
      </div>

      <div className="p-4 flex flex-col md:flex-row items-center md:items-start text-justify gap-4">
        <img src={detailMovie?.image} alt="" className="w-64 rounded-md" />
        <div className="md:w-3/4 lg:w-1/2  text-sm mt-6 lg:mt-0">
          <p className="flex mb-2">
            <span className="font-semibold w-2/5 flex justify-between">
              <span>Genre</span> <span>: </span>
            </span>
            <span
              className="w-full pl-2 text-justify flex flex-wrap"
              style={{ wordBreak: "break-word" }}
            >
              {detailMovie?.genres?.map((genre, index) => (
                <div>
                  {genre?.name || "N/A"}
                  {index !== detailMovie.genres.length - 1 && ", "}
                </div>
              ))}
            </span>
          </p>
          <p className="flex mb-2">
            <span className="font-semibold w-2/5 flex justify-between">
              <span>Director</span> <span>: </span>
            </span>
            <span
              className="w-full pl-2 text-justify"
              style={{ wordBreak: "break-word" }}
            >
              {detailMovie?.director || "N/A"}
            </span>
          </p>
          <p className="flex mb-2">
            <span className="font-semibold w-2/5 flex justify-between">
              <span>Summary</span> <span>: </span>
            </span>
            <span
              className="w-full pl-2 text-justify"
              style={{ wordBreak: "break-word" }}
            >
              {detailMovie?.summary || "N/A"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailMovie;
