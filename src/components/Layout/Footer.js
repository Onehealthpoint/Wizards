const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="footer-section">
          <h4 className="text-lg font-bold mb-4">About Us</h4>
          <p className="text-sm">
            We are committed to providing the best services and solutions.
          </p>
        </div>
        <div className="footer-section">
          <h4 className="text-lg font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="text-sm hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="text-sm hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="text-sm hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="text-sm hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4 className="text-lg font-bold mb-4">Contact</h4>
          <p className="text-sm">Email: info@example.com</p> {/*svg icon*/}
          <p className="text-sm">Phone: +123 456 789</p>
        </div>
      </div>
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;