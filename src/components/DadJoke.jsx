import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const jokes = [
  { setup: "Why don't scientists trust atoms?", punchline: "Because they make up everything!" },
  { setup: "Did you hear about the mathematician who's afraid of negative numbers?", punchline: "He'll stop at nothing to avoid them!" },
  { setup: "Why don't skeletons fight each other?", punchline: "They don't have the guts!" },
  { setup: "What do you call a fake noodle?", punchline: "An impasta!" },
  { setup: "How do you organize a space party?", punchline: "You planet!" },
  { setup: "Why did the scarecrow win an award?", punchline: "Because he was outstanding in his field!" },
  { setup: "What do you call a fish wearing a crown?", punchline: "The reigning champ!" },
  { setup: "What's brown and sticky?", punchline: "A stick!" },
  { setup: "Why don't eggs tell jokes?", punchline: "They'd crack each other up!" },
  { setup: "How do you make a tissue dance?", punchline: "Put a little boogie in it!" },
  { setup: "What do you call a bear with no teeth?", punchline: "A gummy bear!" },
  { setup: "Why did the cookie go to the doctor?", punchline: "Because it was feeling crumbly!" },
  { setup: "What did the grape say when it got stepped on?", punchline: "Nothing, it just let out a little wine!" },
  { setup: "Why don't oysters donate to charity?", punchline: "Because they're shellfish!" },
  { setup: "What did the coffee report to the police?", punchline: "A mugging!" },
  { setup: "What do you call a cheese that isn't yours?", punchline: "Nacho cheese!" },
  { setup: "Why did the math book look sad?", punchline: "Because it had too many problems!" },
  { setup: "What do you call a sleeping bull?", punchline: "A bulldozer!" },
  { setup: "Why was six afraid of seven?", punchline: "Because seven eight nine!" },
  { setup: "What did one wall say to the other wall?", punchline: "I'll meet you at the corner!" }
];

const ratings = [
  "Legally Classified as Torture",
  "My Brain Cells are Filing for Divorce",
  "Dad Would Be Proud",
  "Actually Chuckled",
  "Comedy Gold (But I'll Deny Saying That)"
];

const DadJoke = ({ onBack }) => {
  const [currentJoke, setCurrentJoke] = useState(null);
  const [showPunchline, setShowPunchline] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [jokesUsed, setJokesUsed] = useState([]);
  const { toast } = useToast();

  const getNewJoke = () => {
    // Reset state for new joke
    setShowPunchline(false);
    setUserRating(null);
    
    // Filter out jokes we've already used
    const unusedJokes = jokes.filter((_, index) => !jokesUsed.includes(index));
    
    // If we've used all jokes, reset
    if (unusedJokes.length === 0) {
      setJokesUsed([]);
      const randomIndex = Math.floor(Math.random() * jokes.length);
      setCurrentJoke(jokes[randomIndex]);
      setJokesUsed([randomIndex]);
    } else {
      // Get random unused joke
      const availableIndices = jokes
        .map((_, index) => index)
        .filter(index => !jokesUsed.includes(index));
      const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      setCurrentJoke(jokes[randomIndex]);
      setJokesUsed([...jokesUsed, randomIndex]);
    }
  };

  const revealPunchline = () => {
    setShowPunchline(true);
  };

  const rateJoke = (rating) => {
    setUserRating(rating);
    toast({
      title: "Joke Rated!",
      description: `You rated this joke: "${ratings[rating]}"`,
    });
  };

  return (
    <div className="experience-area">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bangers text-waffle-teal mb-2">Dad Joke Generator</h2>
        <p className="text-gray-600">Prepare your groans... these are bad!</p>
      </div>
      
      {currentJoke ? (
        <div className="bg-gray-50 p-6 rounded-lg mb-6 text-center">
          <h3 className="text-xl font-bold mb-4">{currentJoke.setup}</h3>
          
          {showPunchline ? (
            <>
              <p className="text-lg font-comic text-waffle-teal mb-6">{currentJoke.punchline}</p>
              
              {userRating === null && (
                <div className="mt-6">
                  <p className="mb-2 font-medium">Rate this joke:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {ratings.map((label, index) => (
                      <button
                        key={index}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          userRating === index 
                            ? 'bg-waffle-teal text-white' 
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                        onClick={() => rateJoke(index)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <Button onClick={revealPunchline} className="waffle-btn-secondary">
              Reveal Punchline
            </Button>
          )}
        </div>
      ) : (
        <div className="bg-gray-50 p-6 rounded-lg mb-6 text-center">
          <p className="text-gray-400 italic">Click the button to generate a dad joke!</p>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button 
          onClick={getNewJoke} 
          className="waffle-btn-secondary"
        >
          {currentJoke ? "Another Joke" : "Generate Joke"}
        </Button>
        <Button variant="outline" onClick={onBack}>Back to Hub</Button>
      </div>
      
      <p className="text-xs text-gray-400 mt-6 text-center italic">
        These jokes are locally sourced, free-range, and approved by dads worldwide.
      </p>
    </div>
  );
};

export default DadJoke;
