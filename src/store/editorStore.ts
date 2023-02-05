import { v4 as uuid } from 'uuid';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
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

const dummyProblem: ProblemScheme = {
  id: uuid(),
  meta: {
    title: 'Dummy Problem',
    description: 'This is a dummy problem.',
  },
  content: [
    {
      id: uuid(),
      type: 'STATEMENT',
      content:
`첫째항이 $1$인 수열 $\\{a_n\\}$의 첫째항부터 제 $n$항까지의 합을
$S_n$이라 하자. 다음은 모든 자연수 $n$에 대하여

$$
(n+1)S_{n+1}=\\log_2(n+2)+\\sum_{k=1}^{n}S_k \\cdots (*)
$$

가 성립할 때, $\\displaystyle\\sum_{k=1}^{n} ka_{k}$ 를 구하는 과정이다.`
    },
    {
      id: uuid(),
      type: 'BOXED',
      content:
`주어진 식 $(*)$에 의하여
$$
  nS_n=\\log_2(n+1) + \\sum_{k=1}^{n-1}S_k\\ (n\\ge2) \\cdots \\text{㉠}
$$
이다. $(*)$에서 ㉠을 빼서 정리하면
$$
  \\begin{aligned}\\\\
  &(n+1)S_{n+1} - nS_n\\\\
  &=\\log_2(n+2)-\\log_2(n+1) + \\sum_{k=1}^{n}S_k - \\sum_{k=1}^{n-1}S_k\\ (n\\ge2)
  \\end{aligned}
$$
이므로
$$
  \\text{\\boxed{~(가)~}}\\times a_{n+1} = \\log_2\\frac{n+2}{n+1}\\ (n\\ge2)
$$
이다.
$a_1=1=\\log_2 2$이고,
$2S_2 = \\log_2 3 + S_1 = \\log_2 3 + a_1$이므로
모든 자연수 $n$에 대하여
$$
  na_n = \\text{\\boxed{~(나)~}}
$$
이다. 따라서
$$
  \\sum_{k=1}^{n}ka_k = \\text{\\boxed{~(다)~}}
$$
이다.
`
    },
    {
      id: uuid(),
      type: 'STATEMENT',
      content: `위의 (가), (나), (다)에 알맞은 식을 각각 $f(n)$, $g(n)$, $h(n)$이라
      할 때, $f(8)-g(8)+h(8)$의 값은? [4점]`
    },
    {
      id: uuid(),
      type: 'CHOICES',
      content: [
        '$12$',
        '$13$',
        '$14$',
        '$15$',
        '$16$',
      ],
    }
  ],
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
        problems: [sampleProblem],
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
