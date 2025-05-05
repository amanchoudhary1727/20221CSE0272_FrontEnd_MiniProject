
import React, { useState } from "react";
import WafflesHeader from "../components/WafflesHeader";
import ExperienceCard from "../components/ExperienceCard";
import ExcuseGenerator from "../components/ExcuseGenerator";
import CheeseTest from "../components/CheeseTest";
import ZombieSurvival from "../components/ZombieSurvival";
import DadJoke from "../components/DadJoke";
import DigitalPet from "../components/DigitalPet";
import WizardAdvice from "../components/WizardAdvice";

const Index = () => {
  const [currentExperience, setCurrentExperience] = useState(null);

  const experiences = [
    {
      id: "excuse",
      title: "Generate an Excuse",
      description: "For your questionable life decisions",
      icon: "🤥",
      color: "#9b87f5", // waffle-purple
      component: ExcuseGenerator
    },
    {
      id: "cheese",
      title: "Cheese Personality Test",
      description: "Discover your cheese spirit animal",
      icon: "🧀",
      color: "#FEC6A1", // waffle-orange
      component: CheeseTest
    },
    {
      id: "zombie",
      title: "Zombie Survival Test",
      description: "Prove you're not zombie food",
      icon: "🧟‍♂️",
      color: "#ea384c", // red
      component: ZombieSurvival
    },
    {
      id: "jokes",
      title: "Dad Joke Generator",
      description: "Almost a hate crime",
      icon: "😂",
      color: "#0EA5E9", // waffle-teal
      component: DadJoke
    },
    {
      id: "chicken",
      title: "Digital Chicken",
      description: "Pet it. You know you want to.",
      icon: "🐔",
      color: "#FEF7CD", // waffle-yellow
      component: DigitalPet
    },
    {
      id: "wizard",
      title: "Mystical Wizard Advice",
      description: "Semi-wise nonsense guaranteed",
      icon: "🧙‍♂️",
      color: "#9b87f5", // waffle-purple
      component: WizardAdvice
    }
  ];

  const handleExperienceSelect = (id) => {
    setCurrentExperience(id);
  };

  const handleBack = () => {
    setCurrentExperience(null);
  };

  const renderExperience = () => {
    const experience = experiences.find(exp => exp.id === currentExperience);
    if (!experience) return null;
    
    const ExperienceComponent = experience.component;
    return <ExperienceComponent onBack={handleBack} />;
  };

  return (
    <div className="min-h-screen waffle-bg py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <WafflesHeader />
        
        {currentExperience ? (
          <div className="mt-8 max-w-3xl mx-auto">
            {renderExperience()}
          </div>
        ) : (
          <>
            <div className="text-center mb-8 mt-8">
              <h2 className="text-2xl font-comic">Choose your destiny ✨</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiences.map((exp) => (
                <ExperienceCard
                  key={exp.id}
                  title={exp.title}
                  description={exp.description}
                  icon={exp.icon}
                  color={exp.color}
                  onClick={() => handleExperienceSelect(exp.id)}
                />
              ))}
            </div>
            
            <div className="text-center mt-12 text-sm text-gray-500">
              <p>©️ {new Date().getFullYear()} OopsIClicked.com | Where productivity comes to die</p>
              <p className="mt-1">Waffles is just trying their best, okay?</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
