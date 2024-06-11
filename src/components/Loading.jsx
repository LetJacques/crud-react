import React from "react";

const Loading = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="mt-3">Carregando...</div>
    </div>
  );
};

export default Loading;
