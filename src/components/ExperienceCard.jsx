
import React, { useState } from 'react';

const ExperienceCard = ({ title, description, icon, color, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 500);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  const handleClick = () => {
    setIsWiggling(true);
    setTimeout(() => {
      setIsWiggling(false);
      onClick();
    }, 300);
  };

  return (
    <div 
      className={`waffles-card cursor-pointer ${isWiggling ? 'animate-wiggle' : ''}`}
      style={{ borderTop: `4px solid ${color}` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center">
        <div className={`text-5xl mb-4 ${isHovered ? 'animate-bounce' : 'animate-float'}`}>
          {icon}
        </div>
        <h3 className="text-xl font-bangers tracking-wide text-center mb-2">{title}</h3>
        <p className="text-center text-gray-600 font-comic">{description}</p>
        <button 
          className={`mt-4 waffle-btn-primary text-sm ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundColor: color, transition: 'opacity 0.3s ease-in-out' }}
        >
          Choose Me!
        </button>
      </div>
    </div>
  );
};

export default ExperienceCard;
