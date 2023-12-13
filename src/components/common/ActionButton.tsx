import React from 'react';
import styled from 'styled-components';

export const ActionButton = ({ children, onClick }: {
  children: React.ReactNode,
  onClick?: () => void,
}) => {
  return (
    <ActionButtonLayout onClick={onClick}>
      {children}
    </ActionButtonLayout>
  );
};

const ActionButtonLayout = styled.button`
  background-color: #37373E;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  color: #BABAC2;
  gap: 8px;

  height: 40px;

  box-sizing: border-box;

  cursor: pointer;
  :hover {
    background-color: #86868613;
  }
`;
