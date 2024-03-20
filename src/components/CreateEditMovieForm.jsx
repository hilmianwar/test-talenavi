import React, { useState } from "react";
import { createMovie, deleteMovie, editMovie } from "../utils/api";
import MessageModal from "./MessageModal";
import Multiselect from "multiselect-react-dropdown";

const CreateEditMovieForm = ({
  show,
  isEdit,
  onHide,
  id,
  movieData,
  getMovieList,
  genreList,
}) => {
  const [title, setTitle] = useState(movieData.title || "");
  const [director, setDirector] = useState(movieData.director || "");
  const [summary, setSummary] = useState(movieData.summary || "");
  const [genre, setGenre] = useState([]);
  const [showMessageModal, setShowMassageModal] = useState(false);
  const [succesModal, setSuccesModal] = useState("");
  const [errorModal, setErrorModal] = useState("");

  const formattedGenreList = genreList.map((genre) => genre?.name);

  const showMessage = (message, type) => {
    if (type === "success") setSuccesModal(message);
    else setErrorModal(message);

    setShowMassageModal(true);
    setTimeout(() => {
      setShowMassageModal(false);
      setErrorModal("");
      onHide();
    }, 2000);
  };

  const handleCreateMovie = () => {
    if (!title || !director || !summary || genre.length === 0) {
      showMessage("Please complete all fields in the form", "error");
      return;
    }
    createMovie(title, director, summary, genre)
      .then((res) => {
        getMovieList();
        showMessage("Create Movie Succes", "success");
      })
      .catch((err) => {
        showMessage("Error Create Movie", "error");
      });
  };

  const handleEditMovie = () => {
    if (!title || !director || !summary || genre.length === 0) {
      showMessage("Please complete all fields in the form", "error");
      return;
    }
    editMovie(id, title, director, summary, genre)
      .then((res) => {
        getMovieList();
        showMessage("Edit Movie Succes", "success");
      })
      .catch((err) => {
        showMessage("Error Edit Movie", "error");
      });
  };

  const handleDeleteMovie = () => {
    deleteMovie({ resource: `api/movie/${id}` })
      .then((res) => {
        getMovieList();
        showMessage("Delete Movie Succes", "success");
      })
      .catch((err) => {
        showMessage("Error Delete Movie", "error");
      });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        show ? "" : "hidden"
      }`}
    >
      <div
        className={`modal-overlay absolute w-full h-full bg-gray-900 opacity-50 ${
          show ? "block" : "hidden"
        }`}
      ></div>

      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto h-[640px]">
        <div className="  border border-b-black mb-4 flex justify-end">
          <div className="modal-footer my-4 mr-6">
            {isEdit ? (
              <button
                onClick={handleDeleteMovie}
                className="ml-2 border border-red-600  hover:bg-gray-300 text-red-600 font-bold py-2 px-4 rounded-tl-md rounded-br-md mr-3 "
              >
                Delete
              </button>
            ) : null}

            <button
              onClick={isEdit ? handleEditMovie : handleCreateMovie}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 mr-3 rounded-tl-md rounded-br-md"
            >
              Save
            </button>
            <button
              onClick={onHide}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-tl-md rounded-br-md"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="modal-content pb-4 text-left px-6">
          <form>
            <MessageModal
              show={showMessageModal}
              err={errorModal}
              succes={succesModal}
            />
            <div className="mb-1">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 rounded-lg "
                placeholder="Enter name"
              />
            </div>
            <div className="mb-1">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Director
              </label>
              <input
                type="text"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                className="w-full border p-2 rounded-lg"
                placeholder="Enter name"
              />
            </div>

            <div className="mb-1">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Summary
              </label>
              <textarea
                rows="1.5"
                value={summary}
                maxLength={100}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full border p-2 rounded-lg"
                placeholder="Enter description"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <div></div>Genres
              </label>

              <Multiselect
                options={formattedGenreList}
                isObject={false}
                onSelect={(e) => setGenre(e)}
                onRemove={(e) => setGenre(e)}
                closeOnSelect={false}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEditMovieForm;
