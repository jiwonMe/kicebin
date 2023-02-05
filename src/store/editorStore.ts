import { v4 as uuid } from 'uuid';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { dummyProblem } from './dummy';
// import { immer } from 'zustand/middleware/immer';

const sampleProblem: ProblemScheme = {
  id: uuid(),
  meta: {
    title: 'Sample Problem',
    description: 'This is a sample problem.',
  },
  content: [
    {
      id: uuid(),
      type: 'STATEMENT',
      content: 'This is a statement.',
    },
    {
      id: uuid(),
      type: 'CONDITIONS',
      content: ['This is a condition (a).', 'This is a condition (b).'],
    },
    {
      id: uuid(),
      type: 'BOXED',
      content: 'This is a boxed content.',
    },
    {
      id: uuid(),
      type: 'EXAMPLES',
      content: [
        'This is an example.',
        'This is another example.',
      ],
    },
    {
      id: uuid(),
      type: 'CHOICES',
      content: [
        'first choice',
        'second choice',
        'third choice',
        'fourth choice',
        'fifth choice'
      ],
    },
  ]
};



interface EditorState {
  document: DocumentScheme;
  setDocument: {
    setAll: (document: DocumentScheme | null) => void;
    setMeta: (meta: DocumentScheme['meta']) => void;
    setProblems: {
      add: (problem: ProblemScheme) => void;
      remove: (problemId: ProblemScheme['id']) => void;
      update: (problemId: ProblemScheme['id']) => ({
        setMeta: (meta: ProblemScheme['meta']) => void;
        setContent: (content: ProblemScheme['content']) => void;
      })
    }
  };
  currentProblemId: string | null;
  setCurrentProblemId: (problemId: string) => void;
}

export const useEditorStore = create<EditorState>()(
  devtools((set) => ({
    document: {
      id: uuid(),
      meta: {
        title: 'KICEBIN Sample Document',
        description: 'This is a sample document.',
        pagination: true,
      },
      problems: [
        // sampleProblem,
        dummyProblem,
      ],
    },
    setDocument: {
      setAll: (document) => set((state) => ({ document: document ?? {
        id: uuid(),
        meta: {
          title: 'KICEBIN Sample Document',
          description: 'This is a sample document.',
          pagination: true,
        },
        problems: [dummyProblem],
      } })),
      setMeta: (meta) => set((state) => ({ document: { ...state.document, meta } })),
      setProblems: {
        add: (problem) => set((state) => ({ document: { ...state.document, problems: [...state.document.problems, problem] } })),
        remove: (problemId) => set((state) => ({ document: { ...state.document, problems: state.document.problems.filter((problem) => problem.id !== problemId) } })),
        update: (problemId) => ({
          setMeta: (meta) => set((state) => ({
            document: {
              ...state.document,
              problems: state.document.problems.map((problem) => {
                if (problem.id === problemId) {
                  return { ...problem, meta };
                }
                return problem;
              }
              )},
          })),
          setContent: (content) => set((state) => ({
            document: {
              ...state.document,
              problems: state.document.problems.map((problem) => {
                if (problem.id === problemId) {
                  return { ...problem, content };
                }
                return problem;
              }
              )},
          })),
        })
      },
    },
    currentProblemId: null,
    setCurrentProblemId: (problemId) => set((state) => ({ currentProblemId: problemId })),
  })),
);
