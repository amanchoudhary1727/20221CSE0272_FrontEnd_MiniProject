import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const excuses = [
  "My pet lizard needed emotional support during his existential crisis.",
  "I had to rescue my neighbor's cat from speaking in tongues again.",
  "My shower curtain was giving me suspicious looks all morning.",
  "I was trapped in an epic staring contest with my refrigerator.",
  "My toast fell butter-side up and I needed to document this scientific anomaly.",
  "I was practicing my zombie apocalypse survival skills in my pajamas.",
  "My coffee maker started a small but passionate cult in my kitchen.",
  "I had to attend an emergency meeting with the dust bunnies under my bed.",
  "My socks were engaging in civil war, and I had to negotiate peace terms.",
  "I accidentally became the emotional support human for a lost shopping cart.",
  "My plant started giving me relationship advice, and I had to stay home to process it.",
  "I got caught in an intense debate with my mirror reflection.",
  "My calendar decided to identify as a choose-your-own-adventure book.",
  "My GPS developed feelings and needed emotional support.",
  "I had to alphabetize my pet's dreams.",
  "My doorbell started singing opera and I couldn't leave.",
  "The squirrels in my yard staged a peaceful protest.",
  "My shadow called in sick, so I can't go anywhere.",
  "My keyboard started writing in hieroglyphics.",
  "I'm participating in a very important staring contest with my goldfish."
];

const occasions = [
  "work meeting",
  "dentist appointment",
  "family dinner",
  "gym session",
  "video call",
  "your own wedding",
  "friend's birthday",
  "homework submission",
  "first date",
  "job interview",
  "important presentation",
  "blind date",
  "team building event",
  "morning standup",
  "parent-teacher meeting"
];

const ExcuseGenerator = ({ onBack }) => {
  const [excuse, setExcuse] = useState("");
  const [occasion, setOccasion] = useState("important event");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateExcuse = () => {
    setIsGenerating(true);
    const randomOccasion = occasions[Math.floor(Math.random() * occasions.length)];
    setOccasion(randomOccasion);
    
    // Simulate "thinking" time
    setTimeout(() => {
      const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
      setExcuse(randomExcuse);
      setIsGenerating(false);
      
      toast({
        title: "Excuse Generated!",
        description: "Use this excuse at your own risk. Waffles assumes no liability for any eyerolls received.",
      });
    }, 1500);
  };

  return (
    <div className="experience-area">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bangers text-waffle-purple mb-2">Excuse Generator</h2>
        <p className="text-gray-600">Need a way out of your {occasion}? Waffles has got you covered!</p>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-6 min-h-[150px] flex items-center justify-center">
        {excuse ? (
          <p className="text-lg font-comic text-center">"{excuse}"</p>
        ) : (
          <p className="text-gray-400 italic">Your amazing excuse will appear here...</p>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button 
          onClick={generateExcuse} 
          className="waffle-btn-primary"
          disabled={isGenerating}
        >
          {isGenerating ? "Crafting Excuse..." : "Generate Excuse"}
        </Button>
        <Button variant="outline" onClick={onBack}>Back to Hub</Button>
      </div>
      
      <p className="text-xs text-gray-400 mt-6 text-center italic">
        Warning: Waffles' excuses are 87% guaranteed to make your situation worse in the most hilarious way possible.
      </p>
    </div>
  );
};

export default ExcuseGenerator;
