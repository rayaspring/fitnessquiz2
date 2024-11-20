import { Dumbbell, Timer, Utensils } from 'lucide-react';
import { Button } from './Button';

export function FeaturedPrograms() {
  const programs = [
    {
      title: 'Wall Pilates Program',
      description: 'Low impact workout easy for beginners',
      icon: Dumbbell,
      gradient: 'from-purple-500 to-purple-700',
    },
    {
      title: 'Calisthenics Workout',
      description: 'Full body exercises plan to build muscle',
      icon: Timer,
      gradient: 'from-purple-600 to-purple-800',
    },
    {
      title: 'Intermittent Fasting',
      description: 'Simple meal timing to manage nutrition',
      icon: Utensils,
      gradient: 'from-purple-700 to-purple-900',
    },
  ];

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Featured Programs</h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose from our selection of specialized fitness programs
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {programs.map((program) => (
            <div
              key={program.title}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <div className={`bg-gradient-to-r ${program.gradient} p-6`}>
                <program.icon className="h-12 w-12 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{program.title}</h3>
                <p className="mt-2 text-gray-600">{program.description}</p>
                <Button className="mt-4 w-full">Get Started</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}