import { useNavigate } from "react-router-dom";
import { BsBoxArrowInRight, BsBoxArrowRight, BsList, BsX, BsSpeedometer2 } from "react-icons/bs";
import { nav } from "./data";
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import auth from "../../../services/firebase";
import { signOut } from "firebase/auth";

export default function Navbar_() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const filteredLinks = nav.nav_links;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0b1a09]/95 backdrop-blur-md shadow-lg py-3 border-b border-white/5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center shrink-0">
            <img
              className="h-9 w-auto"
              src="./assets/logo/artemis-brand.png"
              alt="Artemis"
            />
          </a>

          {/* Desktop Nav — centered */}
          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {filteredLinks.map((data) => (
              <a
                key={data.name}
                href={data.reference}
                className="text-xs uppercase font-bold tracking-[0.15em] text-white/75 hover:text-[#8ecb6a] transition-colors duration-200 no-underline"
              >
                {data.name}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <a
                  href="/dashboard"
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all no-underline border border-transparent hover:border-white/10"
                >
                  <BsSpeedometer2 className="w-4 h-4" />
                  Dashboard
                </a>
                <span className="w-px h-4 bg-white/15" />
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all cursor-pointer border border-transparent hover:border-white/10"
                >
                  <BsBoxArrowRight className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all no-underline border border-transparent hover:border-white/10"
                >
                  <BsBoxArrowInRight className="w-4 h-4" />
                  Login
                </a>
                <a
                  href="#contact"
                  className="bg-[#216604] hover:bg-[#62A944] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg transition-all duration-200 shadow-lg shadow-[#216604]/20 no-underline"
                >
                  Book a Demo
                </a>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <BsList className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-72 bg-[#0b1a09] border-l border-white/10 shadow-2xl p-8 flex flex-col">
            <div className="flex items-center justify-between mb-10">
              <img
                className="h-8 w-auto"
                src="./assets/logo/artemis-brand.png"
                alt="Artemis"
              />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsOpen(false)}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg"
              >
                <BsX className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30 mb-3 px-3">
                Navigation
              </p>
              {filteredLinks.map((data) => (
                <a
                  key={data.name}
                  href={data.reference}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-semibold text-white/70 hover:text-[#8ecb6a] no-underline px-4 py-3 hover:bg-white/5 rounded-xl transition-colors"
                >
                  {data.name}
                </a>
              ))}

              <div className="mt-auto pt-6 border-t border-white/10 space-y-3">
                {user ? (
                  <>
                    <a
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="w-full px-5 py-3.5 rounded-xl flex items-center justify-center gap-3 text-white/80 border border-white/20 font-bold hover:bg-white/10 transition-colors no-underline"
                    >
                      <BsSpeedometer2 className="w-5 h-5" />
                      Dashboard
                    </a>
                    <button
                      type="button"
                      onClick={() => { handleSignOut(); setIsOpen(false); }}
                      className="w-full px-5 py-3.5 rounded-xl flex items-center justify-center gap-3 text-white bg-red-600/80 font-bold hover:bg-red-600 transition-colors"
                    >
                      <BsBoxArrowRight className="w-5 h-5" />
                      Logout
                    </button>
                  </>
                ) : (
                  <a
                    href="/login"
                    className="w-full px-5 py-3.5 rounded-xl flex items-center justify-center gap-3 text-white/80 border border-white/20 font-bold hover:bg-white/10 transition-colors no-underline"
                    onClick={() => setIsOpen(false)}
                  >
                    <BsBoxArrowInRight className="w-5 h-5" />
                    Login
                  </a>
                )}
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full px-5 py-3.5 rounded-xl flex items-center justify-center bg-[#216604] text-white font-bold hover:bg-[#62A944] transition-colors no-underline shadow-lg"
                >
                  Book a Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
