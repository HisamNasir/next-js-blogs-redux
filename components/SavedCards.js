// pages/SavedCards.js
import React from 'react';
import { useRouter } from 'next/router';

const SavedCards = () => {
  const router = useRouter();
  const { cardData } = router.query;

  // Check if cardData exists and parse it from a string to an object
  const parsedCardData = cardData ? JSON.parse(cardData) : null;

  return (
    <div>
      <h1>Card Results</h1>
      {parsedCardData && (
        <div>
          <h2>{parsedCardData.place_name}</h2>
          <p>City: {parsedCardData.city_name}</p>
          <p>{parsedCardData.blog_paragraph}</p>
          {/* Add more card details here */}
        </div>
      )}
    </div>
  );
};

export default SavedCards;
