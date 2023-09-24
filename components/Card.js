import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editCard, deleteCard } from '@/redux/action';

const Card = ({ place }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(place.blog_paragraph);
  const dispatch = useDispatch();
  const currentMode = useSelector((state) => state.mode); // Access mode from Redux

  const handleEdit = () => {
    // Dispatch editCard action
    dispatch(editCard({ ...place, blog_paragraph: newDescription }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Dispatch deleteCard action
    dispatch(deleteCard(place.id));
  };

  return (
    <div
      className={`bg-${currentMode}-background rounded-lg border shadow-lg overflow-hidden`}
    >
      <img src={place.image_url} alt={place.place_name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{place.place_name}</h2>
        {isEditing ? (
          <div className="mb-2">
            {/* ... */}
          </div>
        ) : (
          <p className="text-gray-600 mb-2">{place.blog_paragraph}</p>
        )}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-green-500 mt-2 w-full text-white px-2 py-1 rounded-md mr-2"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
        <button
          onClick={handleDelete}
          className='bg-red-500 w-full mt-2 text-white px-2 py-1 rounded-md'
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
