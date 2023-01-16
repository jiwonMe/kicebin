import styled from 'styled-components'
import { Input } from 'antd'
import CodeEditor from 'react-simple-code-editor';
const { TextArea } = Input;
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-markdown';
import 'prismjs/themes/prism.css'; //Example style, you can use another

const Editor = ({
  problem,
  setProblem,
}: {
  problem: ProblemSchema;
  setProblem: (problem: ProblemSchema) => void;
}) => {

  return (
    <div>
      <EditorLayout>
        <form>
          <FormBox>
            <label>문항번호</label>
            <Input
              type="text"
              value={problem.problemNumber}
              onChange={(e) => setProblem({
                ...problem,
                problemNumber: e.target.value,
              })}
            />
          </FormBox>
          <FormBox>
            <label>상단 제시문</label>
            <StyledCodeEditor
              highlight={(code) => highlight(
                code,
                languages.markdown,
                'markdown'
              )}
              value={problem.question}
              onValueChange={(value) => setProblem({
                ...problem,
                question: value,
              })}
              // font
              padding={10}
            />
          </FormBox>
          <FormBox>
            <label>조건 (가)</label>
            <StyledCodeEditor
              highlight={(code) => highlight(
                code,
                languages.markdown,
                'markdown'
              )}
              value={problem.conditions[0]}
              onValueChange={(value) => setProblem({
                ...problem,
                conditions: [
                  value,
                  problem.conditions[1],
                ],
              })}
              padding={10}
            />
          </FormBox>
          <FormBox>
            <label>조건 (나)</label>
            <StyledCodeEditor
              highlight={(code) => highlight(
                code,
                languages.markdown,
                'markdown'
              )}
              value={problem.conditions[1]}
              onValueChange={(value) => setProblem({
                ...problem,
                conditions: [
                  problem.conditions[0],
                  value,
                ],
              })}
              padding={10}
            />
          </FormBox>
          <FormBox>
            <label>하단 제시문</label>
            <StyledCodeEditor
              highlight={(code) => highlight(
                code,
                languages.markdown,
                'markdown'
              )}
              value={problem.question2}
              onValueChange={(value) => setProblem({
                ...problem,
                question2: value,
              })}
              // font
              padding={10}
            />
          </FormBox>
          <FormBox>
            <label>보기 ㄱ</label>
            <StyledCodeEditor
              highlight={(code) => highlight(
                code,
                languages.markdown,
                'markdown'
              )}
              value={problem.examples.first}
              onValueChange={(value) => setProblem({
                ...problem,
                examples: {
                  ...problem.examples,
                  first: value,
                },
              })}
              padding={10}
            />
          </FormBox>
          <FormBox>
            <label>보기 ㄴ</label>
            <StyledCodeEditor
              highlight={(code) => highlight(
                code,
                languages.markdown,
                'markdown'
              )}
              value={problem.examples.second}
              onValueChange={(value) => setProblem({
                ...problem,
                examples: {
                  ...problem.examples,
                  second: value,
                },
              })}
              padding={10}
            />
          </FormBox>
          <FormBox>
            <label>보기 ㄷ</label>
            <StyledCodeEditor
              highlight={(code) => highlight(
                code,
                languages.markdown,
                'markdown'
              )}
              value={problem.examples.third}
              onValueChange={(value) => setProblem({
                ...problem,
                examples: {
                  ...problem.examples,
                  third: value,
                },
              })}
              padding={10}
            />
          </FormBox>
          <ChoiceLayout>
            <FormBox>
              <label>선택지 1</label>
              <Input
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
            </FormBox>
            <FormBox>
              <label>선택지 2</label>
              <Input
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
            </FormBox>
            <FormBox>
              <label>선택지 3</label>
              <Input
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
            </FormBox>
            <FormBox>
              <label>선택지 4</label>
              <Input
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
            </FormBox>
            <FormBox>
              <label>선택지 5</label>
              <Input
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
            </FormBox>
          </ChoiceLayout>
        </form>
      </EditorLayout>
    </div>
  ) 
}

export default Editor;

const EditorLayout = styled.div`
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;

  box-sizing: border-box;

  padding: 1em;
`

const FormBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  margin-bottom: 1em;

  label {
    font-size: 14px;
    margin-bottom: 0.25em;
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

const StyledCodeEditor = styled(CodeEditor)`
  font-family: 'Hack', 'Fira code', 'Fira Mono', monospace;
  width: 100%;
  min-height: 100px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0.5em;
`;