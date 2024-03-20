import React, { useState } from "react";
import { createGenre, deleteGenre, editGenre } from "../utils/api";
import MessageModal from "./MessageModal";

const ManageGenre = ({ show, genreList, getMovieGenre, onHide }) => {
  const [nameCreate, setNameCreate] = useState("");
  const [nameEdit, setNameEdit] = useState("");
  const [showMessageModal, setShowMassageModal] = useState(false);
  const [succesModal, setSuccesModal] = useState("");
  const [errorModal, setErrorModal] = useState("");

  const showMessage = (message, type) => {
    if (type === "success") setSuccesModal(message);
    else setErrorModal(message);

    setShowMassageModal(true);
    setTimeout(() => {
      setShowMassageModal(false);
      setErrorModal("");
    }, 2000);
  };

  const handleCreateGenre = () => {
    if (!nameCreate) {
      showMessage("Please Fill Out The Form", "error");
      return;
    }
    createGenre(nameCreate)
      .then((res) => {
        getMovieGenre();
        showMessage("Create Genre Succes", "success");
      })
      .catch((err) => {
        showMessage("Error Genre Movie", "error");
      });
  };

  const handleDeleteGenre = (id) => {
    deleteGenre(id)
      .then((res) => {
        getMovieGenre();
        showMessage("Delete Genre Succes", "success");
      })
      .catch((err) => {
        showMessage("Error Delete Genre", "error");
      });
  };

  const handleEditGenre = (id) => {
    if (!nameEdit) {
      showMessage("Please Fill Out The Form", "error");
      return;
    }
    editGenre(id, nameEdit)
      .then((res) => {
        getMovieGenre();
        showMessage("Edit Genre Succes", "success");
      })
      .catch((err) => {
        showMessage("Error Edit Genre", "error");
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
      <MessageModal
        show={showMessageModal}
        err={errorModal}
        succes={succesModal}
      />
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto h-[500px]">
        <div className="flex justify-center items-center mx-4 mt-4 mb-4 gap-3">
          <input
            onChange={(e) => setNameCreate(e.target.value)}
            type="text"
            className="w-full border p-2 rounded-lg "
            placeholder="Create Genre"
          />
          <button
            onClick={handleCreateGenre}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4  rounded-tl-md rounded-br-md"
          >
            Create
          </button>
          <button
            onClick={onHide}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-3 rounded-tl-md rounded-br-md"
          >
            Cancel
          </button>
        </div>
        <div className="flex flex-col">
          {genreList.map((item) => (
            <div className="flex pr-4 gap-2">
              <div className="p-1 border w-60 ml-4 mt-2 gap-2 mb-2 text-sm rounded-md ">
                <div className="flex justify-between px-2">
                  <div>{item.name}</div>
                  <button onClick={() => handleDeleteGenre(item.id)}>x</button>
                </div>
              </div>
              <div className="flex justify-center items-center gap-2">
                <input
                  onChange={(e) => setNameEdit(e.target.value)}
                  type="text"
                  className="border h-[30px] w-32 px-2 rounded-lg "
                  placeholder="Edit Genre"
                />
                <button
                  onClick={() => handleEditGenre(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white   px-4 mr-3 rounded-tl-md rounded-br-md"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageGenre;
