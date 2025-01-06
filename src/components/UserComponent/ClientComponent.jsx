//import { useState } from "react";

const ClientComponent = () => {
  const wishlist = [];

  const handleDelete = (id) => {
      wishlist.filter((item) => item.id !== id);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg">
        {/* Profile Section */}
        <div className="flex flex-col items-center">
          <img
            src={""}//USER PIC HERE
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2"> User Name{/*USER NAME HERE*/} </h2>
        </div>

        {/* Wishlist Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Wishlist</h3>
          <ul className="space-y-4">
            {wishlist.map((item) => (
              <li
                key={item.id}
                className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover mr-4"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{item.name}</h4>
                  <p className="text-gray-600">{item.price}</p>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3917/3917176.png"
                    alt="Delete"
                    className="w-6 h-6"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClientComponent;