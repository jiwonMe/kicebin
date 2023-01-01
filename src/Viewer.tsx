import styled from 'styled-components'

const Viewer = ({ problem } : { problem: ProblemSchema }) => {
  return (
    <ViewerLayout className="viewer">
      <ProblemLayout>
        <ProblemNumber>
          {problem.problemNumber}
        </ProblemNumber>
        <ProblemStatement>
          {problem.question}
        </ProblemStatement>
        <ProblemExample>
          <ol>
            <li>{problem.examples.first}</li>
            <li>{problem.examples.second}</li>
            <li>{problem.examples.third}</li>
          </ol>
        </ProblemExample>
        <ProblemChoices>
          <ol>
            <li>{problem.choices[0]}</li>
            <li>{problem.choices[1]}</li>
            <li>{problem.choices[2]}</li>
            <li>{problem.choices[3]}</li>
            <li>{problem.choices[4]}</li>
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

  border: 1px solid gray;
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
`

const ProblemNumber = styled.h2`
  font-family: 'Pretendard-regular';
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  margin-bottom: 1em;
`

const ProblemStatement = styled.div`
  font-family: 'KBIZHanmaumMyungjo';
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;

  margin-bottom: 1em;
`

const ProblemExample = styled.div`
  font-family: 'KBIZHanmaumMyungjo';
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;

  border: 1px solid black;

  li:nth-child(1) {
    list-style-type: "ㄱ.";
    font-weight: 600;
  }

  li:nth-child(2) {
    list-style-type: "ㄴ.";
    font-weight: 600;
  }

  li:nth-child(3) {
    list-style-type: "ㄷ.";
    font-weight: 600;
  }
`

const ProblemChoices = styled.div`
  font-family: 'KBIZHanmaumMyungjo';
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  margin-top: 1em;

  ol {
    padding: 0 1em;
  }
  
  li:nth-child(1) {
    list-style-type: "①";
    font-weight: 600;
  }

  li:nth-child(2) {
    list-style-type: "②";
    font-weight: 600;
  }

  li:nth-child(3) {
    list-style-type: "③";
    font-weight: 600;
  }

  li:nth-child(4) {
    list-style-type: "④";
    font-weight: 600;
  }

  li:nth-child(5) {
    list-style-type: "⑤";
    font-weight: 600;
  }
`