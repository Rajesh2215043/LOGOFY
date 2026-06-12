"use client";
import React, { useState, useEffect } from "react";
import Lookup from "../_data/Lookup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

function Hero() {
  const [logoTitle, setLogoTitle] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeStep, setActiveStep] = useState(1);

  const carouselImages = [
    "/sample_1.jpg",
    "/sample_2.jpg",
    "/sample_3.jpg",
    "/sample_8.jpg",
    "/sample_10.jpg",
    "/sample_9.jpg",
    "/sample_7.jpg",
  ];

  useEffect(() => {
    setIsVisible(true);

    // Cycle through features
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);

    // Cycle through steps
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev < 5 ? prev + 1 : 1));
    }, 2000);

    return () => {
      clearInterval(featureInterval);
      clearInterval(stepInterval);
    };
  }, []);

  // Mouse parallax effect for hero title
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* input Section */}
      <div className="flex items-center mt-8 md:mt-15 flex-col gap-5 relative">
        {/* Decorative blobs in background */}
        <div className="absolute -z-10 top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute w-48 h-48 rounded-full bg-pink-100/30 blur-3xl top-1/4 -left-12 animate-pulse"></div>
          <div
            className="absolute w-72 h-72 rounded-full bg-purple-100/20 blur-3xl bottom-1/4 -right-12 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute w-60 h-60 rounded-full bg-blue-100/30 blur-3xl top-3/4 left-1/2 animate-pulse"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>
        <div
          className={`transition-all duration-1000 ${
            isVisible
              ? "opacity-100 transform-none"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2
            className="text-5xl md:text-7xl lg:text-9xl text-center font-extrabold font-mono relative"
            style={{
              transform: `translate(${mousePosition.x / 3}px, ${
                mousePosition.y / 3
              }px)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <span className="text-[#ed1e61] font-playwrite-hu inline-block hover:scale-110 transition-transform duration-300">
              L
            </span>
            <span className="text-black font-extrabold font-playwrite-hu inline-block hover:scale-110 transition-transform duration-300">
              O
            </span>
            <span className="text-[#ed1e61] font-playwrite-hu inline-block hover:scale-110 transition-transform duration-300">
              G
            </span>
            <span className="text-black font-extrabold font-playwrite-hu inline-block hover:scale-110 transition-transform duration-300">
              O
            </span>
            <span className="text-[#ed1e61] font-playwrite-hu inline-block hover:scale-110 transition-transform duration-300">
              F
            </span>
            <span className="text-primary font-playwrite-hu inline-block hover:scale-110 transition-transform duration-300">
              Y
            </span>
          </h2>
        </div>
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible
              ? "opacity-100 transform-none"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl text-center font-mono font-bold text-primary mt-10">
            <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
              AI-LOGO MAKER
            </span>
          </h2>
        </div>
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible
              ? "opacity-100 transform-none"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-5xl text-center font-bold font-host-grotesk mt-10 relative">
            <span className="relative z-10">{Lookup.HeroSubheading}</span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-pink-100 -z-10 transform -skew-x-3"></span>
          </h2>
        </div>
        <div
          className={`transition-all duration-1000 delay-700 ${
            isVisible
              ? "opacity-100 transform-none"
              : "opacity-0 translate-y-10"
          } mt-5`}
        >
          <p className="text-[#808080] text-xl text-center font-host-grotesk max-w-2xl">
            {Lookup.HeroDesc}
          </p>
        </div>
        <div
          className={`flex flex-col md:flex-row gap-6 w-full max-w-2xl mt-10 transition-all duration-1000 delay-900 ${
            isVisible
              ? "opacity-100 transform-none"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative w-full">
            <input
              placeholder={Lookup.InputTitlePlaceholder}
              className="p-3 border-2 border-[#ed1e61] rounded-lg w-full shadow-md focus:ring-4 focus:ring-pink-200 focus:border-primary transition-all duration-300 outline-none"
              onChange={(event) => setLogoTitle(event?.target.value)}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <Link
            href={"/create?title=" + logoTitle}
            className="w-full md:w-auto"
          >
            <Button className="w-full md:w-auto p-6 bg-gradient-to-r from-[#ed1e61] to-[#f05] text-white hover:from-black hover:to-gray-800 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-200/50">
              Get Started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
      {/* Carousel Section */}
      <div className="w-screen relative left-[50%] right-[50%] mx-[-50vw] mt-20 overflow-hidden">
        <h2
          className="text-3xl font-bold text-center mb-12 font-mono relative inline-block"
          style={{ left: "50%", transform: "translateX(-50%)" }}
        >
          <span className="relative z-10">STUNNING DESIGNS</span>
          <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#ed1e61]/20 -z-10"></span>
        </h2>

        <div className="flex animate-scroll gap-5 py-4">
          {/* First set of images */}
          {carouselImages.map((image, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 w-[300px] h-[300px] relative group perspective"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
              <Image
                src={image}
                alt={`Design ${index + 1}`}
                fill
                className="rounded-lg shadow-md object-contain opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110 group-hover:z-10 group-hover:shadow-lg"
                priority={index < 3}
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {carouselImages.map((image, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 w-[300px] h-[300px] relative group perspective"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
              <Image
                src={image}
                alt={`Design ${index + 1}`}
                fill
                className="rounded-lg shadow-md object-contain opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110 group-hover:z-10 group-hover:shadow-lg"
                priority={index < 3}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Features Section - Updated Design */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-pink-50 rounded-full mb-4">
            <span className="text-pink-600 text-sm font-semibold">
              FEATURES
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-6">
            CUTTING-EDGE LOGO DESIGN TECHNOLOGY
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our powerful platform combines AI and design expertise to deliver
            exceptional results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="bg-white rounded-2xl shadow-md p-8 transition-all duration-300 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#ed1e61] hover:scale-105">
            <div className="bg-pink-50 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-[#ed1e61]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.9 2H9.1C8.42 2 7.46 2.4 6.98 2.88L2.88 6.98C2.4 7.46 2 8.42 2 9.1V14.9C2 15.58 2.4 16.54 2.88 17.02L6.98 21.12C7.46 21.6 8.42 22 9.1 22H14.9C15.58 22 16.54 21.6 17.02 21.12L21.12 17.02C21.6 16.54 22 15.58 22 14.9V9.1C22 8.42 21.6 7.46 21.12 6.98L17.02 2.88C16.54 2.4 15.58 2 14.9 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5 15.5L15.5 8.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.5 15.5L8.5 8.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">AI-Powered Creation</h3>
            <p className="text-gray-600">
              Our advanced AI analyzes millions of professional logos to
              generate unique, tailored designs for your brand.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white rounded-2xl shadow-md p-8 transition-all duration-300 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#ed1e61] hover:scale-105">
            <div className="bg-pink-50 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-[#ed1e61]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 22h-10C4.01 22 2 19.99 2 16.5v-10C2 3.01 4.01 1 7.5 1h10C20.99 1 23 3.01 23 6.5v10c0 3.49-2.01 5.5-5.5 5.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.9 12v-1.95c0-1.05.81-1.91 1.81-1.91h2.55c1.8 0 2.49-.85 2.49-1.88 0-.98.34-1.26 1.34-1.26.34 0 .61.28.61.62 0 2.21-1.62 4.01-3.61 4.01h-2.55c-.26 0-.47.21-.47.47v1.9h5.28"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 22v-3M2 13h4M2 9h3M2 5h2M17 3.99c1.31 0 2.51.55 3.35 1.44M22 7.59c0 .18-.01.35-.03.53"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 12v3M14.5 12h-5c-.55 0-1 .45-1 1v1.5c0 .55.45 1 1 1h5c.55 0 1-.45 1-1V13c0-.55-.45-1-1-1Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Custom Color Palettes</h3>
            <p className="text-gray-600">
              Choose from professionally curated color combinations or create
              your own perfect palette.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white rounded-2xl shadow-md p-8 transition-all duration-300 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#ed1e61] hover:scale-105">
            <div className="bg-pink-50 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-[#ed1e61]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.59 12.4v4.87c0 .33-.16.65-.44.85-.15.1-.32.17-.49.19-.13.02-.26.03-.38.03h-4.67c-.22 0-.44-.02-.65-.07-1.68-.39-2.41-1.34-2.41-3.17V12.4c0-.36.29-.65.65-.65h7.74c.36 0 .65.29.65.65Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.13 6.2v5.55H8.21c-.36 0-.65.29-.65.65v2.69c0 .4-.32.72-.71.65a3.27 3.27 0 0 1-2.58-3.48V6.19c0-.72.41-1.36 1.07-1.65 1.17-.52 3.9-1.51 6.99-1.5h.05c2.88 0 5.17.67 7.3 1.49.35.13.39.62.05.79-.97.5-2.09 1.26-2.09 1.26-.3.18-.49.51-.49.86v5.3h-1.03a.65.65 0 0 0-.65.65v2.22c0 .53-.46.88-.95.73-.48-.15-.91-.38-1.28-.68a.652.652 0 0 1-.26-.52v-1.75c0-.36-.29-.65-.65-.65h-.94V6.2c0-.36-.29-.65-.65-.65h-1.3c-.36 0-.65.29-.65.65Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 14v1c0 3.78 1.14 5.85 3.86 6.62.54.15 1.13.26 1.78.32a26.32 26.32 0 0 0 3.28.06h6.71c.71-.08 1.42-.2 2.1-.38 2.45-.64 3.79-2.21 4.17-5.08.06-.4.09-.82.1-1.27.01-.2.01-.4 0-.6V8c0-4.14-1.4-5.95-4.28-6.65-.57-.14-1.21-.24-1.9-.3-.28-.02-.57-.04-.87-.04h-8.79c-.31 0-.61.01-.91.04-.68.05-1.3.15-1.86.28C3.42 1.92 2.32 3.04 2 5.05"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Precise Customization</h3>
            <p className="text-gray-600">
              Fine-tune every aspect of your logo with our intuitive design
              controls.
            </p>
          </div>

          {/* Feature Card 4 */}
          <div className="bg-white rounded-2xl shadow-md p-8 transition-all duration-300 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#ed1e61] hover:scale-105">
            <div className="bg-pink-50 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-[#ed1e61]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 2v7h9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 6v9c0 5-2 7-7 7H9c-5 0-7-2-7-7V9c0-5 2-7 7-7h9c2.28 0 3.93.5 5 1.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 16h4M7 12h10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Multi-Format Export</h3>
            <p className="text-gray-600">
              Download your logo in PNG, SVG, JPG, and other formats optimized
              for any use.
            </p>
          </div>

          {/* Feature Card 5 */}
          <div className="bg-white rounded-2xl shadow-md p-8 transition-all duration-300 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#ed1e61] hover:scale-105">
            <div className="bg-pink-50 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-[#ed1e61]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.59 14.369c.1 2.13-1.55 3.97-3.64 3.97-1.49 0-2.78-.94-3.29-2.25a3.3 3.3 0 0 1-.17-1.72c.1-2.13 1.55-3.97 3.64-3.97 2.08 0 3.56 1.84 3.46 3.97ZM12 7.969v1M12 19.969v-1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 14a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.07 3.32c-.75-1.12-1.97-1.82-3.31-1.82-2.31 0-3.92 1.9-3.7 4.16a3.747 3.747 0 0 0 3.7 3.29h.57M17.94 7.77c.75 1.12 1.97 1.82 3.31 1.82 2.31 0 3.92-1.9 3.7-4.16a3.747 3.747 0 0 0-3.7-3.29h-.57"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Smart Recommendations</h3>
            <p className="text-gray-600">
              Get AI-powered suggestions for improvements based on design
              principles and industry trends.
            </p>
          </div>

          {/* Feature Card 6 */}
          <div className="bg-white rounded-2xl shadow-md p-8 transition-all duration-300 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#ed1e61] hover:scale-105">
            <div className="bg-pink-50 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-[#ed1e61]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.01 2.92l5.9 2.62c1.7.75 1.7 1.99 0 2.74l-5.9 2.62c-.67.3-1.77.3-2.44 0l-5.9-2.62c-1.7-.75-1.7-1.99 0-2.74l5.9-2.62c.67-.3 1.77-.3 2.44 0Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 11v6c0 1.5 1.13 2 2 2l8 3 8-3c.87 0 2-.5 2-2v-6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 22V13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Instant Generation</h3>
            <p className="text-gray-600">
              Create multiple professional logo options in seconds, not days or
              weeks.
            </p>
          </div>
        </div>
      </div>
      {/* AI-RECOMMENDED LOGO IDEAS */}
      <div className="bg-gray-100 w-screen relative left-[50%] right-[50%] mx-[-50vw] mt-10 py-20 overflow-hidden">
        <div className="w-full">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="relative w-full md:w-1/2">
              <div className="absolute top-4 left-4 w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 rounded-3xl -z-10 transform rotate-3"></div>
              <div className="relative h-[500px] w-full">
                <Image
                  src="/AI.jpg"
                  alt="Image 1"
                  fill
                  className="object-cover shadow-lg border-4 border-white rounded-3xl opacity-90 transition-all duration-700 hover:scale-105"
                  priority
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 p-8 text-center md:text-right">
              <div className="px-4 py-2 bg-pink-50 rounded-full inline-block mb-4">
                <h3 className="text-pink-600 text-sm font-semibold">
                  NEXT-GEN TECHNOLOGY
                </h3>
              </div>
              <br />
              <h1 className="text-3xl font-bold text-[#ed1e61] font-mono relative inline-block">
                AI-RECOMMENDED LOGO IDEAS
                <span className="absolute -bottom-2 right-0 w-24 h-2 bg-[#ed1e61]/20"></span>
              </h1>
              <p className="text-gray-600 text-2xl text-justify mt-10 mb-10 leading-relaxed">
                Get AI-recommended logo ideas tailored to your brand! Our
                intelligent design suggestions ensure creativity and uniqueness.
                Powered by advanced AI algorithms, we analyze your brand's
                personality and industry to create stunning logos that perfectly
                match your identity and target audience.
              </p>
              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="mt-6 bg-[#ed1e61] text-white px-8 py-4 rounded-full hover:bg-black transition duration-300 text-lg font-semibold shadow-xl hover:shadow-pink-200/40"
              >
                Explore
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Color Palettes Section */}
      <div className="relative w-full max-w-4xl mx-auto mt-20 mb-16">
        <div className="absolute -left-4 top-0 w-62 h-62 bg-yellow-100 rounded-3xl transform -rotate-12 z-10 overflow-hidden shadow-xl transition-transform duration-700 hover:rotate-0">
          <Image
            src="/pal1.png"
            alt="Sample Logo 1"
            fill
            className="object-cover rounded-3xl"
            style={{ transform: "scale(1.1)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-100/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div className="absolute left-32 -top-8 w-62 h-62 bg-pink-50 rounded-3xl transform rotate-12 z-20 overflow-hidden shadow-xl transition-transform duration-700 hover:rotate-0">
          <Image
            src="/pal5.png"
            alt="Sample Logo 2"
            fill
            className="object-cover rounded-3xl"
            style={{ transform: "scale(1.1)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-100/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div className="absolute right-24 top-4 w-62 h-62 bg-blue-50 rounded-3xl transform -rotate-6 z-30 overflow-hidden shadow-xl transition-transform duration-700 hover:rotate-0">
          <Image
            src="/pal3.png"
            alt="Sample Logo 3"
            fill
            className="object-cover rounded-3xl"
            style={{ transform: "scale(1.1)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-100/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div className="absolute -right-8 -top-4 w-62 h-62 bg-purple-50 rounded-3xl transform rotate-12 z-10 overflow-hidden shadow-xl transition-transform duration-700 hover:rotate-0">
          <Image
            src="/pal4.png"
            alt="Sample Logo 4"
            fill
            className="object-cover rounded-3xl"
            style={{ transform: "scale(1.1)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-100/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div className="text-center pt-64 pb-8">
          <div className="inline-block px-4 py-2 bg-pink-50 rounded-full mb-4">
            <h4 className="text-pink-600 text-sm font-semibold">
              COLOR PALETTES
            </h4>
          </div>
          <br />
          <h3 className="text-[#ed1e61] text-3xl font-bold mb-4 mt-10 relative inline-block">
            MORE COLORS THAN YOU CAN IMAGINE
            <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#ed1e61]/20"></span>
          </h3>
          <p className="text-gray-600 text-2xl font-semibold text-center mt-10 max-w-md mx-auto">
            Explore our curated collection of professional color combinations.
            From vibrant and bold to subtle and sophisticated, find the perfect
            palette for your brand identity.
          </p>
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-6 bg-gradient-to-r from-[#ed1e61] to-[#f05] text-white px-8 py-4 rounded-full hover:from-black hover:to-gray-800 transition-all duration-300 text-lg font-semibold shadow-xl hover:shadow-pink-200/40 transform hover:translate-y-[-5px]"
          >
            Explore
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2 inline-block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Button>
        </div>
      </div>
      {/* More Styles Section */}
      <div className=" bg-gray-100 w-screen relative left-[50%] right-[50%] mx-[-50vw] mt-10 py-20 overflow-hidden">
        <div className="w-full">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 text-center md:text-left p-8">
              <div className="inline-block px-4 py-2 bg-purple-50 rounded-full mb-4">
                <h4 className="text-[#ed1e9b] text-sm font-semibold">
                  DESIGN STYLES
                </h4>
              </div>
              <br />
              <h1 className="text-3xl font-bold text-primary font-mono relative inline-block">
                MORE STYLES THAN YOU CAN THINK
                <span className="absolute -bottom-2 left-0 w-24 h-2 bg-primary/20"></span>
              </h1>
              <p className="text-gray-600 text-2xl text-justify mt-10 mb-10 font-mono leading-relaxed">
                Discover an endless variety of logo styles tailored to your
                vision. From sleek and modern to bold and intricate, we offer
                more designs than you can imagine to make your brand stand out!
              </p>
              <div className="flex flex-wrap gap-3 mb-8 justify-center md:justify-start">
                {[
                  "Minimalist",
                  "Vintage",
                  "3D",
                  "Abstract",
                  "Geometric",
                  "Hand-drawn",
                ].map((style, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600 hover:bg-primary hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    {style}
                  </span>
                ))}
              </div>
              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="mt-6 bg-gradient-to-r from-[#ed1e61] to-[#f05] text-white px-8 py-4 rounded-full hover:from-black hover:to-gray-800 transition-all duration-300 text-lg font-semibold shadow-xl hover:shadow-pink-200/40 transform hover:translate-y-[-5px]"
              >
                Explore
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Button>
            </div>
            <div className="relative w-full md:w-1/2">
              <div className="absolute top-4 right-4 w-full h-full bg-gradient-to-br from-purple-200 to-blue-200 rounded-3xl -z-10 transform -rotate-3"></div>
              <div className="relative h-[500px] w-full">
                <Image
                  src="/pc1.jpg"
                  alt="Image 1"
                  fill
                  className="object-cover shadow-md border-4 border-white rounded-3xl transition-all duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-purple-600 shadow-md">
                  15+ Design Styles
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }

        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-300px * 7 - 5rem));
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .perspective {
          perspective: 1000px;
        }
      `}</style>
    </>
  );
}

export default Hero;
