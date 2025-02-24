import React, { useEffect } from "react";
import Navbar from "../Layout/Navbar"; 
import Footer from "../Layout/Footer"; 

const AboutUsComponent = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar />
    
      
      <div className="py-12 bg-gradient-to-r from-purple-200 via-purple-50 to-purple-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          About Wizard’s Bookstore
        </h2>

        <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
          Welcome to <span className="font-semibold text-purple-800">Wizard’s Bookstore</span>, 
          a magical haven for book lovers! Our goal is to make reading an 
          immersive and enchanting experience by offering a vast collection of 
          books across multiple genres.
        </p>
      </div>

      {/* Main Sections */}
      <div className="container mx-auto px-6 lg:px-12 mt-10 space-y-16 bg-purple-50 py-10">

        {/* Mission & Vision */}
        <div className="bg-white p-8 shadow-lg rounded-xl w-3/4 mx-auto h-auto transition-transform duration-300 hover:scale-105 flex flex-col cursor-pointer hover:shadow-xl hover:shadow-purple-500">
          <h3 className="text-xl font-bold text-purple-800 mb-3 text-center">Our Mission & Vision</h3>
          <p className="text-gray-600">
            At Wizard’s Bookstore, we believe books are magical portals to 
            knowledge, imagination, and discovery. Our mission is to make 
            books accessible to everyone while building a community of 
            passionate readers.  
            <br/><br/>
            We strive to provide an online platform where book enthusiasts can find 
            their next great read, connect with like-minded individuals, and 
            explore an ever-expanding literary universe.
          </p>
        </div>

        {/* Unique Features */}
        <div className="bg-white p-8 shadow-lg rounded-xl w-3/4 mx-auto h-auto transition-transform duration-300 hover:scale-105 flex flex-col cursor-pointer hover:shadow-xl hover:shadow-purple-500">
          <h3 className="text-xl font-bold text-purple-800 mb-3 text-center">What Sets Us Apart?</h3>
          <ul className="text-gray-600 list-disc pl-5">
            <li>A vast collection across multiple genres, including rare and antique books.</li>
            <li>Personalized book recommendations using AI-driven algorithms.</li>
            <li>Special editions, signed copies, and collector's items.</li>
            <li>Dedicated support for independent authors and self-published works.</li>
            <li>Fast and reliable doorstep delivery with eco-friendly packaging.</li>
            <li>Interactive features such as book discussions, live author Q&A, and more.</li>
          </ul>
        </div>

        {/* Community & Engagement */}
        <div className="bg-white p-8 shadow-lg rounded-xl w-3/4 mx-auto h-auto transition-transform duration-300 hover:scale-105 flex flex-col cursor-pointer hover:shadow-xl hover:shadow-purple-500">
          <h3 className="text-xl font-bold text-purple-800 mb-3 text-center">Join Our Reading Community</h3>
          <p className="text-gray-600">
            Books are best enjoyed when shared! At Wizard’s Bookstore, we foster 
            an engaging community where readers can connect, share reviews, 
            participate in book clubs, and join virtual discussions.  
            <br/><br/>
            Whether you prefer fantasy, science fiction, historical fiction, or 
            non-fiction, our forums and reading groups offer a space where you 
            can discover books that align with your interests.
          </p>
        </div>

        {/* Stay Updated */}
        <div className="bg-white p-8 shadow-lg rounded-xl w-3/4 mx-auto h-auto transition-transform duration-300 hover:scale-105 flex flex-col cursor-pointer hover:shadow-xl hover:shadow-purple-500">
          <h3 className="text-xl font-bold text-purple-800 mb-3 text-center">Stay Updated!</h3>
          <p className="text-gray-600">
            Never miss an exciting book launch or an exclusive deal!  
            <br/><br/>
            Subscribe to our newsletter for early access to new releases, limited-time discounts, author interviews, and surprise book drops.  
            <br/><br/>
            Follow us on social media to stay connected and join our interactive events.
          </p>
        </div>

        {/* Customer Support */}
        <div className="bg-white p-8 shadow-lg rounded-xl w-3/4 mx-auto h-auto transition-transform duration-300 hover:scale-105 flex flex-col cursor-pointer hover:shadow-xl hover:shadow-purple-500">
          <h3 className="text-xl font-bold text-purple-800 mb-3 text-center">24/7 Customer Support</h3>
          <p className="text-gray-600">
            Have a query or need assistance? Our friendly support team is available 
            24/7 to help you with book recommendations, order tracking, and any 
            other concerns.  
            <br/><br/>
            We value your reading experience and are committed to providing 
            exceptional service to make your journey with us smooth and enjoyable.
          </p>
        </div>

        {/* Reading Challenges */}
        <div className="bg-white p-8 shadow-lg rounded-xl w-3/4 mx-auto h-auto transition-transform duration-300 hover:scale-105 flex flex-col cursor-pointer hover:shadow-xl hover:shadow-purple-500">
          <h3 className="text-xl font-bold text-purple-800 mb-3 text-center">Reading Challenges</h3>
          <p className="text-gray-600">
            Looking for motivation to read more? Participate in our reading challenges, where you can:
            <ul className="list-disc pl-5 mt-2">
              <li>Explore different genres and authors.</li>
              <li>Win exciting prizes and exclusive discounts.</li>
              <li>Compete with fellow book lovers for fun achievements.</li>
              <li>Expand your knowledge and perspective through diverse books.</li>
            </ul>
          </p>
        </div>

        {/* Sustainability */}
        <div className="bg-white p-8 shadow-lg rounded-xl w-3/4 mx-auto h-auto transition-transform duration-300 hover:scale-105 flex flex-col cursor-pointer hover:shadow-xl hover:shadow-purple-500">
          <h3 className="text-xl font-bold text-purple-800 mb-3 text-center">Sustainability & Eco-Friendly Practices</h3>
          <p className="text-gray-600">
            We care about the environment! At Wizard’s Bookstore, we are committed to reducing our carbon footprint through:
            <ul className="list-disc pl-5 mt-2">
              <li>Eco-friendly book packaging and shipping materials.</li>
              <li>Digital books and audiobooks to reduce paper waste.</li>
              <li>Supporting publishers that prioritize sustainable printing practices.</li>
              <li>Recycling and book donation programs to promote responsible book usage.</li>
            </ul>
          </p>
        </div>

      </div>

      <div className="text-center mt-10">
        <p className="text-gray-700 py-10">
          <span className="font-bold text-purple-800 text-xl">Follow us on social media and be part of the magic!</span>
        </p>
      </div>

      <Footer /> 
    </div>
  );
};

export default AboutUsComponent;
