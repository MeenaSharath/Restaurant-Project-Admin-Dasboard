import React from 'react';

const FoodCard = ({ food, onDelete }) => {
  const { id, name, image, price, orders } = food;

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <img src={image} alt={name} className="h-48 w-full object-cover" />
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-gray-500">${price}</p>
        <p className="text-sm text-gray-400">Orders: {orders}</p>
        <div className="flex justify-end space-x-2 mt-4">
          {/* <button className="text-sm text-blue-500 hover:underline">Edit</button> */}
          {/* <button onClick={() => onDelete(_id)} className="text-sm text-red-500 hover:underline">Delete</button> */}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
