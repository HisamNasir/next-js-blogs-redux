// components/PlaceForm.js
import React, { useState } from 'react';

const PlaceForm = ({ onAddPlace }) => {
  const [newPlace, setNewPlace] = useState({
    place_name: '',
    city_name: '',
    blog_paragraph: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlace({ ...newPlace, [name]: value });
  };

  const handleAddPlace = () => {
    // Call the onAddPlace function passed as a prop to add the new place
    onAddPlace(newPlace);
    setNewPlace({
      place_name: '',
      city_name: '',
      blog_paragraph: '',
    });
  };

  return (
    <div>
      <h2>Add a New Place</h2>
      <div>
        <label htmlFor="place_name">Place Name:</label>
        <input
          type="text"
          id="place_name"
          name="place_name"
          value={newPlace.place_name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="city_name">City Name:</label>
        <input
          type="text"
          id="city_name"
          name="city_name"
          value={newPlace.city_name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="blog_paragraph">Blog Paragraph:</label>
        <textarea
          id="blog_paragraph"
          name="blog_paragraph"
          value={newPlace.blog_paragraph}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleAddPlace}>Add Place</button>
    </div>
  );
};

export default PlaceForm;
``
