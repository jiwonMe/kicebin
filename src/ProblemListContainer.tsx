import React from 'react'
import styled from 'styled-components'

const ProblemListContainer = ({
  problems,
  currentProblemIndex,
  createNewProblem,
  onClick,
}: {
  problems: ProblemSchema[],
  currentProblemIndex: number,
  createNewProblem: () => void,
  onClick: (index: number) => void,
}) => { 
  return (
    <ProblemListContainerLayout>
      {
        problems.map((problem, index) => (
          <ProblemListCell
            problem={problem}
            index={index}
            onClick={onClick}
            isActivated={index === currentProblemIndex}
          />
        ))
      }
      <CreateNewProblemButton
        onClick={() => {
          createNewProblem();
        }}
      />
    </ProblemListContainerLayout>
  )
}

export default ProblemListContainer

const ProblemListContainerLayout = styled.div`
  border: 1px solid #a1a1a1;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-wrap: 1;
`;

const ProblemListCell = ({
  problem,
  index,
  onClick,
  isActivated,
}: {
  problem: ProblemSchema,
  index: number,
  onClick: (index: number) => void,
  isActivated?: boolean,
}) => {
  return (
    <ProblemListCellLayout
      key={index}
      onClick={() => {
        onClick(index);
      }}
      isActivated={isActivated}
    >
      <div>{problem.problemNumber}</div>
      <div>{
        // problem.question length limit to 20
        problem.question.length > 20 ? problem.question.slice(0, 20) + '...' : problem.question
      }</div>
    </ProblemListCellLayout>
  )
}

const ProblemListCellLayout = styled.div<{
  isActivated?: boolean,
}>`
  ${props => props.isActivated ? `
    border: 1px solid #00aeff;
    background-color: #c8eeff;
  ` : `
    border: 1px solid #d9d9d9;
    background-color: white;
  `}
  width: 200px;
  height: fit-content;
  min-height: 50px;
  padding: 8px;
`;

const CreateNewProblemButton = ({
  onClick,
}: {
  onClick: () => void,
}) => {
  return (
    <CreateNewProblemButtonLayout
      onClick={onClick}
    >
      +
    </CreateNewProblemButtonLayout>
  )
}

const CreateNewProblemButtonLayout = styled.div`
  border: 1px solid #d9d9d9;
  background-color: white;
  width: 200px;
  height: 20px;
  padding: 8px;
  text-align: center;
`;