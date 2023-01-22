import React from 'react'
import styled from 'styled-components'
import KicebinLogo from './assets/kicebin-logo.svg'

const TopBar = ({ actions }: {
  actions: {
    printDocument: () => void,
  }
}) => {
  return (
    <TopBarLayout>
      <Title>
        <img
          src={KicebinLogo}
          alt="kicebin-logo"
          style={{
            height: '0.8em',
            marginRight: '0.5em',
          }}
        />
      </Title>
      <ActionButtonsContainerLayout>
        <ActionButton onClick={actions.printDocument}>
          프린트
        </ActionButton>
      </ActionButtonsContainerLayout>
    </TopBarLayout>
  )
}

export default TopBar

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
  )
}

const ActionButtonLayout = styled.button`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  color: #0099ff;
  border: 1px solid #0099ff;
  cursor: pointer;
  :hover {
    background-color: #0099ff14;
  }
`;