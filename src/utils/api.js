import axios from "axios";

export const getMoviesResponse = async ({ resource }, { query }) => {
  const movie = await axios.get(
    `${import.meta.env.VITE_BASEURL}/${resource}?${query}`
  );
  return movie;
};

export const deleteMovie = async ({ resource }) => {
  const movie = await axios.delete(
    `${import.meta.env.VITE_BASEURL}/${resource}`
  );
  return movie;
};

export const createMovie = async (title, director, summary, genre) => {
  const payloud = {
    title: title,
    director: director,
    summary: summary,
    genre: genre,
  };
  const create = await axios.post(
    `${import.meta.env.VITE_BASEURL}/api/movie`,
    payloud
  );
  return create;
};

export const editMovie = async (id, title, director, summary, genre) => {
  const payloud = {
    title: title,
    director: director,
    summary: summary,
    genre: genre,
  };
  const edit = await axios.put(
    `${import.meta.env.VITE_BASEURL}/api/movie/${id}`,
    payloud
  );
  return edit;
};

export const getMoviesGenre = async () => {
  const genre = await axios.get(`${import.meta.env.VITE_BASEURL}/api/genre`);
  return genre;
};

export const createGenre = async (nameCreate) => {
  const payloud = {
    name: nameCreate,
  };
  const create = await axios.post(
    `${import.meta.env.VITE_BASEURL}/api/genre`,
    payloud
  );
  return create;
};

export const editGenre = async (id, nameEdit) => {
  const payloud = {
    name: nameEdit,
  };
  const edit = await axios.put(
    `${import.meta.env.VITE_BASEURL}/api/genre/${id}`,
    payloud
  );
  return edit;
};

export const deleteGenre = async (id) => {
  const movie = await axios.delete(
    `${import.meta.env.VITE_BASEURL}/api/genre/${id}`
  );
  return movie;
};
