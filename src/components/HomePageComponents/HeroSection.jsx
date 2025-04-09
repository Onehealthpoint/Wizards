import Lottie from "lottie-react"
import Read from "../Animation/Reading.json"

const HeroSection = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center px-8 py-16 lg:px-24 bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200">
      <div className="lg:w-1/2 text-center lg:text-left max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900 leading-snug mb-4">
          Satisfy your <br />
          <span className="text-purple-600 text-8xl">TEXTUAL </span>
          needs
        </h1>
        <p className="text-gray-700 mb-6">
          Discover a world of knowledge and imagination with our curated collection of books.
        </p>
        <div className="flex items-center justify-center lg:justify-start space-x-4">
          <button 
            className="bg-purple-600 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-700 transition"
            onClick={() => {
                window.scrollTo({
                  top: 850,
                  behavior: "smooth",
                })
              }}
            >
            Explore More
          </button>
        </div>
      </div>
      <div className="mt-8 lg:mt-0 lg:w-1/2 flex justify-center lg:justify-end lg:pr-8">
        <Lottie animationData={Read} style={{ width: 400, height: 400 }} />
      </div>
    </section>
  )
}

export default HeroSection