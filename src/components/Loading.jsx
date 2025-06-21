import React from "react";

function Loading() {
  return (
    <div className="modal" id="loading">
      <div className="modal-content">
        <h2>Carregando</h2>
        <div>
          <div className="loader"></div>
          <p>Resolvendo links bagunçados</p>
        </div>
      </div>
    </div>
  );
}

export default Loading;
