import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white border-t border-red-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center text-sm">
          <p className="text-black-600">
            &copy; {new Date().getFullYear()} Elite{" "}
            <span className="text-red-600">Hire.</span> All rights reserved.
          </p>
          <p>
            {" "}
            Powered by{" "}
            <Link
              className="text-red-700"
              to="https://github.com/raulsync"
            >
              {" "}
              Rahul Anand{" "}
            </Link>
          </p>
          <nav className="space-x-4">
            <span className="text-red-600 hover:text-red-800  cursor-pointer">
              Terms
            </span>
            <span className="text-red-600 hover:text-red-800 cursor-pointer">
              Privacy
            </span>
            <span className="text-red-600 hover:text-red-800  cursor-pointer">
              Contact
            </span>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
