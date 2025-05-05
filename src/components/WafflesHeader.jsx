
import React, { useEffect, useState } from 'react';

const WafflesHeader = () => {
  const [wiggle, setWiggle] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setWiggle(true);
      setTimeout(() => setWiggle(false), 1000);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <header className="text-center py-8">
      <h1 className={`text-5xl md:text-6xl font-bangers tracking-wider text-waffle-purple ${wiggle ? 'animate-wiggle' : ''}`}>
        Internet Distraction Hub
      </h1>
      <p className="mt-4 text-xl font-comic text-gray-700">
        Welcome to the Hub of Mild Chaos™ — where your productivity goes to vibe check itself.
      </p>
      <div className="flex justify-center mt-6 space-x-3">
        <span className="px-3 py-1 bg-waffle-yellow rounded-full text-sm font-bold">
          Certified Weird 🤪
        </span>
        <span className="px-3 py-1 bg-waffle-pink rounded-full text-sm font-bold">
          Slightly Unhinged ✨
        </span>
        <span className="px-3 py-1 bg-waffle-orange rounded-full text-sm font-bold">
          Probably Useless 🙃
        </span>
      </div>
    </header>
  );
};

export default WafflesHeader;
