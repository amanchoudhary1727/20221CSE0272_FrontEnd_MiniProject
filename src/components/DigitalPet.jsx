
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import ChickenMarket from './ChickenMarket';

const DigitalPet = ({ onBack }) => {
  const [happiness, setHappiness] = useState(50);
  const [petCount, setPetCount] = useState(0);
  const [chickenState, setChickenState] = useState('idle');
  const [feedbackText, setFeedbackText] = useState('');
  const [coins, setCoins] = useState(0);
  const [inventory, setInventory] = useState([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Change chicken state based on happiness
    if (happiness < 30) {
      setChickenState('idle');
    } else if (happiness < 70) {
      setChickenState('happy');
    } else {
      setChickenState('excited');
    }
    
    // Happiness decreases over time
    const interval = setInterval(() => {
      setHappiness((prev) => Math.max(0, prev - 2));
    }, 3000);
    
    return () => clearInterval(interval);
  }, [happiness]);
  
  const petChicken = () => {
    setHappiness((prev) => Math.min(100, prev + (100 - prev) / 10 + 5));
    setPetCount(petCount + 1);
    setCoins((prev) => prev + 1); // Earn 1 coin per pet
    
    // Generate random feedback
    const feedbacks = [
      "Cluck cluck! (That's chicken for 'thank you')",
      "This chicken is living its best digital life!",
      "More pets please! This chicken is demanding!",
      "Your chicken appreciates your dedication!",
      "Eggsellent petting technique!",
      "*Happy chicken noises*"
    ];
    
    const randomFeedback = feedbacks[Math.floor(Math.random() * feedbacks.length)];
    setFeedbackText(randomFeedback);
    
    // Achievement milestones
    if (petCount + 1 === 10) {
      toast({
        title: "Achievement Unlocked!",
        description: "Chicken Whisperer: You've pet the chicken 10 times!",
      });
    } else if (petCount + 1 === 50) {
      toast({
        title: "Achievement Unlocked!",
        description: "Poultry Enthusiast: 50 pets! Do you need a hobby?",
      });
    } else if (petCount + 1 === 100) {
      toast({
        title: "LEGENDARY ACHIEVEMENT!",
        description: "Chicken Overlord: 100 pets! The chicken now works for you.",
      });
    }
  };

  const handlePurchase = (item) => {
    setCoins((prev) => prev - item.price);
    setInventory((prev) => [...prev, item]);
    setHappiness((prev) => Math.min(100, prev + 10)); // Items make chicken happier
  };

  return (
    <div className="experience-area">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bangers text-yellow-500 mb-2">Digital Chicken</h2>
        <p className="text-gray-600">Pet the chicken. Earn coins. Buy silly things. Don't question it.</p>
      </div>
      
      <div className="bg-gradient-to-b from-sky-100 to-sky-200 p-6 rounded-lg mb-6 text-center min-h-[250px] flex flex-col items-center justify-center">
        <div 
          className={`text-8xl mb-4 transform transition-all duration-300 ${
            chickenState === 'excited' 
              ? 'scale-125 animate-bounce' 
              : chickenState === 'happy' 
                ? 'scale-110 animate-float' 
                : ''
          }`}
          onClick={petChicken}
        >
          🐔
          {inventory.length > 0 && (
            <span className="text-2xl ml-2">
              {inventory.slice(-1)[0].icon}
            </span>
          )}
        </div>
        
        {feedbackText && (
          <p className="text-lg font-comic text-gray-700 mb-4 animate-float">{feedbackText}</p>
        )}
        
        <div className="w-full max-w-md">
          <div className="flex justify-between text-sm mb-1">
            <span>Happiness</span>
            <span>{happiness}%</span>
          </div>
          <Progress value={happiness} className="h-2" />
        </div>
        
        <div className="mt-4">
          <p className="text-sm">Times petted: <span className="font-bold">{petCount}</span></p>
        </div>
      </div>
      
      <ChickenMarket coins={coins} onPurchase={handlePurchase} />
      
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
        <Button 
          onClick={petChicken} 
          className="bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          Pet the Chicken
        </Button>
        <Button variant="outline" onClick={onBack}>Back to Hub</Button>
      </div>
      
      <p className="text-xs text-gray-400 mt-6 text-center italic">
        No digital animals were harmed in the making of this experience. This chicken is free-range code.
      </p>
    </div>
  );
};

export default DigitalPet;
