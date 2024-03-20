import React, { useEffect, useState } from "react";
import { getMoviesGenre, getMoviesResponse } from "../utils/api";
import MovieList from "../components/MovieList";
import Loading from "../utils/Loading";
import ButtonCreateMovie from "../components/ButtoCreateMovie";
import CreateEditMovieForm from "../components/CreateEditMovieForm";
import ManageGenre from "../components/ManageGenre";

const Home = () => {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [triggerForm, setTrigerForm] = useState(false);
  const [triggerManagegenre, setTrigerManageGenre] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [movieId, setMovieId] = useState(null);
  const [movieData, setMovieData] = useState([]);
  const [genreList, setGenreList] = useState([]);

  const getMovieList = () => {
    getMoviesResponse({ resource: "api/movie" }, { query: "" })
      .then((res) => {
        setMovieList(res?.data?.data?.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const getMovieGenre = () => {
    getMoviesGenre().then((res) => setGenreList(res?.data?.data?.data));
  };

  useEffect(() => {
    getMovieList();
    getMovieGenre();
  }, []);

  const handleHideForm = () => {
    setTrigerManageGenre(false);
    setTrigerForm(false);
    setIsEdit(false);
  };

  return (
    <div>
      {isLoading && <Loading />}
      {triggerForm && (
        <CreateEditMovieForm
          show={triggerForm}
          isEdit={isEdit}
          onHide={handleHideForm}
          id={movieId}
          movieData={movieData}
          getMovieList={getMovieList}
          genreList={genreList}
        />
      )}
      {triggerManagegenre && (
        <ManageGenre
          show={triggerManagegenre}
          genreList={genreList}
          getMovieGenre={getMovieGenre}
          onHide={handleHideForm}
        />
      )}

      <MovieList
        api={movieList}
        triggerForm={triggerForm}
        setTriggerForm={setTrigerForm}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        setMovieId={setMovieId}
        setMovieData={setMovieData}
        setTrigerManageGenre={setTrigerManageGenre}
      />
      <ButtonCreateMovie
        triggerForm={triggerForm}
        setTriggerForm={setTrigerForm}
        setMovieData={setMovieData}
      />
    </div>
  );
};

export default Home;
