export const ROUTES = {
  ONBOARDING: '/onboarding',
  STORIES: '/stories',
  GAME: '/game',
} as const;

export function gameRoute(storyId: string) {
  return `/game/${storyId}` as const;
}
