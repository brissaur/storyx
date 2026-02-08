import { Difficulty } from '@/ui/components';

export type Story = {
  id: string;
  title: string;
  difficulty: Difficulty;
  publicPlot: string;
  solution: string;
};

export type { Difficulty };
