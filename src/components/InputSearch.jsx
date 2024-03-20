import React, { useState } from "react";
import { useNavigate } from "react-router";

const InputSearch = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (search.length) {
      if (e.key === "Enter" || e.type === "click") {
        navigate(`/search/${search}`);
      }
    }
  };

  return (
    <div className="relative text-color-dark">
      <input
        onChange={({ target }) => setSearch(target.value)}
        onKeyDown={handleSearch}
        type="text"
        placeholder="Cari Anime..."
        className="w-full p-2 rounded-md"
      />
      <button onClick={handleSearch} className="absolute top-2 end-3 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </button>
    </div>
  );
};

export default InputSearch;
