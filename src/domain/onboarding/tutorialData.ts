import type { TutorialStepId, TutorialStory } from './types';

const STEP_ORDER: TutorialStepId[] = [
  'welcome',
  'gm_intro',
  'question_1',
  'answer_1',
  'question_2',
  'answer_2',
  'reveal',
  'complete',
];

export const TOTAL_STEPS = STEP_ORDER.length;

export function getStepIndex(step: TutorialStepId): number {
  return STEP_ORDER.indexOf(step);
}

export function getPrevStep(current: TutorialStepId): TutorialStepId | null {
  const index = STEP_ORDER.indexOf(current);
  if (index <= 0) return null;
  return STEP_ORDER[index - 1];
}

export function getNextStep(current: TutorialStepId): TutorialStepId | null {
  const index = STEP_ORDER.indexOf(current);
  if (index === -1 || index === STEP_ORDER.length - 1) return null;
  return STEP_ORDER[index + 1];
}

export const tutorialStory: TutorialStory = {
  title: 'The Hotel',
  publicPlot:
    'A man pushes his car to a hotel and tells the owner he\'s bankrupt. Why?',
  solution: 'He\'s playing Monopoly.',
  rounds: [
    {
      questions: [
        {
          id: 'r1q1',
          text: 'Is the man driving a real car?',
          answer: 'no',
          explanation: 'The car isn\'t a real vehicle.',
        },
        {
          id: 'r1q2',
          text: 'Is this happening outside?',
          answer: 'no',
          explanation: 'The scene isn\'t taking place outdoors.',
        },
        {
          id: 'r1q3',
          text: 'Did someone steal his money?',
          answer: 'irrelevant',
          explanation: 'Theft isn\'t relevant to the situation.',
        },
      ],
    },
    {
      questions: [
        {
          id: 'r2q1',
          text: 'Is this some kind of game?',
          answer: 'yes',
          explanation: 'You\'re on the right track!',
        },
        {
          id: 'r2q2',
          text: 'Is it Monopoly?',
          answer: 'yes',
          explanation: 'That\'s it! The man is playing Monopoly.',
        },
        {
          id: 'r2q3',
          text: 'Is the man a child?',
          answer: 'irrelevant',
          explanation: 'His age doesn\'t matter here.',
        },
      ],
    },
  ],
};
