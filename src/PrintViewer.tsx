import React from 'react'
import styled from 'styled-components'
import Markdown from './components/Markdown'
import 'katex/dist/katex.min.css'
import SM신명조 from './assets/SM3신명조-03.woff'

const PrintViewer = ({ problems }: { 
  problems: ProblemSchema[] }) => {
  return (
    <DocumentLayout
    >
      {problems.map( problem => (
        <PageLayout>
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

  /* a4 size */
  font-family: 'Times New Roman', "SM신명조03";
`

const PageLayout = styled.div`
  /* border: 1px solid black; */
  page-break-after: always;
  padding: 2cm 2cm 2cm 2cm;
`

const ProblemNumber = styled.div`
  font-family: 'Pretendard-Regular';
  font-size: 15pt;
  font-weight: bold;
  margin-bottom: 1em;
`

const ProblemStatement = styled.div`
  font-size: 12pt;
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

const ProblemExample = styled.div`
  font-family: 'Times New Roman', "SM신명조03";
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
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