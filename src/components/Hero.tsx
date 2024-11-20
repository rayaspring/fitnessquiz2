import { ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-purple-100" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Fun and Simple Fitness:
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-900">
              personalized activities to cover your wellness needs
            </span>
          </h1>
          
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Get a personalized fitness plan tailored to your goals, lifestyle, and preferences.
            Start your journey to a healthier you today.
          </p>

          <div className="mt-10">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}