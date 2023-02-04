import React from 'react';
import styled from 'styled-components';
import { FiPlusSquare } from 'react-icons/fi';

const ProblemListContainer = ({
  problems,
  currentProblemId,
  createNewProblem,
  onClick,
}: {
  problems: ProblemScheme[],
  currentProblemId: string,
  createNewProblem: () => void,
  onClick: (problemId: string) => void,
}) => {
  return (
    <ProblemListContainerLayout>
      {
        problems.map((problem) => (
          <ProblemListCell
            key={problem.id}
            problem={problem}
            onClick={onClick}
            isActivated={problem.id === currentProblemId}
          />
        ))
      }
      <CreateNewProblemButton
        onClick={() => {
          createNewProblem();
        }}
      />
    </ProblemListContainerLayout>
  );
};

export default ProblemListContainer;

const ProblemListContainerLayout = styled.div`
  border-right: 0.5px solid #484848;
  /* padding: 8px; */
  display: flex;
  flex-direction: column;
  /* gap: 8px; */
  /* flex-wrap: 1; */
  /* flex-grow: 1; */
  width: 20%;

  /* min-width: 200px; */
  overflow-y: scroll;
  overflow-x: auto;
`;

const ProblemListCell = ({
  problem,
  onClick,
  isActivated,
}: {
  problem: ProblemScheme,
  onClick: (problemId: string) => void,
  isActivated?: boolean,
}) => {
  return (
    <ProblemListCellLayout
      key={problem.id}
      onClick={() => {
        onClick(problem.id);
      }}
      isActivated={isActivated}
    >
      <ProblemListCellTitle>
        {problem.meta.title}
      </ProblemListCellTitle>
      <ProblemListCellID>{problem.id}</ProblemListCellID>
      <ProblemListCellDescription>{
        // problem.question length limit to 20
        problem.meta.description.length > 20 ? problem.meta.description.slice(0, 20) + '...' : problem.meta.description
      }</ProblemListCellDescription>
    </ProblemListCellLayout>
  );
};

const ProblemListCellTitle = styled.div`
  font-size: 16px;
  color: #aaa;
`;

const ProblemListCellID = styled.div`
  font-size: 12px;
  color: #aaa5;
`;

const ProblemListCellDescription = styled.div`
  font-size: 14px;
`;

const ProblemListCellLayout = styled.div<{
  isActivated?: boolean,
}>`
  ${props => props.isActivated ? `
    border-bottom: 1px solid #37373A;
    background-color: #232327;
  ` : `
    border-bottom: 1px solid #37373A;
    background-color: #1A1A1C;
  `}
  /* width: 200px; */
  color: #7E7E8C;
  height: fit-content;
  min-height: 50px;
  padding: 12px;
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
      <FiPlusSquare size={16} />
      문항 추가
    </CreateNewProblemButtonLayout>
  );
};

const CreateNewProblemButtonLayout = styled.div`
  /* border: 1px solid #d9d9d9; */
  background-color: #232327;
  height: 20px;
  padding: 8px;
  text-align: center;
  margin: 8px;
  border-radius: 4px;
  color: #aaa;

  font-size: 14px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  :hover {
    background-color: #86868613;
  }
`;
