const ClientProfile = ({ name, profilePicture }) => {
  return (
    <div className="text-center m-5">
      <img 
        src={profilePicture} 
        alt={`${name}'s profile`} 
        className="w-36 h-36 rounded-full object-cover mx-auto" 
      />
      <h2 className="mt-3 text-xl text-gray-800">{name}</h2>
    </div>
  );
};

export default ClientProfile;