import { Timestamp } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { DocumentScheme } from '../types/Document';
import { ProblemScheme } from '../types/Problem';
import { dummyProblem } from './dummy';
// import { immer } from 'zustand/middleware/immer';

interface EditorState {
  document: DocumentScheme;
  mode: 'PROBLEM' | 'EXPLANATION';
  setDocument: {
    setAll: (document: DocumentScheme | null) => void;
    setMeta: (meta: DocumentScheme['meta']) => void;
    setProblems: {
      add: (problem: ProblemScheme) => void;
      remove: (problemId: ProblemScheme['id']) => void;
      update: (problemId: ProblemScheme['id']) => ({
        setMeta: (meta: ProblemScheme['meta']) => void;
        setAnswer: (answer: ProblemScheme['answer']) => void;
        setContent: (content: ProblemScheme['content']) => void;
        setExplanation: (explanation: ProblemScheme['explanation']) => void;
      }),
      all: (problems: ProblemScheme[]) => void;
    }
  };
  setMode: (mode: 'PROBLEM' | 'EXPLANATION') => void;
  currentProblemId: string | null;
  setCurrentProblemId: (problemId: string | null) => void;
}

export const useEditorStore = create<EditorState>()(
  devtools((set) => ({
    document: {
      id: uuid(),
      meta: {
        title: 'KICEBIN Sample Document',
        description: 'This is a sample document.',
        pagination: true,
        createdAt: new Timestamp(new Date().getTime() / 1000, 0),
        updatedAt: new Timestamp(new Date().getTime() / 1000, 0),
      },
      problems: [
      ],
    },
    mode: 'PROBLEM',
    setDocument: {
      setAll: (document) => set((state) => ({ document: document ?? {
        id: uuid(),
        meta: {
          title: 'KICEBIN Sample Document',
          description: 'This is a sample document.',
          pagination: true,
          createdAt: new Timestamp(new Date().getTime() / 1000, 0),
          updatedAt: new Timestamp(new Date().getTime() / 1000, 0),
        },
        problems: [],
      } })),
      setMeta: (meta) => set((state) => ({ document: { ...state.document, meta } })),
      setProblems: {
        add: (problem) => set((state) => ({ document: { ...state.document, problems: [...state.document.problems || [], problem] } })),
        remove: (problemId) => set((state) => ({ document: { ...state.document, problems: (state.document.problems || []).filter((problem) => problem.id !== problemId) } })),
        update: (problemId) => ({
          setMeta: (meta) => set((state) => ({
            document: {
              ...state.document,
              problems: state.document.problems?.map((problem) => {
                if (problem.id === problemId) {
                  return { ...problem, meta };
                }
                return problem;
              }
              )},
          })),
          setAnswer: (answer) => set((state) => ({
            document: {
              ...state.document,
              problems: state.document.problems?.map((problem) => {
                if (problem.id === problemId) {
                  return { ...problem, answer };
                }
                return problem;
              }
              )},
          })),
          setContent: (content) => set((state) => ({
            document: {
              ...state.document,
              problems: state.document.problems?.map((problem) => {
                if (problem.id === problemId) {
                  return { ...problem, content };
                }
                return problem;
              }
              )},
          })),
          setExplanation: (explanation) => set((state) => ({
            document: {
              ...state.document,
              problems: state.document.problems?.map((problem) => {
                if (problem.id === problemId) {
                  return { ...problem, explanation };
                }
                return problem;
              }
              )},
          })),
        }),
        all: (problems) => set((state) => ({ document: { ...state.document, problems } })),
      },
    },
    setMode: (mode) => set((state) => ({ mode })),
    currentProblemId: null,
    setCurrentProblemId: (problemId) => set((state) => ({ currentProblemId: problemId })),
  })),
);
