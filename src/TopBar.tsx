import React from 'react';
import styled from 'styled-components';
import KicebinLogo from './assets/kicebin-logo.svg';

const TopBar = ({ actions }: {
  actions: {
    printDocument: () => void,
  }
}) => {
  return (
    <TopBarLayout>
      <Title>
        {/* <img
          src={KicebinLogo}
          alt="kicebin-logo"
          style={{
            height: '0.8em',
            marginRight: '0.5em',
          }}
        /> */}
      </Title>
      <ActionButtonsContainerLayout>
        <ActionButton onClick={actions.printDocument}>
          프린트
        </ActionButton>
      </ActionButtonsContainerLayout>
    </TopBarLayout>
  );
};

export default TopBar;

const Title = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const TopBarLayout = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 3em;
  padding: 0 1em;
  box-sizing: border-box;

  border-bottom: 1px solid #393939;
`;

const ActionButtonsContainerLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ActionButton = ({ children, onClick }: {
  children: React.ReactNode,
  onClick: () => void,
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

  cursor: pointer;
  :hover {
    background-color: #86868613;
  }
`;
