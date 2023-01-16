import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'

import PrintViewer from './PrintViewer';
import { Button } from 'antd';
import Frame, { FrameContext } from 'react-frame-component';
import { StyleSheetManager } from 'styled-components';
import Markdown from './components/Markdown';
import GlobalStyle from './GlobalStyle';

const Viewer = ({ problem } : { problem: ProblemSchema }) => {
  const printViewerRef = useRef<HTMLIFrameElement>(null);

  const print = () => {
    if (printViewerRef.current) {
      const win = printViewerRef.current.contentWindow;
      if (win) {
        const head = win.document.head;
        const link = win.document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css';
        link.integrity = 'sha384-vKruj+a13U8yHIkAyGgK1J3ArTLzrFGBbBc0tDp4ad/EyewESeXE/Iv67Aj8gKZ0';
        link.crossOrigin = 'anonymous';
        head.appendChild(link);

        const link2 = win.document.createElement('link');
        link2.rel = 'stylesheet';
        link2.href = './assets/index.css';
        head.appendChild(link2);

        const script = win.document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.js';
        script.integrity = 'sha384-PwRUT/YqbnEjkZO0zZxNqcxACrXe+j766U2amXcgMg5457rve2Y7I6ZJSm2A0mS4';
        script.crossOrigin = 'anonymous';
        head.appendChild(script);

        setTimeout(() => {
          win.focus();
          win.print();
        }, 3000)
      }
    }
  }

  const InjectFrameStyles = (props: any) => {
    const { document } = useContext(FrameContext);
    return <StyleSheetManager target={document?.head}>{props.children}</StyleSheetManager>;
  };

  return (
    <ViewerLayout>
      <div>
        <Button
          onClick={print}
        >프린트</Button>
      </div>
      <ProblemLayout>
        <ProblemNumber>
          {problem.problemNumber}
        </ProblemNumber>
        <ProblemStatement>
          <Markdown>
            {problem.question}
          </Markdown>
        </ProblemStatement>
        {
          (problem.conditions[0] === '' && problem.conditions[1] === '') ? null : (
            <ProblemConditions>
              <ol>
                <li>
                  <Markdown>
                    {problem.conditions[0]}
                  </Markdown>
                </li>
                <li>
                  <Markdown>
                    {problem.conditions[1]}
                  </Markdown>
                </li>
              </ol>
            </ProblemConditions>
          )
        }
        <ProblemStatement>
          <Markdown>
            {problem.question2}
          </Markdown>
        </ProblemStatement>
        {
          (problem.examples.first === '' && problem.examples.second === '' && problem.examples.third === '') ? null : (
            <ProblemExample>
              <ol>
                <li>
                  <Markdown>
                    {problem.examples.first}
                  </Markdown>
                </li>
                <li>
                  <Markdown>
                    {problem.examples.second}
                  </Markdown>
                </li>
                <li>
                  <Markdown>
                    {problem.examples.third}
                  </Markdown>
                </li>
              </ol>
            </ProblemExample>
          )
        }
        <ProblemChoices>
          <ol>
            {
              problem.choices.map((choice, index) => {
                return (
                  <Markdown>
                    <li key={index}>{choice}</li>
                  </Markdown>
                )
              })
            }
          </ol>
        </ProblemChoices>
      </ProblemLayout>
      <Frame
        style={{
          display: 'none',
          backgroundColor: 'white',
        }}
        ref={printViewerRef}
      >
        <GlobalStyle />
        <InjectFrameStyles>
          <PrintViewer
            problems={[problem]}
          />
        </InjectFrameStyles>
      </Frame>
    </ViewerLayout>
  )
}

export default Viewer

const ViewerLayout = styled.div`
  flex-grow: 1;

  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  min-width: 360px;
  width: 100%;
  height: 100%;

  padding: 1em;

  background-color: #dfe1e8;

`

const ProblemLayout = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;

  padding: 1em;

  background-color: white;

  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.2);
`

const ProblemNumber = styled.h2`
  font-family: 'Pretendard-regular';
  font-size: 1.5rem;
  margin: 0;
  margin-bottom: 1em;
`

const ProblemConditions = styled.div`
  font-family: 'Times New Roman', "SM신명조03";
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding-left: 1em;

  border: 1px solid black;

  margin-bottom: 1em;

  ol {
    padding: 0 1.75em;
    margin: 0;
  }

  ol > li {
    margin-bottom: 0.5em;
  }

  li:nth-child(1) {
    list-style-type: "(가) ";
  }

  li:nth-child(2) {
    list-style-type: "(나) ";
  }
`

const ProblemStatement = styled.div`
  font-family: 'Times New Roman', "SM신명조03";
  font-weight: normal;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  /* height: 100%; */

  margin-bottom: 1em;
`

const ProblemExample = styled.div`
  font-family: 'Times New Roman', "SM신명조03";
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding-left: 1em;
  /* height: 100%; */

  border: 1px solid black;

  margin-bottom: 1em;

  ol {
    padding: 0 1.75em;
    margin: 0;
  }

  ol > li {
    margin: 0.75em 0;
  }

  li:nth-child(1) {
    list-style-type: "ㄱ. ";
  }

  li:nth-child(2) {
    list-style-type: "ㄴ. ";
  }

  li:nth-child(3) {
    list-style-type: "ㄷ. ";
  }
`

const ProblemChoices = styled.div`
  font-family: 'Times New Roman', "SM신명조03";
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  margin-bottom: 1em;

  ol {
    padding: 0 1.5em;
    margin: 0;
  }

  ol > li {
    margin-bottom: 0.5em;
  }
  
  li:nth-child(1) {
    list-style-type: "① ";
  }

  li:nth-child(2) {
    list-style-type: "② ";
  }

  li:nth-child(3) {
    list-style-type: "③ ";
  }

  li:nth-child(4) {
    list-style-type: "④ ";
  }

  li:nth-child(5) {
    list-style-type: "⑤ ";
  }
`

const PageLayout = styled.div`

`