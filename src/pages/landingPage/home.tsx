import { useRef } from "react";
import { home } from "./data";

export default function Home() {
  const ref: any = useRef(null);

  return (
    <div className="relative w-full h-screen min-h-[500px] flex items-center bg-[url('/assets/img/bg-img.png')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="absolute inset-0 bg-primary/80 z-0"></div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center text-white">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {home.front_text}
            </h1>
            <button className="bg-tertiary text-white px-8 py-3 rounded-md font-semibold text-lg hover:bg-secondary transition-colors shadow-md w-fit">
              Contact Us
            </button>
          </div>
        </div>
        <div className="hidden md:block"></div>
      </div>
    </div>
  );
}
