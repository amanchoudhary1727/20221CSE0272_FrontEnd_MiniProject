
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Sword, Shield, House } from "lucide-react";

const ZombieSurvival = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [weapon, setWeapon] = useState("");
  const [fightingAbility, setFightingAbility] = useState("");
  const [hideoutChoice, setHideoutChoice] = useState("");
  const [score, setScore] = useState(null);
  const [survival, setSurvival] = useState("");
  const { toast } = useToast();

  const weapons = [
    { value: "bat", label: "Baseball Bat", points: 60 },
    { value: "chainsaw", label: "Chainsaw", points: 75 },
    { value: "bow", label: "Bow & Arrow", points: 80 },
    { value: "frying_pan", label: "Frying Pan", points: 45 },
    { value: "banana", label: "Banana", points: 10 },
    { value: "katana", label: "Katana", points: 90 },
    { value: "water_gun", label: "Water Gun", points: 5 },
    { value: "flamethrower", label: "Flamethrower", points: 95 },
  ];

  const fightingAbilities = [
    { value: "trained", label: "Trained Fighter", points: 90 },
    { value: "some_exp", label: "Some Experience", points: 70 },
    { value: "watched_movies", label: "Watched Kung Fu Movies", points: 40 },
    { value: "none", label: "Zero Experience", points: 20 },
  ];

  const hideouts = [
    { value: "mall", label: "Shopping Mall", points: 70 },
    { value: "farm", label: "Remote Farm", points: 85 },
    { value: "bunker", label: "Underground Bunker", points: 95 },
    { value: "school", label: "High School", points: 40 },
    { value: "house", label: "Suburban House", points: 60 },
    { value: "boat", label: "Yacht", points: 75 },
  ];

  const survivalOptions = [
    { minScore: 0, maxScore: 30, text: "You'd be zombie food before the opening credits finish.", emoji: "☠️" },
    { minScore: 31, maxScore: 60, text: "You'd make it to the middle of the movie, when they need a shocking death.", emoji: "😱" },
    { minScore: 61, maxScore: 80, text: "You'd survive most of it but probably sacrifice yourself heroically for others.", emoji: "🦸" },
    { minScore: 81, maxScore: 100, text: "Congratulations! You're the main character who lives to see the sequel!", emoji: "🧟‍♂️" },
  ];

  const handleNext = () => {
    if (currentStep === 1 && !weapon) {
      toast({
        title: "Weapon Required!",
        description: "Even a banana is better than nothing against the undead!",
        variant: "destructive"
      });
      return;
    }
    if (currentStep === 3) {
      calculateSurvival();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const calculateSurvival = () => {
    const selectedWeapon = weapons.find(w => w.value === weapon);
    const selectedFighting = fightingAbilities.find(f => f.value === fightingAbility);
    const selectedHideout = hideouts.find(h => h.value === hideoutChoice);
    
    const weaponPoints = selectedWeapon ? selectedWeapon.points : 0;
    const fightingPoints = selectedFighting ? selectedFighting.points * 0.3 : 0;
    const hideoutPoints = selectedHideout ? selectedHideout.points * 0.2 : 0;
    const luckFactor = Math.floor(Math.random() * 15);
    
    const totalScore = Math.min(100, weaponPoints + fightingPoints + hideoutPoints + luckFactor);
    setScore(totalScore);
    
    for (const option of survivalOptions) {
      if (totalScore >= option.minScore && totalScore <= option.maxScore) {
        setSurvival(`${option.emoji} ${option.text}`);
        break;
      }
    }
    setCurrentStep(4);
  };

  const renderChoiceButton = (item, selectedValue, onSelect, icon) => (
    <Button
      key={item.value}
      variant={selectedValue === item.value ? "default" : "outline"}
      className={`w-full mb-2 justify-start transition-all duration-300 hover:scale-102 ${
        selectedValue === item.value 
          ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30' 
          : 'hover:border-red-500/50 hover:text-red-500'
      }`}
      onClick={() => {
        onSelect(item.value);
        toast({
          title: "Choice Selected!",
          description: `You chose: ${item.label}`,
          variant: "default",
        });
      }}
    >
      {icon && React.cloneElement(icon, { 
        className: `mr-2 h-4 w-4 ${selectedValue === item.value ? 'animate-bounce' : ''}` 
      })}
      {item.label}
    </Button>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-2xl font-medium mb-4">Choose Your Weapon</h3>
            <div className="grid gap-2">
              {weapons.map(w => renderChoiceButton(w, weapon, setWeapon, <Sword />))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-2xl font-medium mb-4">Rate Your Fighting Ability</h3>
            <div className="grid gap-2">
              {fightingAbilities.map(f => renderChoiceButton(f, fightingAbility, setFightingAbility, <Shield />))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-2xl font-medium mb-4">Choose Your Hideout</h3>
            <div className="grid gap-2">
              {hideouts.map(h => renderChoiceButton(h, hideoutChoice, setHideoutChoice, <House />))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-2">Survival Score: {score}%</h3>
              <p className="text-lg">{survival}</p>
              {score < 50 && (
                <p className="text-sm text-gray-500 mt-2 italic">
                  Don't worry, most of us wouldn't make it either. That's why we're here clicking buttons instead of prepping.
                </p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="experience-area">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bangers text-red-500 mb-2">Zombie Survival Test</h2>
        <p className="text-gray-600">Let's see if you'd make it through the zombie apocalypse!</p>
      </div>
      
      <div className="max-w-md mx-auto">
        {renderStep()}
        
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="hover:border-red-500/50 hover:text-red-500 transition-all duration-300"
          >
            Back to Hub
          </Button>
          
          {currentStep < 4 && (
            <Button 
              onClick={handleNext} 
              className="bg-red-500 text-white hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-red-500/30"
            >
              {currentStep === 3 ? "Calculate My Fate" : "Next"}
              {currentStep < 3 && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ZombieSurvival;
