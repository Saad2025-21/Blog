import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
  <section
  className="relative w-full h-screen bg-cover bg-center flex items-end pb-16"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80')",
  }}
>
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/45" />

  {/* Bottom caption bar — mirrors the "Flora Fauna / Saving Nature" strip */}
  <div className="absolute bottom-0 left-0 w-full flex items-center justify-between px-10 py-4 z-10">
    <span className="text-white/70 text-sm tracking-widest uppercase">Flora Fauna</span>
    <span className="text-white/70 text-sm tracking-widest uppercase">Saving Nature</span>
  </div>

  {/* Hero Content */}
  <div className="relative z-10 mx-auto w-full max-w-7xl px-10 pb-8">
    <div className="flex flex-col gap-6 max-w-2xl">

      <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight">
        Explore the Secrets <br /> of Nature
      </h1>

      <div className="flex flex-col md:flex-row gap-6 md:gap-16">
        <p className="text-sm md:text-base text-white/75 leading-relaxed max-w-xs">
          Our shared purpose is to protect the diversity of life on Earth, for the survival of the planet and its people.
        </p>
        <p className="text-sm md:text-base text-white/75 leading-relaxed max-w-xs">
          Read articles that hold the gems of nature, written by explorers and naturalists worldwide.
        </p>
      </div>

      <div className="flex items-center gap-4 mt-2">
        <Link to="/signup">
          <Button className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/40 text-white hover:bg-white/30 px-6 h-11 text-sm font-medium rounded-full transition-all">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
           Get Started
          </Button>
        </Link>
        <Link to="/about">
          <Button
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/10 px-5 h-11 text-sm font-medium rounded-full"
          >
            Learn More
          </Button>
        </Link>
      </div>

    </div>
  </div>
</section>
  );
}