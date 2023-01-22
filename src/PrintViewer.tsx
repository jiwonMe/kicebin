import React from 'react'
import styled from 'styled-components'
import Markdown from './components/Markdown'
import 'katex/dist/katex.min.css'
import SM신명조 from './assets/SM3신명조-03.woff'

const PrintViewer = ({ problems, meta }: { 
  problems: ProblemSchema[],
  meta?: {
    title?: string,
    header?: string,
    footer?: string,
    pagination?: boolean,
  } 
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
  }

  return (
    <DocumentLayout
    >
      {chunk<ProblemSchema>(problems,2).map((problemSet, problemSetIndex) => (
        <PageLayout>
          <TwoColumnLayout>
          {
            problemSet.map((problem, problemIndex) => (
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
                    (problem.boxed === '') ? null : (
                      <ProblemBoxed>
                        <Markdown>
                          {problem.boxed}
                        </Markdown>
                      </ProblemBoxed>
                    )
                  }
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
                      problem.choices.map((choice, choiceIndex) => {
                        return (
                          choice !== '' && (
                            <li key={choiceIndex}>
                              <Markdown>
                                {choice}
                              </Markdown>
                            </li>
                          )
                        )
                      })
                    }
                  </ol>
                </ProblemChoices>
              </ProblemLayout>
            ))
          }
          </TwoColumnLayout>
        {
          (meta?.pagination) ? (
            <ProblemPagination isEven={problemSetIndex % 2 === 1}>
              {problemSetIndex + 1}
            </ProblemPagination>
          ) : null
        }
        </PageLayout>
      ))}
    </DocumentLayout>
  )
}

export default PrintViewer

const DocumentLayout = styled.div`
  @font-face {
    font-family: 'SM신명조03';
    src: local('SM신명조03'), url(${SM신명조});
  }

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

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
`

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
`

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
`

const ProblemStatement = styled.div`
  margin-bottom: 1em;
`

const ProblemBoxed = styled.div`
  font-family: 'Times New Roman', "SM신명조03";
  width: 100%;
  padding: 1em;
  border: 1px solid black;
  margin-bottom: 1em;

  box-sizing: border-box;
`

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
`

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
`

const ProblemPagination = styled.div<{ isEven? : boolean }>`
  position: absolute;
  bottom: 1cm;
  ${props => props.isEven ? 'left: 1cm;' : 'right: 1cm;'}
  font-family: 'Times New Roman', "SM신명조03";
  font-size: 10pt;
`
