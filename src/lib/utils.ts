import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const COLORS = {
  base: '#F8F9FA',
  trust: '#0A2647',
  organic: '#5B8C5A',
  premium: '#C5A059',
};

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: 'boarding' | 'training';
  duration?: string;
  features?: string[];
}

export const BOARDING_SERVICES: Service[] = [
  {
    id: 'luxury-boarding',
    title: 'Luxury Boarding',
    description: 'Climate-controlled suites with 24/7 monitoring and personalized play sessions.',
    price: 1500,
    image: 'https://picsum.photos/seed/luxury-dog/800/600',
    category: 'boarding',
    features: ['Climate Controlled', 'Daily Health Reports', '2 Play Sessions', 'Organic Meals']
  },
  {
    id: 'standard-boarding',
    title: 'Standard Boarding',
    description: 'Comfortable stay with socialization and regular exercise in our organic play areas.',
    price: 1000,
    image: 'https://picsum.photos/seed/standard-dog/800/600',
    category: 'boarding',
    features: ['Organic Play Areas', 'Regular Exercise', 'Group Socialization']
  }
];

export const TRAINING_SERVICES: Service[] = [
  {
    id: 'puppy-training',
    title: 'Puppy Foundations',
    description: 'Essential social and behavioral training for the youngest members of the pack.',
    price: 15000,
    image: 'https://picsum.photos/seed/puppy-train/800/600',
    category: 'training',
    duration: '20 Days',
    features: ['Socialization', 'Basic Commands', 'Potty Training']
  },
  {
    id: 'adult-training',
    title: 'Adult Obedience',
    description: 'Refining behavior and ensuring your adult dog is a well-mannered companion.',
    price: 18000,
    image: 'https://picsum.photos/seed/adult-dog-train/800/600',
    category: 'training',
    duration: '20 Days',
    features: ['Advanced Commands', 'Leash Walking', 'Distraction Training']
  },
  {
    id: 'behavior-correction',
    title: 'Behavior Correction',
    description: 'Specialized training to address aggression, anxiety, and other complex issues.',
    price: 25000,
    image: 'https://picsum.photos/seed/behavior-dog/800/600',
    category: 'training',
    duration: '20 Days',
    features: ['Aggression Management', 'Anxiety Relief', 'Confidence Building']
  },
  {
    id: 'advanced-skills',
    title: 'Advanced Skills',
    description: 'For dogs who have mastered the basics and are ready for off-leash work.',
    price: 22000,
    image: 'https://picsum.photos/seed/advanced-dog/800/600',
    category: 'training',
    duration: '20 Days',
    features: ['Off-leash Control', 'Agility Basics', 'Complex Tasks']
  }
];

export const SERVICES: Service[] = [...BOARDING_SERVICES, ...TRAINING_SERVICES];

export const REVIEWS = [
  { name: 'Sarah J.', text: 'The best decision for my golden retriever. Purushotham is a genius!', rating: 5, pet: 'Golden Retriever' },
  { name: 'Rahul M.', text: 'Amazing facility. My dog didn\'t want to leave!', rating: 5, pet: 'Indie' },
  { name: 'Priya K.', text: 'The behavior correction training changed our lives. Highly recommend.', rating: 5, pet: 'German Shepherd' },
  { name: 'Anish G.', text: 'Clean, professional, and truly caring. Best in Bangalore.', rating: 5, pet: 'Beagle' },
];
