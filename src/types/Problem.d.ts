import { BlockScheme } from './Block';

export interface ProblemScheme {
  id: string;
  meta: {
    title: string;
    description: string;
  };
  content: BlockScheme[];
}
