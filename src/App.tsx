import { useState } from 'react'
import styled from 'styled-components'

interface ProblemSchema {
  id: number,
  problemNumber: string,
  question: string,
  examples: {
    first: string,
    second: string,
    third: string,
  }
  choices: string[],
}

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
        <h1>KICEBIN</h1>
      </div>
      <MainLayout>
        <ViewerLayout>
          <div>
            <h2>{problem.problemNumber}</h2>
          </div>
          <div>
            <p>
              {problem.question}
            </p>
          </div>
          <ol>
            <li>{problem.examples.first}</li>
            <li>{problem.examples.second}</li>
            <li>{problem.examples.third}</li>
          </ol>
          <div>
            <ol>
              <li>{problem.choices[0]}</li>
              <li>{problem.choices[1]}</li>
              <li>{problem.choices[2]}</li>
              <li>{problem.choices[3]}</li>
              <li>{problem.choices[4]}</li>
            </ol>
          </div>
        </ViewerLayout>
        <EditorLayout>
          <form>
            <div>
              <label>문항번호</label>
              <input
                type="text"
                value={problem.problemNumber}
                onChange={(e) => setProblem({
                  ...problem,
                  problemNumber: e.target.value,
                })}
              />
            </div>
            <div>
              <label>제시문</label>
              <textarea
                value={problem.question}
                onChange={(e) => setProblem({
                  ...problem,
                  question: e.target.value,
                })}
              />
            </div>
            <div>
              <label>보기 ㄱ</label>
              <input
                value={problem.examples.first}
                onChange={(e) => setProblem({
                  ...problem,
                  examples: {
                    ...problem.examples,
                    first: e.target.value,
                  },
                })}
              />
            </div>
            <div>
              <label>보기 ㄴ</label>
              <input
                value={problem.examples.second}
                onChange={(e) => setProblem({
                  ...problem,
                  examples: {
                    ...problem.examples,
                    second: e.target.value,
                  },
                })}
              />
            </div>
            <div>
              <label>보기 ㄷ</label>
              <input
                value={problem.examples.third}
                onChange={(e) => setProblem({
                  ...problem,
                  examples: {
                    ...problem.examples,
                    third: e.target.value,
                  },
                })}
              />
            </div>
            <div>
              <div>
                <label>선택지 1</label>
                <input
                  value={problem.choices[0]}
                  onChange={(e) => setProblem({
                    ...problem,
                    choices: [
                      e.target.value,
                      problem.choices[1],
                      problem.choices[2],
                      problem.choices[3],
                      problem.choices[4],
                    ],
                  })}
                />
              </div>
              <div>
                <label>선택지 2</label>
                <input
                  value={problem.choices[1]}
                  onChange={(e) => setProblem({
                    ...problem,
                    choices: [
                      problem.choices[0],
                      e.target.value,
                      problem.choices[2],
                      problem.choices[3],
                      problem.choices[4],
                    ],
                  })}
                />
              </div>
              <div>
                <label>선택지 3</label>
                <input
                  value={problem.choices[2]}
                  onChange={(e) => setProblem({
                    ...problem,
                    choices: [
                      problem.choices[0],
                      problem.choices[1],
                      e.target.value,
                      problem.choices[3],
                      problem.choices[4],
                    ],
                  })}
                />
              </div>
              <div>
                <label>선택지 4</label>
                <input
                  value={problem.choices[3]}
                  onChange={(e) => setProblem({
                    ...problem,
                    choices: [
                      problem.choices[0],
                      problem.choices[1],
                      problem.choices[2],
                      e.target.value,
                      problem.choices[4],
                    ],
                  })}
                />
              </div>
              <div>
                <label>선택지 5</label>
                <input
                  value={problem.choices[4]}
                  onChange={(e) => setProblem({
                    ...problem,
                    choices: [
                      problem.choices[0],
                      problem.choices[1],
                      problem.choices[2],
                      problem.choices[3],
                      e.target.value,
                    ],
                  })}
                />
              </div>
            </div>
          </form>
        </EditorLayout>
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
const ViewerLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`

const EditorLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`