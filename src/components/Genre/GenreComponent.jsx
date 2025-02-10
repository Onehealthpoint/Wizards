import { Film, Map, Laugh, Theater, Wand2, Ghost, Heart, Rocket, Swords } from "lucide-react"

const genres = [
  { name: "Action", icon: Swords },
  { name: "Adventure", icon: Map },
  { name: "Comedy", icon: Laugh },
  { name: "Drama", icon: Theater },
  { name: "Fantasy", icon: Wand2 },
  { name: "Horror", icon: Ghost },
  { name: "Romance", icon: Heart },
  { name: "Sci-Fi", icon: Rocket },
  { name: "Thriller", icon: Film },
  // Add more genres as needed
]

const GenreComponent = () => {
  return (
      <div className="flex justify-center items-center w-full h-full p-4">
        {genres.map((genre, index) => (
          <a
            key={index}
            href={`/search/${genre.name.toLowerCase()}`}
            className="flex flex-col items-center space-y-2 rounded-md bg-white p-4 shadow-sm transition-all hover:bg-gray-100 hover:shadow-md"
          >
            <genre.icon className="h-8 w-8" />
            <span className="text-sm font-medium">{genre.name}</span>
          </a>
        ))}
      </div>
  )
}

export default GenreComponent