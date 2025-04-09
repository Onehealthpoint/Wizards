import { Film, Map, Laugh, Theater, Wand2, Ghost, Heart, Rocket, Swords, Search, BookOpen, Book } from "lucide-react"
import React from "react"
import { Link } from "react-router-dom"

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
  { name: "Mystery", icon: Search },
  { name: "Non-Fiction", icon: BookOpen },
  { name: "Fiction", icon: Book }, 
  { name: "Philosophical", icon: BookOpen }, 
]

const GenreComponent = () => {
  return (
      <div className="flex justify-center items-center w-dvw h-full p-4 overflow-auto">
        {genres.map((genre, index) => (
          <Link
            key={index}
            to={`/searchbygenre/${genre.name}`}
            className="flex flex-col items-center space-y-2 rounded-md bg-white p-4 shadow-sm transition-all hover:bg-gray-100 hover:shadow-md"
          >
            <genre.icon className="h-8 w-8" />
            <span className="text-sm font-medium">{genre.name}</span>
          </Link>
        ))}
      </div>
  )
}

export default GenreComponent