import React from "react";
import "../../../resources/css/carousel.css";

function SectionComponent() {
  return (
    <div className="container marketing">
      <div className="row">
        <div className="col-lg-4 text-center">
          <img
            className="rounded-circle"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
            alt="Notebook Icon"
            width="140"
            height="140"
          />
          <h2>Personalized Notebooks</h2>
          <p>
            Create and organize your thoughts in a notebook tailored to your
            needs. Capture ideas, tasks, and inspiration all in one place.
          </p>
          <p>
            <a className="btn btn-secondary" href="#" role="button">
              View details &raquo;
            </a>
          </p>
        </div>
        <div className="col-lg-4 text-center">
          <img
            className="rounded-circle"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
            alt="Organize Notes"
            width="140"
            height="140"
          />
          <h2>Organize Effortlessly</h2>
          <p>
            Group your notes by topic, tag them for easy access, and never lose
            track of important information again.
          </p>
          <p>
            <a className="btn btn-secondary" href="#" role="button">
              View details &raquo;
            </a>
          </p>
        </div>
        <div className="col-lg-4 text-center">
          <img
            className="rounded-circle"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
            alt="Access Anywhere"
            width="140"
            height="140"
          />
          <h2>Access Anywhere</h2>
          <p>
            Keep your notes synced across all your devices, ensuring that your
            thoughts and ideas are always within reach.
          </p>
          <p>
            <a className="btn btn-secondary" href="#" role="button">
              View details &raquo;
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SectionComponent;
