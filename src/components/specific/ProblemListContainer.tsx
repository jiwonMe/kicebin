import React from 'react';
import styled from 'styled-components';
import { FiPlusSquare, FiX } from 'react-icons/fi';
import { ProblemScheme } from '../../types/Problem';
import { Reorder } from 'framer-motion';

const ProblemListContainer = ({
  problems,
  setProblems,
  currentProblemId,
  createNewProblem,
  deleteProblem,
  onClick,
}: {
  problems: ProblemScheme[],
  setProblems: (problems: ProblemScheme[]) => void,
  currentProblemId: string | null,
  createNewProblem: () => void,
  deleteProblem: (problemId: string) => void,
  onClick: (problemId: string) => void,
}) => {
  return (
    <ProblemListContainerLayout
      axis="y"
      values={problems}
      onReorder={setProblems}
    >
      {
        problems.map((problem) => (
          <ProblemListCell
            key={problem.id}
            problem={problem}
            onClick={onClick}
            isActivated={problem.id === currentProblemId}
            deleteProblem={() => {
              deleteProblem(problem.id);
            }}
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

const ProblemListContainerLayout = styled(Reorder.Group)`
  font-family: 'Pretendard';

  /* remove ul dot */
  list-style: none;
  /* remove ul margin */
  margin: 0;
  /* remove ul padding */
  padding: 0;

  border-right: 0.5px solid #484848;
  display: flex;
  flex-direction: column;
  width: 20%;

  overflow-y: scroll;
  overflow-x: auto;

  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const ProblemListCell = ({
  problem,
  onClick,
  isActivated,
  deleteProblem,
}: {
  problem: ProblemScheme,
  onClick: (problemId: string) => void,
  isActivated?: boolean,
  deleteProblem: () => void,
}) => {
  return (
    <ProblemListCellLayout
      key={problem.id}
      value={problem}
      onClick={() => {
        onClick(problem.id);
      }}
      isActivated={isActivated}
    >
      <ProblemListCellHeader>
        <ProblemListCellTitle>
          {problem.meta.title}
        </ProblemListCellTitle>
        <ProblemListCellDeleteButton
          onClick={(e) => {
            e.stopPropagation();
            deleteProblem();
          }}
        >
          <FiX size={16} />
        </ProblemListCellDeleteButton>
      </ProblemListCellHeader>
      <ProblemListCellID>{problem.id}</ProblemListCellID>
      <ProblemListCellDescription>{
        // problem.question length limit to 20
        problem.meta.description.length > 20 ? problem.meta.description.slice(0, 20) + '...' : problem.meta.description
      }</ProblemListCellDescription>
    </ProblemListCellLayout>
  );
};

const ProblemListCellHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProblemListCellDeleteButton = styled.div`
  color: #aaa0;
  cursor: pointer;
  transition: 0.2s;
  :hover {
    color: #aaa;
  }
`;

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

const ProblemListCellLayout = styled(Reorder.Item)<{
  isActivated?: boolean,
}>`
  ${props => props.isActivated ? `
    border-bottom: 1px solid #37373A;
    background-color: #232327;
  ` : `
    border-bottom: 1px solid #37373A;
    background-color: #1A1A1C;
  `}

  color: #7E7E8C;
  height: fit-content;

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
