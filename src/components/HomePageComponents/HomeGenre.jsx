const genres = [
    { name: "Arts & Photography", icon: "🎨" },
    { name: "Boxed Sets", icon: "📦" },
    { name: "Business and Investing", icon: "💼" },
    { name: "Fiction and Literature", icon: "🎭" },
    { name: "Foreign Languages", icon: "🌐" },
    { name: "History, Biography, and...", icon: "💬" },
    { name: "Kids and Teens", icon: "👶" },
    { name: "Learning and Reference", icon: "📖" },
    { name: "Lifestyle and Wellness", icon: "🧘" },
    { name: "Manga and Graphic Novels", icon: "📚" },
  ];
  
  const Genres = () => {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Genres</h2>
        <p className="text-center text-gray-600 mb-6">
          Browse Our Extensive Collection of Books Across Different Genres.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {genres.map((genre, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-2">{genre.icon}</div>
              <p className="text-center text-sm font-medium">{genre.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Genres;