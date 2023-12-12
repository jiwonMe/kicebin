import React, { useMemo } from 'react';
import styled from 'styled-components';
import { ProblemScheme } from '../types/Problem';
import Markdown from './Markdown';

const Viewer = ({ problems, currentProblemId, mode, className } : { problems: ProblemScheme[], currentProblemId: string | null,
mode: 'PROBLEM' | 'EXPLANATION',
  className?: string }) => {

  const currentProblem = useMemo(() => {
    return problems.find((problem) => problem.id === currentProblemId) as ProblemScheme;
  }, [problems, currentProblemId]);

  const currentProblemNumber = useMemo(() => {
    return problems.findIndex((problem) => problem.id === currentProblemId) + 1;
  }, [problems, currentProblemId]);

  const content = useMemo(() => {
    if (!currentProblem) {
      return [];
    } else if (mode === 'PROBLEM') {
      return currentProblem.content || [];
    } else {
      return currentProblem.explanation || [];
    }
  }, [currentProblem, mode]);

  return (
    <ViewerLayout
      className={className}
    >
      <ProblemLayout>
        <ProblemNumber>
          {currentProblemNumber.toString().padStart(2, '0')}
        </ProblemNumber>
        {
          content.map((block, blockIndex) => {
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
            case 'IMAGE':
              return (
                block.content && (
                  <ProblemImage
                    key={blockIndex}
                    src={block.content as string}
                    alt="uploaded"
                  />
                )
              );
            }
          })
        }
      </ProblemLayout>
    </ViewerLayout>
  );
};

export default React.memo(Viewer);

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

  font-size: 14px;

  overflow-y: scroll;

  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const ProblemLayout = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: fit-content;

  padding: 32px;

  background-color: white;

  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.2);

  font-family: 'Times New Roman', "KoPubWorld Batang";

  line-height: 150%;

  word-break: keep-all;
  text-align: justify;

  font-stretch: 0.95%;
  word-spacing: 0.05em;
  letter-spacing: -0.05em;

  /* transform: scaleX(0.95); */


  p {
    margin: 0;
  }

  math {
    zoom: 120%;
    font-family: 'Latin Modern Math', 'Times New Roman', "KoPubWorld Batang";
  }

  mo.tml-prime {
    margin-left: 0.1em;
  }
/*
  mfrac mroot mn {
    transform: translateY(25%);
  } */

  /* if twin, no margin between */
  .tml-prime + .tml-prime {
    margin-left: 0;
  }


  .math {
    /* transform: scale(0.826) !important; */
    zoom: 0.826;
    font-size: 14px;
  }

  .katex {
    font-stretch: 1em;
    letter-spacing: 0em;
    line-height: 1.2;
    text-rendering: auto;
    /* font: normal 1.21em 'HYHwpEQ_Partial', 'Latin Modern Math', serif; */
    white-space: nowrap;
  }

  .katex-display {
    display: flex;
    margin: 0.5em 0 !important;
    margin-left: 1em !important;
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
  font-family: 'Times New Roman', "KoPubWorld Batang";
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 0.2em;

  border: 1px solid black;

  box-sizing: border-box;

  margin-bottom: 1em;

  ol {
    padding: 0 1.75em;
    margin: 0;
  }

  ol > li {
    margin: 0.2em 1em;
  }

  li:nth-child(1) {
    list-style-type: "(가)  ";
  }

  li:nth-child(2) {
    list-style-type: "(나)  ";
  }

  li:nth-child(3) {
    list-style-type: "(다)  ";
  }

  li:nth-child(4) {
    list-style-type: "(라)  ";
  }

  li:nth-child(5) {
    list-style-type: "(마)  ";
  }

  li:nth-child(6) {
    list-style-type: "(바)  ";
  }

  li:nth-child(7) {
    list-style-type: "(사)  ";
  }

  li:nth-child(8) {
    list-style-type: "(아)  ";
  }

  li:nth-child(9) {
    list-style-type: "(자)  ";
  }

  li:nth-child(10) {
    list-style-type: "(차)  ";
  }

  li:nth-child(11) {
    list-style-type: "(카)  ";
  }

  li:nth-child(12) {
    list-style-type: "(타)  ";
  }

  li:nth-child(13) {
    list-style-type: "(파)  ";
  }

  li:nth-child(14) {
    list-style-type: "(하)  ";
  }
`;

const ProblemStatement = styled.div`
  font-family: 'Times New Roman', "KoPubWorld Batang";
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
  font-family: 'Times New Roman', "KoPubWorld Batang";
  padding: 1em;
  width: 100%;

  border: 1px solid black;

  margin-bottom: 1em;

  box-sizing: border-box;
  `;

const ProblemExample = styled.div`
  font-family: 'Times New Roman', "KoPubWorld Batang";
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding-left: 0.5em;
  /* height: 100%; */

  box-sizing: border-box;

  border: 1px solid black;

  margin-bottom: 1em;

  ol {
    padding: 0 1.75em;
    margin: 0.5em 0;
  }

  ol > li {
    margin: 0;
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

  li:nth-child(4) {
    list-style-type: "ㄹ. ";
  }

  li:nth-child(5) {
    list-style-type: "ㅁ. ";
  }

  li:nth-child(6) {
    list-style-type: "ㅂ. ";
  }

  li:nth-child(7) {
    list-style-type: "ㅅ. ";
  }

  li:nth-child(8) {
    list-style-type: "ㅇ. ";
  }

  li:nth-child(9) {
    list-style-type: "ㅈ. ";
  }

  li:nth-child(10) {
    list-style-type: "ㅊ. ";
  }

  li:nth-child(11) {
    list-style-type: "ㅋ. ";
  }

  li:nth-child(12) {
    list-style-type: "ㅌ. ";
  }

  li:nth-child(13) {
    list-style-type: "ㅍ. ";
  }

  li:nth-child(14) {
    list-style-type: "ㅎ. ";
  }
`;

const ProblemChoices = styled.div`
  font-family: 'Times New Roman', "KoPubWorld Batang";
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
    display: flex;

    justify-content: center;
    align-items: center;
    width: 100%;
  }

  ol > li {
    margin-bottom: 0.5em;
    position: inline;
    flex-grow: 1;
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

  li:nth-child(6) {
    list-style-type: "⑥ ";
  }

  li:nth-child(7) {
    list-style-type: "⑦ ";
  }

  li:nth-child(8) {
    list-style-type: "⑧ ";
  }

  li:nth-child(9) {
    list-style-type: "⑨ ";
  }

  li:nth-child(10) {
    list-style-type: "⑩ ";
  }
`;

const ProblemImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 1em;
`;
