import { FetchWishlist, RemoveFromWishlist } from "../Firebase/WishlistCRUD";
import { AddToCart } from "../Firebase/CartCRUD";
import { useState, useEffect } from "react";
import { ShoppingCartIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { useAuth, ChangePassword, ChangeProfile } from "../Firebase/Auth";


const ClientComponent = () => {
  const { User, UID } = useAuth();
  const [user, setUser] = useState({ name: "", email: "", profilePicture: "" });
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newName, setNewName] = useState(user ? user.name : "");
  const [newPhoto, setNewPhoto] = useState("");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "title", direction: "asc" });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        if(User){
          setUser({
            name: User.displayName,
            email: User.email,
            profilePicture: User.photoURL,
          });
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error loading user data:", error)
      } finally {
        setLoading(false)
      }
    };

    loadUserData();
  }, [User]);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        setLoading(true);
        const wishlistData = await FetchWishlist(UID);
        setWishlist(wishlistData);
      } catch (error) {
        console.error("Error loading wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, [UID]);

  const handleRemoveFromWishlist = async(ISBN) => {
      await RemoveFromWishlist(UID, ISBN);
      const wish = wishlist.filter((item) => item.ISBN !== ISBN);
      setWishlist(wish);
  };

  const handleAddToCart = async(ISBN) => {
      await AddToCart(UID, ISBN, 1);
      handleRemoveFromWishlist(ISBN);
  }

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    if (oldPassword === newPassword) {
      alert("New password must be different from old password");
      return;
    }

    const passwordChanged = await ChangePassword(oldPassword, newPassword);

    if (passwordChanged) {
      alert("Password updated successfully");
    } else {
      alert("An error occurred while updating your password");
    }

    setShowChangePassword(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();

    if (newName === user.name && newPhoto === user.profilePicture) {
      alert("No changes detected");
      return;
    }
    
    const profileChanged = await ChangeProfile(newName, newPhoto);

    if (profileChanged) {
      alert("Profile updated successfully");
      setUser({
        name: newName,
        email: user.email,
        profilePicture: newPhoto,
      });
    } else {
      alert("An error occurred while updating your profile");
    }

    setShowEditProfile(false);
    setNewName("");
    setNewPhoto("");
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    });

    setWishlist(
      [...wishlist].sort((a, b) => {
        if (a[key] < b[key]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      }),
    );
  };

  if(user.name === "" || user.email === "" || user.profilePicture === ""){
    return (
      <div className="mx-auto mt-10  w-20 h-20 rounded-full border-b-4 border-blue-400 animate-spin"></div>
    );
  }
  else{
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">User Dashboard</h1>

            <div className="flex flex-col md:flex-row justify-between mb-8">
              <div className="flex flex-col md:flex-row items-center md:items-start mb-4 md:mb-0">
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-8"
                />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
                  <p className="text-gray-600 mb-2">{user.email}</p>
                  <p className="flex space-x-4">
                    <button
                      hidden={showEditProfile}
                      onClick={() => {
                        setShowEditProfile(false);
                        setShowChangePassword(!showChangePassword);
                      }}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      {showChangePassword ? "Cancel" : "Change Password"}
                    </button>
                    <button
                      hidden={showChangePassword}
                      onClick={() => {
                        setShowEditProfile(!showEditProfile);
                        setShowChangePassword(false);
                      }}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      {showEditProfile ? "Cancel" : "Edit Profile"}
                    </button>
                  </p>
                  
                </div>
              </div>
              {showChangePassword && (
                <form onSubmit={handleChangePassword} className="mt-4 md:mt-0 md:w-1/2">
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Current Password"
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                    required
                  />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                    required
                  />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm New Password"
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                  >
                    Update Password
                  </button>
                </form>
              )}
              { showEditProfile && (
                <form onSubmit={handleEditProfile} className="mt-4 md:mt-0 md:w-1/2">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Username"
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                  />
                  <input
                    type="text"
                    value={newPhoto}
                    onChange={(e) => setNewPhoto(e.target.value)}
                    placeholder="Photo URL"
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                  >
                    Update Profile
                  </button>
                </form>
              )}
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4">My Wishlist</h3>
            {(loading) && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading Wishes...</p>
                </div>
            )}
            {(wishlist.length === 0 && !loading) && (
              <p className="text-gray-600">Your wishlist is empty.</p>
            )}
            {(wishlist.length !== 0 && !loading) && (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100">
                  <tr>
                        <th className="py-3 px-4 text-left">
                          <button
                            onClick={() => handleSort("title")}
                            className="font-semibold hover:text-purple-600 transition-colors focus:outline-none flex items-center"
                          >
                            Title {sortConfig.key === "title" && (sortConfig.direction === "asc" ? <ArrowUpIcon/> : <ArrowDownIcon/>)}
                          </button>
                        </th>
                        <th className="py-3 px-4 text-left">
                          <button
                            onClick={() => handleSort("author")}
                            className="font-semibold hover:text-purple-600 transition-colors focus:outline-none flex items-center"
                          >
                            Author {sortConfig.key === "author" && (sortConfig.direction === "asc" ? <ArrowUpIcon/> : <ArrowDownIcon/>)}
                          </button>
                        </th>
                        <th className="py-3 px-4 text-left">
                          <button
                            onClick={() => handleSort("price")}
                            className="font-semibold hover:text-purple-600 transition-colors focus:outline-none flex items-center"
                          >
                            Price {sortConfig.key === "price" && (sortConfig.direction === "asc" ? <ArrowUpIcon/> : <ArrowDownIcon/>)}
                          </button>
                        </th>
                        <th className="py-3 px-4 text-left">
                          Actions
                        </th>
                      </tr>
                  </thead>
                  <tbody>
                    {wishlist.map((book) => (
                      <tr key={book.ISBN} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4">{book.title}</td>
                        <td className="py-3 px-4">{book.author}</td>
                        <td className="py-3 px-4">${book.price}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleRemoveFromWishlist(book.ISBN)}
                            className="text-red-500 hover:text-red-600 w-1/3"
                          >
                            <TrashIcon className="w-5 h-5 mx-2" />
                          </button>
                          
                          <button
                            onClick={() => handleAddToCart(book.ISBN)}
                            className="text-green-500 hover:text-green-600 w-1/3"
                          >
                            <ShoppingCartIcon className="w-5 h-5 mx-2" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default ClientComponent;