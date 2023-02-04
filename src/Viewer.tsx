import React, { useMemo } from 'react';
import styled from 'styled-components';
import Markdown from './components/Markdown';

const Viewer = ({ problems, currentProblemId } : { problems: ProblemScheme[], currentProblemId: string }) => {

  const currentProblem = useMemo(() => {
    return problems.find((problem) => problem.id === currentProblemId) as ProblemScheme;
  }, [problems, currentProblemId]);

  const currentProblemNumber = useMemo(() => {
    return problems.findIndex((problem) => problem.id === currentProblemId) + 1;
  }, [problems, currentProblemId]);

  return (
    <ViewerLayout>
      <ProblemLayout>
        <ProblemNumber>
          {currentProblemNumber.toString().padStart(2, '0')}
        </ProblemNumber>
        {
          currentProblem.content.map((block, blockIndex) => {
            switch (block.type) {
            case 'STATEMENT':
              return (
                <ProblemStatement key={blockIndex}>
                  <Markdown>
                    {block.content}
                  </Markdown>
                </ProblemStatement>
              );
            case 'CONDITIONS':
              return (
                <ProblemConditions key={blockIndex}>
                  <ol>
                    {
                      (block.content as string[]).map((condition, conditionIndex) => (
                        <li key={conditionIndex}>
                          <Markdown>
                            {condition}
                          </Markdown>
                        </li>
                      ))
                    }
                  </ol>
                </ProblemConditions>
              );
            case 'BOXED':
              return (
                <ProblemBoxed key={blockIndex}>
                  <Markdown>
                    {block.content}
                  </Markdown>
                </ProblemBoxed>
              );
            case 'EXAMPLES':
              return (
                <ProblemExample key={blockIndex}>
                  <ol>
                    {
                      (block.content as string[]).map((example, exampleIndex) => (
                        <li key={exampleIndex}>
                          <Markdown>
                            {example}
                          </Markdown>
                        </li>
                      ))
                    }
                  </ol>
                </ProblemExample>
              );
            case 'CHOICES':
              return (
                <ProblemChoices key={blockIndex}>
                  <ol>
                    {
                      (block.content as string[]).map((choice, choiceIndex) => (
                        <li key={choiceIndex}>
                          <Markdown>
                            {choice}
                          </Markdown>
                        </li>
                      ))
                    }
                  </ol>
                </ProblemChoices>
              );
            }
          })
        }
      </ProblemLayout>
    </ViewerLayout>
  );
};

export default Viewer;

const ViewerLayout = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  width: 40%;
  height: 100%;

  padding: 16px;

  background-color: #17171A;
  border-left: 1px solid #37373A;

  font-size: 12px;

  overflow-y: scroll;
`;

const ProblemLayout = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: fit-content;
  min-height: 300px;

  padding: 32px;

  background-color: white;

  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.2);

  font-family: 'Times New Roman', 'MaruBuri', "SM신명조03";

  line-height: 150%;
  font-stretch: 0.95em;
  word-spacing: 0.05em;
  letter-spacing: -0.05em;

  p {
    margin: 0;
  }

  .katex {
    zoom: 82.6%;
    font-stretch: 1em;
    letter-spacing: 0em;
    line-height: 100%;
  }

  .katex-display {
    display: flex;
    margin: 0.5em 0;
    margin-left: 2em;
    text-align: left;
  }
`;

const ProblemNumber = styled.h2`
  font-family: 'Pretendard-bold';
  font-size: 1.5rem;
  margin: 0;
  margin-bottom: 0.5em;
`;

const ProblemConditions = styled.div`
  /* font-family: 'Times New Roman', "SM신명조03"; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding-left: 1em;

  border: 1px solid black;

  box-sizing: border-box;

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
`;

const ProblemStatement = styled.div`
  /* font-family: 'Times New Roman', "SM신명조03"; */
  font-weight: normal;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  /* height: 100%; */

  margin-bottom: 1em;
`;

const ProblemBoxed = styled.div`
  /* font-family: 'Times New Roman', "SM신명조03"; */
  padding: 1em;
  width: 100%;

  border: 1px solid black;

  margin-bottom: 1em;

  box-sizing: border-box;
  `;

const ProblemExample = styled.div`
  /* font-family: 'Times New Roman', "SM신명조03"; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding-left: 1em;
  /* height: 100%; */

  box-sizing: border-box;

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
`;

const ProblemChoices = styled.div`
  /* font-family: 'Times New Roman', "SM신명조03"; */
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
`;
