import React from 'react';
import styled from 'styled-components';

const ModeTab = ({
  onChange,
  value,
}: {
  onChange: (value: string) => void;
  value: string;
}) => {
  return (
    <ModeTabLayout>
      <button
        className={value === 'PROBLEM' ? 'active' : ''}
        onClick={() => onChange('PROBLEM')}
      >
        문제
      </button>
      <button
        className={value === 'EXPLANATION' ? 'active' : ''}
        onClick={() => onChange('EXPLANATION')}
      >
        해설
      </button>
    </ModeTabLayout>
  );
};

export default ModeTab;

const ModeTabLayout = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  background-color: #1A1A1C;
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  button {
    width: 100%;
    height: 40px;
    padding: 0;
    border: none;
    border-radius: 8px;
    outline: none;
    background-color: transparent;
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #353535;
    }

    &.active {
      background-color: #353535;
    }
  }
`;
