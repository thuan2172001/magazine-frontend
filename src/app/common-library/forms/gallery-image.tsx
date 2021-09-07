import React, { useState } from 'react';
import ReactBnbGallery from 'react-bnb-gallery';
import 'react-bnb-gallery/dist/style.css'
import './gallery-image.scss'
const photos = [{
    photo: "https://source.unsplash.com/aZjw7xI3QAA/1144x763",
    caption: "Nguyễn Minh Hiếu - 26/09/2020 9:00",
    subcaption: `Địa điểm chụp: 21°01'10.1"N 105°47'28.6"E`,
    thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
  }, {
    photo: "https://source.unsplash.com/c77MgFOt7e0/1144x763",
    caption: "Nguyễn Minh Hiếu - 26/09/2020 9:00",
    subcaption: `Địa điểm chụp: 21°01'10.1"N 105°47'28.6"E`,
    thumbnail: "https://source.unsplash.com/c77MgFOt7e0/100x67",
  }, {
    photo: "https://source.unsplash.com/QdBHnkBdu4g/1144x763",
    caption: "Nguyễn Minh Hiếu - 26/09/2020 9:00",
    subcaption: `Địa điểm chụp: 21°01'10.1"N 105°47'28.6"E`,
    thumbnail: "https://source.unsplash.com/QdBHnkBdu4g/100x67",
  }];

function GalleryImage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
        Open gallery
      </button>
      <div className="ccc">
      <ReactBnbGallery
        show={isOpen}
        photos={photos}
        onClose={() => setIsOpen(false)}
      />
      </div>
    </>
  );
};

export default GalleryImage;