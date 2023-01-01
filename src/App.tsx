import { useState } from 'react'
import styled from 'styled-components'
import Editor from './Editor'
import Logo from './Logo'
import Viewer from './Viewer'

const App = () => {
  const [problem, setProblem] = useState<ProblemSchema>({
    id: 0,
    problemNumber: '123',
    question: '테스트 문항입니다',
    examples: {
      first: '첫번째 보기입니다',
      second: '두번째 보기입니다',
      third: '세번째 보기입니다',
    },
    choices: ['정답 1', '정답 2', '정답 3', '정답 4', '정답 5'],
  })

  return (
    <div className="App">
      <div className="Header">
        <Logo />
      </div>
      <MainLayout>
        <Viewer problem={problem} />
        <Editor
          problem={problem}
          setProblem={setProblem}
        />
      </MainLayout>
    </div>
  )
}

export default App

const MainLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`