import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="w-full bg-white px-6 py-16 overflow-hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-10">

        {/* Left Content */}
        <div className="flex flex-col gap-5 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Explore the secrects <br /> of Nature
          </h1>
          <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-sm">
            Read Articles that holds the gems of Nature
          </p>
          <div className="flex items-center gap-3 mt-1">
            <Link to="/signup">
              <Button className="bg-gray-900 text-white hover:bg-gray-700 px-5 h-10 text-sm font-medium rounded-md">
                Get Started
              </Button>
            </Link>
            <Link to="/about">
              <Button
                variant="outline"
                className=" text-gray-800 hover:bg-gray-200 px-5 h-10 text-sm font-medium rounded-md"
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