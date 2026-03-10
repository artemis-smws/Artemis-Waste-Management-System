import { NavLink, Link } from "react-router-dom";
import { BsBoxArrowInRight, BsList, BsX } from "react-icons/bs";
import { nav } from "./data";
import { useState } from "react";

// linked to single page references using useRef
interface Props {
  handleFeature?: () => void;
  handleAbout?: () => void;
  handleContact?: () => void;
}

export default function Navbar_({
  handleFeature,
  handleAbout,
  handleContact,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="w-full flex justify-between items-center absolute top-0 z-50 px-6 py-4 bg-transparent">
        <a href="/" className="flex items-center">
          <img
            height="40px"
            className="h-10 w-auto"
            src="./assets/logo/artemis-brand.png"
            alt="artemis brand"
          />
        </a>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden p-2 text-white hover:bg-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
        >
          <BsList className="w-6 h-6" />
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex justify-end gap-6 w-full font-normal items-center ml-10">
          {nav.nav_links.map((data) => (
            <a
              key={data.name}
              href={data.reference}
              className="uppercase font-semibold text-white no-underline hover:text-gray-200 transition-colors"
            >
              {data.name}
            </a>
          ))}
          <a
            href="/login"
            className="px-4 py-2 rounded-md flex items-center gap-3 text-white no-underline font-semibold bg-white/10 hover:bg-white/20 transition-colors ml-4"
          >
            <BsBoxArrowInRight className="w-5 h-5" />
            Login
          </a>
        </div>
      </nav>

      {/* Mobile Offcanvas */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="fixed inset-y-0 right-0 w-64 bg-[#216604] shadow-xl p-6 flex flex-col transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between mb-8">
              <img
                height="40px"
                className="h-10 w-auto"
                src="./assets/logo/artemis-brand.png"
                alt="artemis brand"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-white hover:bg-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              >
                <BsX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              {nav.nav_links.map((data) => (
                <a
                  key={data.name}
                  href={data.reference}
                  onClick={() => setIsOpen(false)}
                  className="uppercase font-semibold text-white no-underline px-2 py-2 hover:bg-white/10 rounded-md transition-colors"
                >
                  {data.name}
                </a>
              ))}
              <a
                href="/login"
                className="px-4 py-3 mt-4 rounded-md flex items-center justify-center gap-3 text-[#216604] bg-white no-underline font-semibold hover:bg-gray-100 transition-colors"
              >
                <BsBoxArrowInRight className="w-5 h-5" />
                Login
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
