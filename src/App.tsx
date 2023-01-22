import { useContext, useEffect, useRef, useState } from 'react'
import styled, { StyleSheetManager } from 'styled-components'
import Editor from './Editor'
import Logo from './Logo'
import Viewer from './Viewer'
import { Layout, Col, Row, Menu, Button } from 'antd'
import { v4 as uuid } from 'uuid';
import ProblemListContainer from './ProblemListContainer'
import TopBar from './TopBar'
import GlobalStyle from './GlobalStyle'
import Frame, { FrameContext } from 'react-frame-component'
import PrintViewer from './PrintViewer'

const { Header, Footer, Sider, Content } = Layout;

const sampleProblem: ProblemSchema = {
  id: uuid(),
  problemNumber: '16',
  question: 
`첫째항이 $1$인 수열 $\\{a_n\\}$의 첫째항부터 제 $n$항까지의 합을 
$S_n$이라 하자. 다음은 모든 자연수 $n$에 대하여

$$
(n+1)S_{n+1}=\\log_2(n+2)+\\sum_{k=1}^{n}S_k \\cdots (*)
$$

가 성립할 때, $\\displaystyle\\sum_{k=1}^{n} ka_{k}$ 를 구하는 과정이다.`,
question2: `위의 (가), (나), (다)에 알맞은 식을 각각 $f(n)$, $g(n)$, $h(n)$이라 
할 때, $f(8)-g(8)+h(8)$의 값은? [4점]`,
    conditions: ['', '', ''],
    boxed: `
주어진 식 $(*)$에 의하여
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
이다.`,
  examples: {
    first: '',
    second: '',
    third: '',
  },
  choices: ['$12$', '$13$', '$14$', '$15$', '$16$'],
}

const createNewProblem = ({ index }: { index? : number }) => {
  return {
    id: uuid(),
    problemNumber: index ? `${index}` : '000',
    question: '',
    question2: '',
    conditions: ['', '', ''],
    boxed: '',
    examples: {
      first: '',
      second: '',
      third: '',
    },
    choices: [],
  }
}

const InjectFrameStyles = (props: any) => {
  const { document } = useContext(FrameContext);
  return <StyleSheetManager target={document?.head}>{props.children}</StyleSheetManager>;
};

const App = () => {
  const [problemList, setProblemList] = useState<ProblemSchema[]>([sampleProblem]);
  const [index, _setIndex] = useState<number>(0);
  
  const printViewerRef = useRef<HTMLIFrameElement>(null);

  const print = () => {
    if (printViewerRef.current) {
      const win = printViewerRef.current.contentWindow;
      if (win) {
        win.focus();
        win.print();
      }
    }
  }

  const setIndex = (index: number) => {
    if (index < 0) {
      _setIndex(0);
    }
    if (index >= problemList.length) {
      const newProblemList = [...problemList];
      newProblemList.push(createNewProblem({ index: problemList.length + 1}));
      setProblemList(newProblemList);
    }
    _setIndex(index);
  }

  useEffect(() => {
    console.log(index);
  },[index])

  return (
    <EntireLayout>
      <TopLayout>
        <TopBar
          actions={{
            printDocument: () => {
              print();
            }
          }}
        />
      </TopLayout>
      <MainLayout>
        <ProblemListContainer
          problems={problemList}
          currentProblemIndex={index}
          createNewProblem={() => {
            const newProblemList = [...problemList];
            newProblemList.push(createNewProblem({
              index: problemList.length + 1,
            }));
            setProblemList(newProblemList);
          }}
          onClick={(index) => {
            setIndex(index);
          }}
        />
        <EditorContainerLayout>
          {/* <a
            onClick={() => {
              // new tab
              window.open('https://velog.io/@d2h10s/LaTex-Markdown-%EC%88%98%EC%8B%9D-%EC%9E%91%EC%84%B1%EB%B2%95');
            }}
          >[참고] LaTeX 수식 입력방법</a> */}
          <Editor
            problem={problemList[index]}
            setProblem={(problem) => {
              const newProblemList = [...problemList];
              newProblemList[index] = problem;
              setProblemList(newProblemList);
            }}
          />
          <Button
            onClick={() => {
              setIndex(index - 1);
            }}
          >이전</Button>
          <Button
            onClick={() => {
              setIndex(index + 1);
            }}
          >다음</Button>
        </EditorContainerLayout>
        <ViewerContainerLayout>
          <Viewer
            problems={problemList}
            index={index}
          />
        </ViewerContainerLayout>
      </MainLayout>
      <Frame
        style={{
          display: 'none',
          backgroundColor: 'white',
        }}
        ref={printViewerRef}
        head={
          <>
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css"
              integrity="sha384-vKruj+a13U8yHIkAyGgK1J3ArTLzrFGBbBc0tDp4ad/EyewESeXE/Iv67Aj8gKZ0"
              crossOrigin="anonymous"
            />
            <link
              rel="stylesheet"
              href="./assets/index.css"
            />
            <script
              src="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.js"
              integrity='sha384-PwRUT/YqbnEjkZO0zZxNqcxACrXe+j766U2amXcgMg5457rve2Y7I6ZJSm2A0mS4'
              crossOrigin='anonymous'
            />
            <style>
              {/* css */`
              html, body {
                padding: 0;
                margin: 0;
                height: 100%;
                page-break-inside: avoid;
                break-inside: avoid-page;
              }
              `}
            </style>
          </>
        }
      >
        <GlobalStyle />
        <InjectFrameStyles>
          <PrintViewer
            problems={problemList}
            meta={{
              title: '수능 오답노트',
              pagination: true,
            }}
          />
        </InjectFrameStyles>
      </Frame>
    </EntireLayout>
  )
}

export default App

const EntireLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;

  box-sizing: border-box;

  position: fixed;
`;

const TopLayout = styled.div`
  display: flex;
  height: 50px;
`;

const MainLayout = styled.div`
  display: flex;

  height: calc(100vh - 50px);

  box-sizing: border-box;
`

const EditorContainerLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: 2;
  min-width: 500px;

  // border in center
  border: 1px solid #a1a1a1;
  border-left: none;

  overflow: scroll;

  box-sizing: border-box;
`

const ViewerContainerLayout = styled.div`
  flex-wrap: 1;
  min-width: 400px;

  // border in center
  border: 1px solid #a1a1a1;
  border-left: none;

  overflow: scroll;
`;