// components/InputResultComponent.js
import React from 'react';
import Link from 'next/link';

const InputResultComponent = ({ cardData }) => {
  return (
    <div>
      <h1>Your Component</h1>
      <ul>
        {cardData.map((place, index) => (
          <li key={index}>
            <h3>{place.place_name}</h3>
            <p>{place.city_name}</p>
            <p>{place.blog_paragraph}</p>
            <Link
              href={{
                pathname: '/CardResults',
                query: { cardData: JSON.stringify(place) }, // Pass the card data as a string
              }}
            >
              <a>View Details</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InputResultComponent;
