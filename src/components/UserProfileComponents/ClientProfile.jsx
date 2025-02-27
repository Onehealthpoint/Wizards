import React, { useState } from "react";

const initialUser = {
  name: "John Doe",
  profilePic: "https://via.placeholder.com/150", // Replace with the actual URL of the profile picture
  wishlist: [
    { id: 1, name: "The Great Gatsby", price: "$10.99", image: "https://via.placeholder.com/100" },
    { id: 2, name: "To Kill a Mockingbird", price: "$12.99", image: "https://via.placeholder.com/100" },
    { id: 3, name: "1984", price: "$9.99", image: "https://via.placeholder.com/100" },
    { id: 4, name: "The Catcher in the Rye", price: "$11.99", image: "https://via.placeholder.com/100" },
    { id: 5, name: "Moby-Dick", price: "$14.99", image: "https://via.placeholder.com/100" },
  ],
};

const UserProfile = () => {
  const [user, setUser] = useState(initialUser);

  const handleDelete = (id) => {
    setUser((prevUser) => ({
      ...prevUser,
      wishlist: prevUser.wishlist.filter((item) => item.id !== id),
    }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        {/* Profile Section */}
        <div className="flex flex-col items-center">
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.name}</h2>
        </div>

        {/* Wishlist Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Wishlist</h3>
          <ul className="space-y-4">
            {user.wishlist.map((item) => (
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

export default UserProfile;
