import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import Markdown from './Markdown';
import 'katex/dist/katex.min.css';
import GlobalStyle from '../GlobalStyle';
import { DocumentScheme } from '../types/Document';
import { ProblemScheme } from '../types/Problem';

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
      <CoverPage>
        <CoverPageTitle>
          {document.meta?.title || 'KICEditor'}
        </CoverPageTitle>
        <CoverPageDescription>
          {document.meta?.description || ''}
        </CoverPageDescription>
      </CoverPage>
      {chunk<ProblemScheme>(document.problems,2).map((problemSet, problemSetIndex) => (
        <PageLayout key={problemSetIndex}>
          {
            problemSetIndex % 2 === 0 ? (
              <PageHeader align='left'>
                {document.meta?.title || 'Untitled'}
              </PageHeader>
            ) : (
              <PageHeader align='right'>
                {/* {document.meta?.description || ''} */}
              </PageHeader>
            )
          }
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
                          <ProblemChoices
                            key={blockIndex}
                            choices={block.content as string[]}
                          />
                        );
                      case 'IMAGE':
                        return (
                          block.content && (
                            <ProblemImageContainer
                              key={blockIndex}
                            >
                              <ProblemImage
                                src={block.content as string}
                                alt="uploaded"
                              />
                            </ProblemImageContainer>
                          )
                        );
                      }
                    })
                  }
                </ProblemLayout>
              ))
            }
          </TwoColumnLayout>
          {
            (document.meta && document.meta.pagination) ? (
              <ProblemPagination isEven={problemSetIndex % 2 === 0}>
                {problemSetIndex + 2}
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
  @media print and (min-resolution: 600dpi) {
    @page {
      /* size 210mm 297mm; */
      size: 210mm 297mm;
    }
  }

  print-color-adjust: exact;
  text-rendering: geometricPrecision;

  line-height: 150%;

  font-family: 'Times New Roman', /* 'MaruBuri'*/"SM3중명조";
  font-size: 9pt;

  font-stretch: 0.95%;
  word-spacing: 0.05em;
  letter-spacing: -0.05em;

  word-break: keep-all;
  text-align: justify;

  .math {
    /* zoom: 82.6%; */
    word-break: keep-all;
    white-space: nowrap;
    break-inside: avoid;
    line-break: strict;
  }

  .katex {
    /* transform: scale(0.826); */
    zoom: 82.6%;
    font-stretch: 1em;
    letter-spacing: 0.05em;
    line-height: 100%;
    font: normal 1.21em 'Latin Modern Roman',Times New Roman,serif;
    white-space: nowrap;
  }

  .katex .mathnormal {
    font-family: 'Latin Modern Roman';
  }

  .katex-display {
    /* zoom: 82.6%; */
    display: flex;
    margin: 0.5em 0;
    margin-left: 0.5cm;
    text-align: left;
  }

  /* word-break: keep-all; */
  padding: 0;

  position: absolute;

  p {
    margin: 0;
  }

  text-align: justify;
`;

const CoverPage = styled.div`
  break-inside: avoid !important;
  position: relative;
  /* page-break-before: always !important; */
  /* break-before: page; */
  padding: 2cm 1.5cm 2.5cm 1.5cm;
  margin: 0;

  overflow: hidden;

  box-sizing: border-box;

  background-color: #524dd9;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: left;

  width: 210mm !important;
  height: 297mm !important;
`;

const CoverPageTitle = styled.div`
  color: #fff;
  font-family: 'Pretendard';
  font-weight: bold;
  font-size: 36pt;
  margin-bottom: 0.5cm;
  width: 60%;
  word-break: keep-all;

  line-height: 110%;
`;

const CoverPageDescription = styled.div`
  color: #fff;
  font-family: 'Pretendard';
  font-size: 12pt;

  width: 60%;
`;

const PageLayout = styled.div`
  break-inside: avoid !important;
  position: relative;
  /* page-break-before: always !important; */
  /* break-before: page; */
  padding: 2cm 1.5cm 2.5cm 1.5cm;
  margin: 0;

  overflow: hidden;

  box-sizing: border-box;

  width: 595pt !important;
  height: 840pt !important;
`;

const PageHeader = styled.div<{ align: 'left' | 'right' }>`
  position: absolute;
  top: 1.5cm;
  left: 1.5cm;
  height: 0.5cm;
  color: #524dd9;
  font-family: 'Pretendard-Regular';
  font-size: 10pt;

  width: calc(100% - 3cm);

  display: flex;
  align-items: center;
  justify-content: ${props => props.align === 'left' ? 'flex-start' : 'flex-end'};
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
  height: 100%;

  border-top: 0.5pt solid #524dd9;
  border-bottom: 0.5pt solid #524dd9;

  padding-top: 0.5cm;

  ${ProblemLayout}:nth-child(2)::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 2cm;
    width: 0.5pt;
    height: calc(100% - 4cm);
    background-color: #524dd9;
  }
`;

const ProblemNumber = styled.div`
  font-family: 'Pretendard-Regular';
  font-size: 15pt;
  font-weight: bold;
  margin-bottom: 0.5em;
  color: #2721d8;
`;

const ProblemStatement = styled.div`
  margin-bottom: 1em;
`;

const ProblemBoxed = styled.div`
  font-family: 'Times New Roman', "SM3중명조";
  width: 100%;
  padding: 1em;
  border: 1px solid black;
  margin-bottom: 1em;

  box-sizing: border-box;
`;

const ProblemConditions = styled.div`
  font-family: 'Times New Roman', "SM3중명조";
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 0.2em;

  box-sizing: border-box;
  border: 0.5pt solid black;

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
    list-style-type: "(자) ";
  }

  li:nth-child(10) {
    list-style-type: "(차) ";
  }

  li:nth-child(11) {
    list-style-type: "(카) ";
  }

  li:nth-child(12) {
    list-style-type: "(타) ";
  }

  li:nth-child(13) {
    list-style-type: "(파) ";
  }

  li:nth-child(14) {
    list-style-type: "(하) ";
  }
`;

const ProblemExample = styled.div`
  font-family: 'Times New Roman', "SM3중명조";
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 0.5em;
  /* height: 100%; */

  border: 1px solid black;
  box-sizing: border-box;

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

const ProblemChoices = ({
  choices,
}: {
  choices: string[];
}) => {
  const [nCols, setNCols] = useState(5);
  const choiceRef = useRef<HTMLLIElement>(null);
  const choiceContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (choiceRef.current && choiceContainerRef.current) {
      const width = 326 - 5*32;
      setNCols(
        [
          1, 1, 3, 3, 5, 5,
        ][
          Math.max(Math.min(
            Math.floor(width/choiceRef.current.offsetWidth),
            5),
          1)
        ]
      );
    }
  }, [choices, choiceRef.current, choiceContainerRef.current]);

  return (
    <ProblemChoicesLayout
      cols={nCols}
      ref={choiceContainerRef}
    >
      <ol>
        {choices.map((choice, index) => (
          <li
            key={index}
            ref={choiceRef}
          >
            <Markdown>
              {choice}
            </Markdown>
          </li>
        ))}
      </ol>
    </ProblemChoicesLayout>
  );
};

const ProblemChoicesLayout = styled.div<{ cols: number }>`
  font-family: 'Times New Roman', "SM3중명조";
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  margin-bottom: 1em;

  ol {
    padding: 0 1.5em;
    margin: 0;

    display: grid;
    grid-template-columns: repeat(
      calc(${props => props.cols}),
      1fr
    );

    justify-content: center;
    align-items: center;
    width: 100%;
  }

  ol > li {
    margin-bottom: 0.5em;
    position: inline;
    width: fit-content;
    white-space: nowrap;

    /* border: 1px solid black; */

    box-sizing: border-box;
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

const ProblemPagination = styled.div<{ isEven? : boolean }>`
  position: absolute;
  bottom: 1.2cm;
  ${props => props.isEven ? 'left: 1.5cm;' : 'right: 1.5cm;'}
  font-family: 'Pretendard-Regular';
  color: #524dd9;
  font-size: 11pt;
`;

const ProblemImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 1em;
`;

const ProblemImage = styled.img`
  width: 60%;
  height: auto;
  margin-bottom: 1em;
`;
