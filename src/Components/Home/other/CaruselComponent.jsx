import React from "react";
import "../../../resources/css/carousel.css";
import { Link } from "react-router-dom";
import SectionComponent from "./SectionComponent";

function CaruselComponent() {
  return (
    <div id="noteCarousel" className="carousel slide">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#noteCarousel"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#noteCarousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#noteCarousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>

      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            className="d-block w-100"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
            alt="First slide"
          />
          <div className="container">
            <div className="carousel-caption text-left">
              <h1>Create Your Notes.</h1>
              <p>
                Organize your thoughts and tasks efficiently with our intuitive
                note-taking tool. Start by creating a new note today!
              </p>
              <p>
                <Link
                  className="btn btn-lg btn-primary"
                  to="/login"
                  role="button"
                >
                  Start Writing
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="carousel-item">
          <img
            className="d-block w-100"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
            alt="Second slide"
          />
          <div className="container">
            <div className="carousel-caption">
              <h1>Organize Your Ideas.</h1>
              <p>
                Group related notes into notebooks, tag them for easy retrieval,
                and keep your ideas structured and accessible.
              </p>
              <p>
                <Link
                  className="btn btn-lg btn-primary"
                  to="/login"
                  role="button"
                >
                  Learn More
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="carousel-item">
          <img
            className="d-block w-100"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
            alt="Third slide"
          />
          <div className="container">
            <div className="carousel-caption text-right">
              <h1>Access Anywhere, Anytime.</h1>
              <p>
                Your notes are synced across all devices, so you can capture
                inspiration whenever it strikes, no matter where you are.
              </p>
              <p>
                <Link
                  className="btn btn-lg btn-primary"
                  to="/login"
                  role="button"
                >
                  Browse Notes
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#noteCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#noteCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default CaruselComponent;
