import React from "react";

const MessageModal = ({ show, err, succes }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-end ${
        show ? "" : "hidden"
      }`}
    >
      <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div
        className={`text-white  md:max-w-md rounded z-50 mr-1 lg:mr-10 ${
          succes ? "bg-green-500" : "bg-red-500"
        }`}
      >
        <div>
          <p className="text-center my-3 mx-6">{succes ? succes : err}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
