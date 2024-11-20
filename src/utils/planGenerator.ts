import { QuizAnswers, FitnessProfile } from '../types';

export function calculateBMR(weight: number, height: number, age: number, gender: string): number {
  // Harris-Benedict Formula
  if (gender === 'Male') {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  }
  return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
}

export function generateFitnessProfile(answers: QuizAnswers): FitnessProfile {
  const currentWeight = parseFloat(answers.currentWeight as string);
  const targetWeight = parseFloat(answers.targetWeight as string);
  const weightDiff = currentWeight - targetWeight;
  
  // Calculate time to reach goal based on healthy weight loss rate (0.5-1kg per week)
  const weeksToGoal = Math.ceil(weightDiff / 0.75);
  
  // Calculate daily calorie deficit needed
  const dailyDeficit = (weightDiff * 7700) / (weeksToGoal * 7); // 7700 calories = 1kg of fat

  return {
    goal: answers.goal as string,
    currentWeight,
    targetWeight,
    activityLevel: answers.dailyActivity as string,
    dietaryRestrictions: Array.isArray(answers.dietHistory) ? answers.dietHistory : [],
    timeToGoal: weeksToGoal,
    dailyCalories: Math.max(1500, 2000 - dailyDeficit), // Never go below 1500 calories
    workoutPlan: generateWorkoutPlan(answers),
    dietPlan: generateDietPlan(answers),
    fastingSchedule: generateFastingSchedule(answers)
  };
}

function generateWorkoutPlan(answers: QuizAnswers) {
  const exerciseLevel = answers.exercise as string;
  const timeAvailable = answers.dailyTime as string;
  
  const workoutPlans = {
    beginner: {
      weekly: [
        { day: 'Monday', workout: 'Full Body Strength + 20min Cardio' },
        { day: 'Tuesday', workout: '30min Walking' },
        { day: 'Wednesday', workout: 'Upper Body + Core' },
        { day: 'Thursday', workout: 'Rest/Light Stretching' },
        { day: 'Friday', workout: 'Lower Body + 20min Cardio' },
        { day: 'Saturday', workout: '45min Walking/Swimming' },
        { day: 'Sunday', workout: 'Rest' }
      ]
    },
    intermediate: {
      weekly: [
        { day: 'Monday', workout: 'Push Day + HIIT' },
        { day: 'Tuesday', workout: '45min Cardio' },
        { day: 'Wednesday', workout: 'Pull Day + Core' },
        { day: 'Thursday', workout: 'Legs + HIIT' },
        { day: 'Friday', workout: 'Upper Body + Cardio' },
        { day: 'Saturday', workout: 'Active Recovery' },
        { day: 'Sunday', workout: 'Rest' }
      ]
    }
  };

  return exerciseLevel === 'I don\'t exercise now' ? workoutPlans.beginner : workoutPlans.intermediate;
}

function generateDietPlan(answers: QuizAnswers) {
  const restrictions = Array.isArray(answers.dietHistory) ? answers.dietHistory : [];
  const mealsPerDay = answers.mealsPerDay as string;

  const mealPlan = {
    breakfast: ['Oatmeal with berries', 'Greek yogurt with nuts', 'Whole grain toast with eggs'],
    lunch: ['Grilled chicken salad', 'Quinoa bowl with vegetables', 'Turkey wrap with avocado'],
    dinner: ['Baked salmon with vegetables', 'Lean steak with sweet potato', 'Tofu stir-fry'],
    snacks: ['Apple with almond butter', 'Protein shake', 'Carrot sticks with hummus']
  };

  // Adjust based on dietary restrictions
  if (restrictions.includes('Gluten-free')) {
    mealPlan.breakfast = ['Gluten-free oatmeal', 'Smoothie bowl', 'Eggs with vegetables'];
  }

  return {
    mealPlan,
    mealsPerDay: parseInt(mealsPerDay.charAt(0)),
    restrictions
  };
}

function generateFastingSchedule(answers: QuizAnswers) {
  const fastingPreference = answers.fasting as string;
  
  const schedules = {
    '16/8': { fastingWindow: 16, eatingWindow: 8, startTime: '12:00', endTime: '20:00' },
    '14/10': { fastingWindow: 14, eatingWindow: 10, startTime: '10:00', endTime: '20:00' },
    '18/6': { fastingWindow: 18, eatingWindow: 6, startTime: '14:00', endTime: '20:00' }
  };

  // Fixed the ternary operator syntax
  return fastingPreference === 'Yes' ? schedules['16/8'] : schedules['14/10'];
}