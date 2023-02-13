import { Timestamp } from 'firebase/firestore';
import { ProblemScheme } from './Problem';

export interface DocumentScheme {
  id: string;
  meta: {
    title: string;
    description: string;
    pagination: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
  }
  problems: ProblemScheme[];
}
