import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200/50">
      <div className="bg-gradient-to-b from-primary/5 to-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()}{" "}
              <span className="font-semibold">Elite</span>
              <span className="text-primary font-semibold">Hire.</span>
              <span className="ml-1">All rights reserved.</span>
            </div>

            <nav className="flex space-x-6 text-sm">
              <button className="text-gray-600 hover:text-primary transition-colors duration-200">
                Terms
              </button>
              <button className="text-gray-600 hover:text-primary transition-colors duration-200">
                Privacy
              </button>
              <button className="text-gray-600 hover:text-primary transition-colors duration-200">
                Contact
              </button>
            </nav>

            <div className="text-sm text-gray-600">
              Powered by{" "}
              <Link
                className="text-primary hover:text-primary/90 transition-colors duration-200 font-medium"
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
