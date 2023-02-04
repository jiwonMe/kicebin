import React from 'react';
import styled from 'styled-components';
import Markdown from './components/Markdown';
import 'katex/dist/katex.min.css';
import GlobalStyle from './GlobalStyle';

const PrintViewer = ({ document }: {
  document: DocumentScheme,
}) => {

  // [a, b, c, d, ...] => [[a, b], [c, d], ...]
  const chunk = <T,>(arr: T[], size: number) => {
    const chunked_arr = [];
    let index = 0;
    while (index < arr.length) {
      chunked_arr.push(arr.slice(index, size + index));
      index += size;
    }
    return chunked_arr;
  };

  return (
    <DocumentLayout
    >
      <GlobalStyle />
      {chunk<ProblemScheme>(document.problems,2).map((problemSet, problemSetIndex) => (
        <PageLayout key={problemSetIndex}>
          <TwoColumnLayout>
            {
              problemSet.map((problem, problemIndex) => (
                <ProblemLayout key={problemIndex}>
                  <ProblemNumber>
                    {(
                      problemSetIndex * 2
                      + problemIndex + 1
                    ).toString().padStart(2, '0')}
                  </ProblemNumber>
                  {
                    problem.content.map((block, blockIndex) => {
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
              ))
            }
          </TwoColumnLayout>
          {
            (document.meta.pagination) ? (
              <ProblemPagination isEven={problemSetIndex % 2 === 1}>
                {problemSetIndex + 1}
              </ProblemPagination>
            ) : null
          }
        </PageLayout>
      ))}
    </DocumentLayout>
  );
};

export default PrintViewer;

const DocumentLayout = styled.div`
  @media print {
    @page {
      size: A4;
    }
  }

  line-height: 150%;

  font-family: 'Times New Roman', "SM신명조03";
  font-size: 9pt;

  font-stretch: 0.95em;
  word-spacing: 0.05em;
  letter-spacing: -0.05em;

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

  word-break: keep-all;
  padding: 0;

  position: absolute;

  p {
    margin: 0;
  }
`;

const PageLayout = styled.div`
  break-inside: avoid !important;
  position: relative;
  /* page-break-before: always !important; */
  /* break-before: page; */
  padding: 2cm 1.5cm 2cm 1.5cm;
  margin: 0;

  overflow: hidden;

  box-sizing: border-box;

  width: 595pt !important;
  height: 840pt !important;
`;

const ProblemLayout  = styled.div`
  width: 48%;
`;

const TwoColumnLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;

  ${ProblemLayout}:nth-child(2)::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 2cm;
    width: 0.5pt;
    height: 85%;
    background-color: black;
  }
`;

const ProblemNumber = styled.div`
  font-family: 'Pretendard-Regular';
  font-size: 15pt;
  font-weight: bold;
  margin-bottom: 0.5em;
`;

const ProblemStatement = styled.div`
  margin-bottom: 1em;
`;

const ProblemBoxed = styled.div`
  font-family: 'Times New Roman', "SM신명조03";
  width: 100%;
  padding: 1em;
  border: 1px solid black;
  margin-bottom: 1em;

  box-sizing: border-box;
`;

const ProblemConditions = styled.div`
  font-family: 'Times New Roman', "SM신명조03";
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 0.5em 1em;

  box-sizing: border-box;
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
`;

const ProblemExample = styled.div`
  font-family: 'Times New Roman', "SM신명조03";
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 1em;
  /* height: 100%; */

  border: 1px solid black;
  box-sizing: border-box;

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
    display: flex;
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
`;

const ProblemPagination = styled.div<{ isEven? : boolean }>`
  position: absolute;
  bottom: 1cm;
  ${props => props.isEven ? 'left: 1cm;' : 'right: 1cm;'}
  font-family: 'Times New Roman', "SM신명조03";
  font-size: 10pt;
`;
