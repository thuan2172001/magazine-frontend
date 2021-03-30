import React from "react";
import "../sass/pages/error/error-6.scss";
import {ToAbsoluteUrl} from "../../common-library/helpers/assets-helpers";

export function ErrorPage6() {
  return (
    <div className="d-flex flex-column flex-root">
      <div
        className="error error-6 d-flex flex-row-fluid bgi-size-cover bgi-position-center"
        style={{
          backgroundImage: `url(${ToAbsoluteUrl("/media/error/bg6.jpg")})`,
        }}
      >
        <div className="d-flex flex-column flex-row-fluid text-center">
          <h1
            className="error-title font-weight-boldest text-white mb-12"
            style={{marginTop: "12rem;"}}
          >
            Oops...
          </h1>
          <p className="display-4 font-weight-bold text-white">
            Looks like something went wrong.
            <br/>
            We're working on it
          </p>
        </div>
      </div>
    </div>
  );
}
