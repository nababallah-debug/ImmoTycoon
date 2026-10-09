import type { Action, GameState, Page } from './game';

export type Modal =
  | { type: 'help' | 'settings' | 'notifications' | 'prestige' | 'event' | 'cityInfo' }
  | { type: 'catalog'; plot?: number }
  | { type: 'build'; id: string; plot?: number }
  | { type: 'building'; uid: string }
  | { type: 'confirm'; title: string; description: string; action: Action; label?: string };

export interface ViewProps {
  state: GameState;
  act: (action: Action) => void;
  open: (modal: Modal) => void;
  navigate: (page: Page) => void;
}