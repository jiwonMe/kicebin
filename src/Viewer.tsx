import styled from 'styled-components'
import Markdown from './components/Markdown';

const Viewer = ({ problems, index } : { problems: ProblemSchema[], index: number }) => {
  return (
    <ViewerLayout>
      <ProblemLayout>
        <ProblemNumber>
          {problems[index].problemNumber}
        </ProblemNumber>
        <ProblemStatement>
          <Markdown>
            {problems[index].question}
          </Markdown>
        </ProblemStatement>
        {
          (problems[index].boxed === '') ? null : (
            <ProblemBoxed>
              <Markdown>
                {problems[index].boxed}
              </Markdown>
            </ProblemBoxed>
          )
        }
        {
          (problems[index].conditions[0] === '' && problems[index].conditions[1] === '') ? null : (
            <ProblemConditions>
              <ol>
                <li>
                  <Markdown>
                    {problems[index].conditions[0]}
                  </Markdown>
                </li>
                <li>
                  <Markdown>
                    {problems[index].conditions[1]}
                  </Markdown>
                </li>
              </ol>
            </ProblemConditions>
          )
        }
        <ProblemStatement>
          <Markdown>
            {problems[index].question2}
          </Markdown>
        </ProblemStatement>
        {
          (problems[index].examples.first === '' && problems[index].examples.second === '' && problems[index].examples.third === '') ? null : (
            <ProblemExample>
              <ol>
                <li>
                  <Markdown>
                    {problems[index].examples.first}
                  </Markdown>
                </li>
                <li>
                  <Markdown>
                    {problems[index].examples.second}
                  </Markdown>
                </li>
                <li>
                  <Markdown>
                    {problems[index].examples.third}
                  </Markdown>
                </li>
              </ol>
            </ProblemExample>
          )
        }
        <ProblemChoices>
          <ol>
            {
              problems[index].choices.map((choice, index) => {
                return (
                <li key={index}>
                  <Markdown>
                      {choice}
                  </Markdown>
                </li>
                )
              })
            }
          </ol>
        </ProblemChoices>
      </ProblemLayout>
    </ViewerLayout>
  )
}

export default Viewer

const ViewerLayout = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;

  padding: 1em;

  background-color: #dfe1e8;

  font-size: 12px;
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
`

const ProblemNumber = styled.h2`
  font-family: 'Pretendard-bold';
  font-size: 1.5rem;
  margin: 0;
  margin-bottom: 0.5em;
`

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
`

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
`

const ProblemBoxed = styled.div`
  /* font-family: 'Times New Roman', "SM신명조03"; */
  padding: 1em;
  width: 100%;
  
  border: 1px solid black;
  
  margin-bottom: 1em;

  box-sizing: border-box;
  `

const ProblemExample = styled.div`
  /* font-family: 'Times New Roman', "SM신명조03"; */
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
`