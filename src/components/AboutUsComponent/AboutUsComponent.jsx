import React from "react";

const AboutUsComponent = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          About Wizard’s Bookstore
        </h2>

        <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
          Welcome to <span className="font-semibold">Wizard’s Bookstore</span>, 
          a magical haven for book lovers! Our goal is to make reading an 
          immersive and enchanting experience by offering a vast collection of 
          books across multiple genres.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission & Vision */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Our Mission & Vision
            </h3>
            <p className="text-gray-600">
              At Wizard’s Bookstore, we believe books are magical portals to 
              knowledge, imagination, and discovery. Our mission is to make 
              books accessible to everyone while building a community of 
              passionate readers.
            </p>
          </div>

          {/* Unique Features */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              What Sets Us Apart?
            </h3>
            <ul className="text-gray-600 list-disc pl-5">
              <li>A vast collection across multiple genres.</li>
              <li>Personalized book recommendations.</li>
              <li>Special editions and rare finds.</li>
              <li>Support for independent authors.</li>
              <li>Fast and reliable delivery.</li>
            </ul>
          </div>

          {/* Community & Engagement */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Join Our Reading Community
            </h3>
            <p className="text-gray-600">
              Connect with fellow book lovers through our book clubs, discussion 
              forums, and interactive reading challenges. Be part of a literary 
              journey where stories come to life!
            </p>
          </div>

          {/* Stay Updated */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Stay Updated!
            </h3>
            <p className="text-gray-600">
              Subscribe to our newsletter for exclusive book releases, discounts, 
              and surprise book drops.
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-700">
            Follow us on social media and be part of the magic!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsComponent;
