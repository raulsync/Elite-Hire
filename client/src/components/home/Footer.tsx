import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white border-t border-red-100">
      <div className="bg-gradient-to-b from-red-50/30 to-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            {/* Brand and Copyright */}
            <div className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()}{" "}
              <span className="font-semibold">Elite</span>
              <span className="text-red-600 font-semibold">Hire.</span>
              <span className="ml-1">All rights reserved.</span>
            </div>

            {/* Navigation Links */}
            <nav className="flex space-x-6 text-sm">
              <button className="text-gray-600 hover:text-red-600 transition-colors duration-200">
                Terms
              </button>
              <button className="text-gray-600 hover:text-red-600 transition-colors duration-200">
                Privacy
              </button>
              <button className="text-gray-600 hover:text-red-600 transition-colors duration-200">
                Contact
              </button>
            </nav>

            {/* Powered By */}
            <div className="text-sm text-gray-600">
              Powered by{" "}
              <Link
                className="text-red-600 hover:text-red-700 transition-colors duration-200 font-medium"
                to="https://github.com/raulsync"
              >
                Rahul Anand
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
