import React from "react";
import heroBackgroundImage from "../assets/hero-image.jpg";

export default function HeroSection({ onShopNowClick }) {
  return (
    <section
      className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBackgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 p-6">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-down">
          Fresh Groceries, Delivered Fast
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in-up">
          Quality you can taste, convenience you can trust. Shop our selection
          of fresh produce, meats, and pantry staples.
        </p>
        <button
          onClick={onShopNowClick}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105"
        >
          Shop Now
        </button>
      </div>
    </section>
  );
}
