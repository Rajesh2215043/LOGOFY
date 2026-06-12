"use client";
import React, { useState, useEffect } from "react";
import Lookup from "../_data/Lookup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";

// Stagger variants for the hero text
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const titleLetterVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: { type: "spring", damping: 12, stiffness: 100 }
  },
};

function Hero() {
  const [logoTitle, setLogoTitle] = useState("");
  const router = useRouter();

  const handleGetStarted = (e) => {
    e.preventDefault();
    if (!logoTitle.trim()) return;
    router.push("/create?title=" + logoTitle);
  };

  const [activeFeature, setActiveFeature] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const carouselImages = [
    "/sample_1.jpg", "/sample_2.jpg", "/sample_3.jpg", "/sample_8.jpg",
    "/sample_10.jpg", "/sample_9.jpg", "/sample_7.jpg",
  ];

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
    <div className="pt-24 md:pt-32 pb-10">
      {/* Input Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center mt-8 md:mt-15 flex-col gap-5 relative px-4"
      >
        {/* Decorative blobs in background */}
        <div className="absolute -z-10 top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ y: [0, -30, 0], scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-48 h-48 rounded-full bg-pink-300/30 blur-3xl top-1/4 -left-12"
          />
          <motion.div
            animate={{ y: [0, 40, 0], scale: [1, 1.1, 1], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute w-72 h-72 rounded-full bg-purple-300/20 blur-3xl bottom-1/4 -right-12"
          />
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute w-60 h-60 rounded-full bg-blue-300/30 blur-3xl top-3/4 left-1/4 md:left-1/2"
          />
        </div>

        <motion.div variants={itemVariants}>
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl text-center font-extrabold font-mono relative flex justify-center gap-1 md:gap-2"
            style={{
              transform: `translate(${mousePosition.x / 3}px, ${mousePosition.y / 3}px)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            {['L', 'O', 'G', 'O', 'F', 'Y'].map((letter, index) => (
              <motion.span 
                key={index}
                variants={titleLetterVariants}
                whileHover={{ scale: 1.15, rotate: index % 2 === 0 ? 5 : -5, color: "#ed1e61" }}
                className={`${index % 2 === 0 ? 'text-[#ed1e61]' : index === 5 ? 'text-primary' : 'text-slate-900'} font-playwrite-hu inline-block cursor-default drop-shadow-sm`}
              >
                {letter}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl text-center font-mono font-bold mt-6 md:mt-10">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
              AI-LOGO MAKER
            </span>
          </h2>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold font-host-grotesk mt-6 md:mt-10 relative px-2">
            <span className="relative z-10 text-slate-800">{Lookup.HeroSubheading}</span>
            <span className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-3 md:h-4 bg-pink-200/60 -z-10 transform -skew-x-3"></span>
          </h2>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-5 px-4">
          <p className="text-slate-600 text-lg md:text-xl text-center font-host-grotesk max-w-2xl leading-relaxed">
            {Lookup.HeroDesc}
          </p>
        </motion.div>

        <motion.form 
          onSubmit={handleGetStarted}
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mt-8 md:mt-10 px-4"
        >
          <div className="relative w-full group">
            <input
              required
              placeholder={Lookup.InputTitlePlaceholder}
              className="p-4 border-2 border-pink-200 bg-white/80 backdrop-blur-sm rounded-xl w-full shadow-sm focus:ring-4 focus:ring-pink-200/50 focus:border-primary transition-all duration-300 outline-none text-lg text-slate-800 placeholder-slate-400"
              onChange={(event) => setLogoTitle(event?.target.value)}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-400 group-focus-within:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <Button type="submit" className="w-full sm:w-auto p-6 md:px-8 text-lg rounded-xl bg-gradient-to-r from-[#ed1e61] to-[#f05] text-white hover:from-black hover:to-gray-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-pink-500/30">
            Get Started
            <motion.svg animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </motion.svg>
          </Button>
        </motion.form>
      </motion.div>

      {/* Carousel Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="w-screen relative left-[50%] right-[50%] mx-[-50vw] mt-24 overflow-hidden py-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent -z-10" />
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 font-mono relative inline-block text-slate-800" style={{ left: "50%", transform: "translateX(-50%)" }}>
          <span className="relative z-10">STUNNING DESIGNS</span>
          <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#ed1e61]/20 -z-10 transform -skew-x-6"></span>
        </h2>

        <div className="flex animate-scroll gap-4 md:gap-6 py-4 px-4">
          {[...carouselImages, ...carouselImages].map((image, index) => (
            <div key={index} className="flex-shrink-0 w-[200px] h-[200px] md:w-[300px] md:h-[300px] relative group perspective">
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl md:rounded-2xl z-10 pointer-events-none"></div>
              <Image
                src={image}
                alt={`Design ${index + 1}`}
                fill
                className="rounded-xl md:rounded-2xl shadow-sm md:shadow-md object-contain opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105 group-hover:z-20 group-hover:shadow-xl bg-white/50 backdrop-blur-sm"
                priority={index < 3}
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 bg-pink-100/80 backdrop-blur-sm rounded-full mb-4 shadow-sm border border-pink-200">
            <span className="text-pink-600 text-sm font-bold tracking-wider">FEATURES</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">
            CUTTING-EDGE <br className="md:hidden"/> LOGO DESIGN
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
            Our powerful platform combines AI and design expertise to deliver exceptional results in seconds.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            { title: "AI-Powered Creation", desc: "Analyzes millions of professional logos to generate unique designs.", icon: "M14.9 2H9.1C8.42 2 7.46 2.4 6.98 2.88L2.88 6.98C2.4 7.46 2 8.42 2 9.1V14.9C2 15.58 2.4 16.54 2.88 17.02L6.98 21.12C7.46 21.6 8.42 22 9.1 22H14.9C15.58 22 16.54 21.6 17.02 21.12L21.12 17.02C21.6 16.54 22 15.58 22 14.9V9.1C22 8.42 21.6 7.46 21.12 6.98L17.02 2.88C16.54 2.4 15.58 2 14.9 2Z" },
            { title: "Custom Color Palettes", desc: "Professionally curated combinations or create your perfect palette.", icon: "M17.5 22h-10C4.01 22 2 19.99 2 16.5v-10C2 3.01 4.01 1 7.5 1h10C20.99 1 23 3.01 23 6.5v10c0 3.49-2.01 5.5-5.5 5.5Z" },
            { title: "Precise Customization", desc: "Fine-tune every aspect with intuitive design controls.", icon: "M15.59 12.4v4.87c0 .33-.16.65-.44.85-.15.1-.32.17-.49.19-.13.02-.26.03-.38.03h-4.67c-.22 0-.44-.02-.65-.07-1.68-.39-2.41-1.34-2.41-3.17V12.4c0-.36.29-.65.65-.65h7.74c.36 0 .65.29.65.65Z" },
            { title: "Multi-Format Export", desc: "Download in PNG, SVG, JPG optimized for any use.", icon: "M13 2v7h9" },
            { title: "Smart Recommendations", desc: "AI-powered suggestions based on design principles.", icon: "M15.59 14.369c.1 2.13-1.55 3.97-3.64 3.97-1.49 0-2.78-.94-3.29-2.25a3.3 3.3 0 0 1-.17-1.72c.1-2.13 1.55-3.97 3.64-3.97 2.08 0 3.56 1.84 3.46 3.97ZM12 7.969v1M12 19.969v-1" },
            { title: "Instant Generation", desc: "Create multiple professional options in seconds, not weeks.", icon: "M13.01 2.92l5.9 2.62c1.7.75 1.7 1.99 0 2.74l-5.9 2.62c-.67.3-1.77.3-2.44 0l-5.9-2.62c-1.7-.75-1.7-1.99 0-2.74l5.9-2.62c.67-.3 1.77-.3 2.44 0Z" }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, translateY: -5 }}
              className="bg-white/60 backdrop-blur-md rounded-2xl shadow-sm p-6 md:p-8 border-2 border-white/50 hover:border-pink-300 hover:shadow-xl hover:shadow-pink-100/50 transition-all duration-300 group cursor-default"
            >
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={feature.icon} />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 text-slate-800">{feature.title}</h3>
              <p className="text-slate-600 text-sm md:text-base">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI-RECOMMENDED LOGO IDEAS */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-screen relative left-[50%] right-[50%] mx-[-50vw] py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl -z-10 border-y border-white/60" />
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full md:w-1/2"
            >
              <div className="absolute top-4 -left-4 w-full h-full bg-gradient-to-br from-pink-300 to-purple-400 rounded-[2rem] md:rounded-[3rem] -z-10 transform rotate-3 opacity-60"></div>
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full">
                <Image
                  src="/AI.jpg"
                  alt="AI Logo Generation"
                  fill
                  className="object-cover shadow-2xl border-[6px] border-white rounded-[2rem] md:rounded-[3rem] transition-transform duration-700 hover:scale-105"
                />
              </div>
            </motion.div>
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full md:w-1/2 text-center md:text-right"
            >
              <div className="px-5 py-2 bg-pink-100/80 backdrop-blur-sm rounded-full inline-block mb-6 shadow-sm border border-pink-200">
                <h3 className="text-pink-600 text-xs sm:text-sm font-bold tracking-wider">NEXT-GEN TECHNOLOGY</h3>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 font-mono relative inline-block mb-8 leading-tight">
                AI-RECOMMENDED <br className="hidden md:block"/> LOGO IDEAS
                <span className="absolute -bottom-3 right-0 w-1/2 h-3 bg-pink-300/40 transform -skew-x-12"></span>
              </h1>
              <p className="text-slate-600 text-lg md:text-xl text-justify leading-relaxed mb-10 max-w-lg md:ml-auto">
                Get AI-recommended logo ideas tailored to your brand! Our intelligent design suggestions ensure creativity and uniqueness. Powered by advanced AI algorithms, we analyze your brand's personality and industry to create stunning logos that perfectly match your identity and target audience.
              </p>
              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="bg-primary text-white px-8 py-6 rounded-2xl hover:bg-black transition-all duration-300 text-lg font-semibold shadow-xl hover:shadow-pink-500/30 transform hover:-translate-y-1"
              >
                Start Exploring
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Color Palettes Section */}
      <div className="relative w-full max-w-5xl mx-auto mt-32 mb-24 px-4">
        {/* Floating Palettes */}
        <div className="hidden md:block relative h-[200px] mb-20">
          <motion.div 
            animate={{ y: [0, -15, 0], rotate: [-12, -10, -12] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 top-0 w-48 h-48 lg:w-64 lg:h-64 bg-white p-2 rounded-3xl shadow-2xl z-10"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image src="/pal1.png" alt="Palette 1" fill className="object-cover" />
            </div>
          </motion.div>
          <motion.div 
            animate={{ y: [0, 20, 0], rotate: [12, 15, 12] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute left-1/4 -top-10 w-48 h-48 lg:w-64 lg:h-64 bg-white p-2 rounded-3xl shadow-2xl z-20"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image src="/pal5.png" alt="Palette 2" fill className="object-cover" />
            </div>
          </motion.div>
          <motion.div 
            animate={{ y: [0, -10, 0], rotate: [-6, -4, -6] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute right-1/4 top-10 w-48 h-48 lg:w-64 lg:h-64 bg-white p-2 rounded-3xl shadow-2xl z-30"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image src="/pal3.png" alt="Palette 3" fill className="object-cover" />
            </div>
          </motion.div>
          <motion.div 
            animate={{ y: [0, 15, 0], rotate: [12, 10, 12] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute right-0 -top-5 w-48 h-48 lg:w-64 lg:h-64 bg-white p-2 rounded-3xl shadow-2xl z-10"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image src="/pal4.png" alt="Palette 4" fill className="object-cover" />
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center md:pt-16"
        >
          <div className="inline-block px-5 py-2 bg-pink-100/80 backdrop-blur-sm rounded-full mb-6 shadow-sm border border-pink-200">
            <h4 className="text-pink-600 text-xs sm:text-sm font-bold tracking-wider">COLOR PALETTES</h4>
          </div>
          <h3 className="text-slate-900 text-3xl sm:text-4xl md:text-5xl font-bold mb-6 relative inline-block leading-tight">
            MORE COLORS THAN <br className="md:hidden"/> YOU CAN IMAGINE
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-pink-300/40 transform skew-x-12"></span>
          </h3>
          <p className="text-slate-600 text-lg md:text-xl text-center mt-6 max-w-2xl mx-auto leading-relaxed">
            Explore our curated collection of professional color combinations. From vibrant and bold to subtle and sophisticated, find the perfect palette for your brand identity.
          </p>
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-10 bg-gradient-to-r from-primary to-[#f05] text-white px-8 py-6 rounded-2xl hover:from-black hover:to-gray-800 transition-all duration-300 text-lg font-semibold shadow-xl hover:shadow-pink-500/30 transform hover:-translate-y-1"
          >
            Discover Palettes
          </Button>
        </motion.div>
      </div>

      {/* More Styles Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-screen relative left-[50%] right-[50%] mx-[-50vw] py-24 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-purple-100/30 backdrop-blur-xl -z-10 border-y border-white/50" />
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-8">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2 text-center md:text-left"
            >
              <div className="inline-block px-5 py-2 bg-purple-100/80 backdrop-blur-sm rounded-full mb-6 shadow-sm border border-purple-200">
                <h4 className="text-purple-600 text-xs sm:text-sm font-bold tracking-wider">DESIGN STYLES</h4>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 font-mono relative inline-block mb-8 leading-tight">
                ENDLESS STYLE <br className="hidden md:block"/> POSSIBILITIES
                <span className="absolute -bottom-3 left-0 w-1/2 h-3 bg-purple-300/40 transform -skew-x-12"></span>
              </h1>
              <p className="text-slate-600 text-lg md:text-xl text-justify md:text-left leading-relaxed mb-10 max-w-lg mx-auto md:mx-0">
                Discover an endless variety of logo styles tailored to your vision. From sleek and modern to bold and intricate, we offer more designs than you can imagine to make your brand stand out!
              </p>
              <div className="flex flex-wrap gap-3 mb-10 justify-center md:justify-start">
                {["Minimalist", "Vintage", "3D", "Abstract", "Geometric", "Hand-drawn"].map((style, index) => (
                  <motion.span
                    whileHover={{ scale: 1.05, backgroundColor: "#ed1e61", color: "white" }}
                    key={index}
                    className="px-5 py-2.5 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl text-sm md:text-base font-semibold text-slate-600 transition-colors duration-300 cursor-pointer shadow-sm"
                  >
                    {style}
                  </motion.span>
                ))}
              </div>
              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="bg-primary text-white px-8 py-6 rounded-2xl hover:bg-black transition-all duration-300 text-lg font-semibold shadow-xl hover:shadow-primary/30 transform hover:-translate-y-1"
              >
                View Gallery
              </Button>
            </motion.div>
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full md:w-1/2"
            >
              <div className="absolute top-4 -right-4 w-full h-full bg-gradient-to-br from-purple-300 to-blue-400 rounded-[2rem] md:rounded-[3rem] -z-10 transform -rotate-3 opacity-60"></div>
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full">
                <Image
                  src="/pc1.jpg"
                  alt="Design Styles"
                  fill
                  className="object-cover shadow-2xl border-[6px] border-white rounded-[2rem] md:rounded-[3rem] transition-transform duration-700 hover:scale-105"
                />
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.8 }}
                  className="absolute -top-6 -left-6 md:top-8 md:-left-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl text-sm md:text-base font-extrabold text-purple-600 shadow-xl border border-purple-100"
                >
                  15+ Unique Styles
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Hero;
