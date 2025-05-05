
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const adviceTemplates = [
  "The stars suggest you {action} while Mercury is in retrograde. But what do the stars know? They're just burning gas.",
  "My crystal ball reveals that {action} might help, but then again, my crystal ball is just repurposed home decor.",
  "The ancient scrolls of wisdom indicate that you should {action}. But they also suggest bloodletting for headaches, so...",
  "Have you considered {action}? Neither have I, but it sounded wise.",
  "The mystical alignment suggests {action}, but the mystical alignment also thinks pineapple belongs on pizza.",
  "Legend says that those who {action} find great fortune. Legend also says there's a monster in my closet.",
  "The wise owl of the north whispers that you should {action}. The owl is probably sleep-deprived and delirious.",
  "According to the prophecy, {action} is your destiny. But prophecies have a 60% fail rate with a margin of error of 40%.",
  "My third eye sees you {action} with great success. My first two eyes need glasses though, so take that with a grain of salt.",
  "The tea leaves suggest you {action}. The coffee grounds suggest I need a better hobby."
];

const actions = [
  "dance in the rain until your problems dissolve like cheap mascara",
  "name your houseplants after your enemies and watch them thrive under your care",
  "write your troubles on a paper airplane and launch it toward your neighbor's yard",
  "adopt the confidence of a mediocre white man applying for a job he's not qualified for",
  "treat yourself like you would treat a dog – regular walks and constant praise",
  "start referring to yourself in the third person to establish dominance",
  "wear mismatched socks to throw off the universe's expectations",
  "pretend your life is a documentary and narrate your daily activities",
  "collect shiny objects like the magical crow you spiritually are",
  "build a fort out of pillows and hide from adulthood for exactly 17 minutes",
  "eat dessert first because life is uncertain and calories don't count on days ending in 'y'",
  "speak in riddles to confuse your enemies and most of your friends",
  "embrace your inner sloth – move slowly and nap frequently",
  "channel your inner cat and randomly knock things off surfaces when you need attention"
];

const WizardAdvice = ({ onBack }) => {
  const [question, setQuestion] = useState('');
  const [advice, setAdvice] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  
  const generateAdvice = () => {
    if (!question.trim()) return;
    
    setIsThinking(true);
    
    // Simulate "thinking"
    setTimeout(() => {
      const randomTemplate = adviceTemplates[Math.floor(Math.random() * adviceTemplates.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      
      const generatedAdvice = randomTemplate.replace('{action}', randomAction);
      setAdvice(generatedAdvice);
      setIsThinking(false);
    }, 1500);
  };

  return (
    <div className="experience-area">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bangers text-waffle-purple mb-2">Mystical Wizard Advice</h2>
        <p className="text-gray-600">Ask a question, receive wisdom of questionable value!</p>
      </div>
      
      <div className="mb-6">
        <Input 
          type="text" 
          placeholder="What troubles you, mortal?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="mb-4"
          onKeyPress={(e) => e.key === 'Enter' && generateAdvice()}
        />
        
        <Button 
          onClick={generateAdvice} 
          disabled={isThinking || !question.trim()}
          className="waffle-btn-primary w-full"
        >
          {isThinking ? (
            <span className="flex items-center">
              <span className="mr-2">Consulting the void</span>
              <span className="animate-pulse">...</span>
            </span>
          ) : (
            "Receive Mystical Wisdom"
          )}
        </Button>
      </div>
      
      {advice && (
        <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-6 rounded-lg mb-6 text-center">
          <div className="text-5xl mb-4">🧙‍♂️✨</div>
          <p className="text-lg font-comic italic text-gray-800">{advice}</p>
          <p className="text-xs text-gray-500 mt-4">- Waffles the Semi-Wise, Archmage of Ridiculous Counsel</p>
        </div>
      )}
      
      <Button variant="outline" onClick={onBack}>Back to Hub</Button>
      
      <p className="text-xs text-gray-400 mt-6 text-center italic">
        Warning: Following this advice may result in confusion, laughter, or unexpected life improvements.
      </p>
    </div>
  );
};

export default WizardAdvice;
