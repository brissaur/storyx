export type TutorialStepId =
  | 'welcome'
  | 'gm_intro'
  | 'question_1'
  | 'answer_1'
  | 'question_2'
  | 'answer_2'
  | 'reveal'
  | 'complete';

export type AnswerType = 'yes' | 'no' | 'irrelevant';

export type QuestionOption = {
  id: string;
  text: string;
  answer: AnswerType;
  explanation: string;
};

export type TutorialRound = {
  questions: QuestionOption[];
};

export type TutorialStory = {
  title: string;
  publicPlot: string;
  solution: string;
  rounds: [TutorialRound, TutorialRound];
};

export type TutorialState = {
  currentStep: TutorialStepId;
  selectedQuestions: Record<string, QuestionOption | undefined>;
  isLoading: boolean;
};
