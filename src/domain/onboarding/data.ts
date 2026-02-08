import { OnboardingSlide } from './types';

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: 'welcome',
    title: 'Welcome to Storyx',
    description:
      'Solve lateral-thinking enigmas with your friends. One person is the Game Master, the others are players trying to uncover the truth.',
    emoji: '\uD83D\uDD0D',
  },
  {
    id: 'how-to-play',
    title: 'How to Play',
    description:
      'The Game Master reads the story aloud. Players ask yes-or-no questions to figure out what really happened. The Game Master can only answer Yes, No, or Irrelevant.',
    emoji: '\u2753',
  },
  {
    id: 'ready',
    title: 'Ready to Begin?',
    description:
      'Pick a story, gather your friends, and start solving mysteries together. No timer, no score — just pure deduction fun.',
    emoji: '\uD83C\uDFAD',
  },
];
