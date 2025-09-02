import { useState, useEffect } from "react";
import { ImageWithFallback } from "./FallbackUI/ImageWithFallback";

const carouselData = [
  {
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&crop=faces",
    tagline: "Where code meets heart",
    subtitle:
      "Connect with developers who share your passion for building amazing things",
  },
  {
    image:
      "https://images.unsplash.com/photo-1595617795501-9661aafda72a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    tagline: "The real vibe coding ",
    subtitle: "Find someone who understands your late-night coding sessions",
  },
  {
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop&crop=faces",
    tagline: "Pair programming for life",
    subtitle:
      "Meet developers who complement your skills and complete your heart",
  },
  {
    image:
      "https://images.unsplash.com/photo-1584014981626-38adf5fca8ff?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tagline: "Stack overflow for friendships",
    subtitle: "Get answers to all your dating questions from fellow developers",
  },
];

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={carouselData[currentIndex].image}
          alt="Developer community"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-gray-200 px-8 max-w-lg font-geist">
        <h1 className="mb-2 animate-fade-in text-2xl">
          {carouselData[currentIndex].tagline}
        </h1>
        <p className="text-lg opacity-90 animate-fade-in">
          {carouselData[currentIndex].subtitle}
        </p>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary-foreground"
                  : "bg-primary-foreground/40 hover:bg-primary-foreground/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
