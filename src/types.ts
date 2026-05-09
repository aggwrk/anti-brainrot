export type ResultType = 'good' | 'bad' | 'neutral';

export interface Choice {
  text: string;
  resultType: ResultType;
  impact: {
    wallet: number;
    sanity: number;
    career: number;
  };
}

export interface Scenario {
  id: string;
  category: 'Finance' | 'Career' | 'Mental Health' | 'Social';
  question: string;
  leftChoice: Choice;
  rightChoice: Choice;
}

export interface GameState {
  currentScenarioIndex: number;
  stats: {
    wallet: number;
    sanity: number;
    career: number;
  };
  streak: number;
  isGameOver: boolean;
  history: {
    scenarioId: string;
    choice: string;
    roast?: string;
  }[];
}
