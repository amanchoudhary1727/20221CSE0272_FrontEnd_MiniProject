
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const questions = [
  {
    question: "How do you handle stress?",
    options: [
      { value: "a", label: "I melt down completely" },
      { value: "b", label: "I get sharp and focused" },
      { value: "c", label: "I'm pretty mild about it" },
      { value: "d", label: "I age gracefully under pressure" }
    ]
  },
  {
    question: "What's your ideal weekend?",
    options: [
      { value: "a", label: "Party with friends" },
      { value: "b", label: "Quiet time with a good book" },
      { value: "c", label: "Outdoor adventures" },
      { value: "d", label: "Fancy dinner party" }
    ]
  },
  {
    question: "How would your friends describe you?",
    options: [
      { value: "a", label: "Fun and a bit dramatic" },
      { value: "b", label: "Strong personality, not for everyone" },
      { value: "c", label: "Reliable and easy to get along with" },
      { value: "d", label: "Sophisticated and cultured" }
    ]
  }
];

const results = {
  aaa: { cheese: "Mozzarella", description: "You're stretchy, fun, and everyone loves you at parties!" },
  aab: { cheese: "Pepper Jack", description: "Fun-loving but with a surprising kick when people least expect it." },
  aac: { cheese: "String Cheese", description: "Playful and meant to be pulled apart, you're everyone's childhood favorite!" },
  aba: { cheese: "Feta", description: "Crumbly on the outside, but with a tangy depth that makes you unforgettable." },
  abb: { cheese: "Blue Cheese", description: "Bold, intense, and definitely an acquired taste. Love you or hate you!" },
  abc: { cheese: "Gouda", description: "Smooth and sophisticated, but still accessible and down to earth." },
  aca: { cheese: "Monterey Jack", description: "Mild-mannered but adventurous when paired with the right companions." },
  acb: { cheese: "Havarti", description: "Buttery smooth personality with a subtle complexity that keeps people guessing." },
  acc: { cheese: "Colby", description: "Reliable, friendly, and gets along with absolutely everyone." },
  default: { cheese: "Swiss", description: "You've got depth and complexity, but also some obvious holes in your personality." }
};

const CheeseTest = ({ onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(["", "", ""]);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      const resultKey = newAnswers.join("");
      setResult(results[resultKey] || results.default);
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers(["", "", ""]);
    setResult(null);
    setShowResult(false);
  };

  return (
    <div className="experience-area">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bangers text-waffle-orange mb-2">Cheese Personality Test</h2>
        <p className="text-gray-600">Discover which cheese you're spiritually aligned with!</p>
      </div>
      
      {!showResult ? (
        <>
          <div className="mb-6">
            <div className="mb-2 flex justify-between text-sm">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-waffle-orange h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold mb-4">{questions[currentQuestion].question}</h3>
            <RadioGroup className="space-y-4">
              {questions[currentQuestion].options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    id={option.value} 
                    value={option.value}
                    onClick={() => handleAnswer(option.value)}
                  />
                  <Label htmlFor={option.value} className="cursor-pointer">{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </>
      ) : (
        <div className="bg-gray-50 p-6 rounded-lg mb-6 text-center">
          <div className="text-5xl mb-4 animate-bounce">🧀</div>
          <h3 className="text-2xl font-bangers text-waffle-orange mb-2">You are: {result.cheese}</h3>
          <p className="text-lg mb-6">{result.description}</p>
          <div className="italic text-sm text-gray-500 mb-6">
            This cheese alignment is 98.7% scientifically accurate, according to studies conducted by Dr. Waffles in his imagination lab.
          </div>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {showResult ? (
          <Button onClick={resetQuiz} className="waffle-btn-primary">Take Test Again</Button>
        ) : (
          <Button 
            onClick={() => handleAnswer(questions[currentQuestion].options[0].value)} 
            className="waffle-btn-primary"
            disabled={currentQuestion >= questions.length}
          >
            Skip to Next
          </Button>
        )}
        <Button variant="outline" onClick={onBack}>Back to Hub</Button>
      </div>
    </div>
  );
};

export default CheeseTest;
