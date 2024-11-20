import { useState } from 'react';
import { questions } from '../data/questions';
import { QuizAnswers, Question } from '../types';
import { Button } from './Button';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

interface QuizProps {
  onComplete: (answers: QuizAnswers) => void;
}

export function Quiz({ onComplete }: QuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const currentQuestion = questions[currentStep];

  const handleAnswer = (answer: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }));
  };

  const handleNext = () => {
    if (currentStep === questions.length - 1) {
      onComplete(answers);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const isAnswered = (question: Question): boolean => {
    if (question.type === 'input') {
      return !!answers[question.id] && answers[question.id] !== '';
    }
    return !!answers[question.id];
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-purple-100">
        <div className="mb-8">
          <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full transition-all duration-500 ease-out animate-gradient"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-purple-700 font-medium">
            Question {currentStep + 1} of {questions.length}
          </p>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-tight">
          {currentQuestion.question}
        </h2>

        <div className="space-y-4">
          {currentQuestion.type === 'input' ? (
            <input
              type="number"
              className="w-full p-4 border-2 border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-lg"
              placeholder="Enter your weight"
              onChange={(e) => handleAnswer(e.target.value)}
              value={answers[currentQuestion.id] || ''}
            />
          ) : currentQuestion.type === 'multiple' ? (
            currentQuestion.options.map((option) => (
              <button
                key={option}
                className={`w-full p-5 text-left rounded-xl border-2 transition-all duration-200 group hover:border-purple-400 hover:bg-purple-50 ${
                  Array.isArray(answers[currentQuestion.id]) &&
                  (answers[currentQuestion.id] as string[]).includes(option)
                    ? 'border-purple-500 bg-purple-50 shadow-sm'
                    : 'border-purple-100'
                }`}
                onClick={() => {
                  const currentAnswers = (answers[currentQuestion.id] as string[]) || [];
                  const newAnswers = currentAnswers.includes(option)
                    ? currentAnswers.filter((a) => a !== option)
                    : [...currentAnswers, option];
                  handleAnswer(newAnswers);
                }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                    Array.isArray(answers[currentQuestion.id]) &&
                    (answers[currentQuestion.id] as string[]).includes(option)
                      ? 'border-purple-500 bg-purple-500 text-white'
                      : 'border-purple-200 group-hover:border-purple-400'
                  }`}>
                    <Check size={16} className={Array.isArray(answers[currentQuestion.id]) &&
                      (answers[currentQuestion.id] as string[]).includes(option) ? 'opacity-100' : 'opacity-0'} />
                  </div>
                  <span className="text-lg text-gray-700">{option}</span>
                </div>
              </button>
            ))
          ) : (
            currentQuestion.options.map((option) => (
              <button
                key={option}
                className={`w-full p-5 text-left rounded-xl border-2 transition-all duration-200 group hover:border-purple-400 hover:bg-purple-50 ${
                  answers[currentQuestion.id] === option
                    ? 'border-purple-500 bg-purple-50 shadow-sm'
                    : 'border-purple-100'
                }`}
                onClick={() => handleAnswer(option)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    answers[currentQuestion.id] === option
                      ? 'border-purple-500 bg-purple-500'
                      : 'border-purple-200 group-hover:border-purple-400'
                  }`}>
                    <div className={`w-2.5 h-2.5 rounded-full bg-white transition-all duration-200 ${
                      answers[currentQuestion.id] === option ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    }`} />
                  </div>
                  <span className="text-lg text-gray-700">{option}</span>
                </div>
              </button>
            ))
          )}
        </div>

        <div className="mt-10 flex justify-between">
          {currentStep > 0 && (
            <Button
              variant="secondary"
              onClick={handleBack}
              className="flex items-center gap-2 text-purple-700 bg-purple-50 hover:bg-purple-100"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            className="ml-auto flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
            disabled={!isAnswered(currentQuestion)}
          >
            {currentStep === questions.length - 1 ? 'Complete' : 'Next'}
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}