const HeroSection = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between px-8 py-16 lg:px-24 bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200">
    <div className="max-w-lg text-center lg:text-left">
      <h1 className="text-5xl font-bold text-gray-900 leading-snug mb-4">
        Get Your New <br />
        <span className="text-purple-600">Book Collections</span>
      </h1>
      <p className="text-gray-700 mb-6">
        There are many variations of passages of Lorem Ipsum available, but
        the majority have suffered alteration in some form.
      </p>
      <div className="flex items-center justify-center lg:justify-start space-x-4">
        <button className="bg-purple-600 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-700 transition">
          Explore More
        </button>
      </div>
    </div>
    <div className="relative mt-8 lg:mt-0 flex justify-center lg:justify-end space-x-8">
      <img
        src="/Images/SiriskoPhul.jpg" 
        alt="Left Side "
        className="w-auto h-40 lg:h-60 transform hover:scale-105 transition duration-300 object-contain"
      />
      <img
        src="/Images/Romeo-juliet.png" 
        alt="Romeo and Juliet Book Cover"
        className="w-auto h-40 lg:h-60 transform hover:scale-105 transition duration-300 object-contain"
      />
    </div>
  </section>
  );
}

export default HeroSection;