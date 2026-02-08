import { useMemo } from 'react';
import { stories } from './data';
import { Story } from './types';

export function useStories() {
  return useMemo(() => stories, []);
}

export function useStory(id: string): Story | undefined {
  return useMemo(() => stories.find((s) => s.id === id), [id]);
}
