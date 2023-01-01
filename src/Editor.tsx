import styled from 'styled-components'

const Editor = ({
  problem,
  setProblem,
}: {
  problem: ProblemSchema;
  setProblem: (problem: ProblemSchema) => void;
}) => {

  return (
    <div className='editor'>
      <EditorLayout>
        <form>
          <div>
            <label>문항번호</label>
            <TextInput
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
            <TextArea
              value={problem.question}
              onChange={(e) => setProblem({
                ...problem,
                question: e.target.value,
              })}
            />
          </div>
          <div>
            <label>보기 ㄱ</label>
            <TextInput
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
            <TextInput
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
            <TextInput
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
          <ChoiceLayout>
            <div>
              <label>선택지 1</label>
              <TextInput
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
              <TextInput
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
              <TextInput
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
              <TextInput
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
              <TextInput
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
          </ChoiceLayout>
        </form>
      </EditorLayout>
    </div>
  ) 
}

export default Editor;

const EditorLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;

  padding: 1em;
`

const TextInput = styled.input`
  width: 100%;
  height: 48px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 0 16px;
  font-size: 16px;

  box-sizing: border-box;

  &:focus {
    outline: none;
    border: 1px solid #000;
  }
`

const TextArea = styled.textarea`
  width: 100%;
  height: fit-content;
  min-height: 48px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 0 16px;
  font-size: 16px;

  /* dont resizing */
  resize: none;

  &:focus {
    outline: none;
    border: 1px solid #000;
  }
`

const ChoiceLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 1em;
`