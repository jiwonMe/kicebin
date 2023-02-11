import React from 'react';
import styled from 'styled-components';
import { FiPrinter } from 'react-icons/fi';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { useAuthStore } from './store/AuthStore';
import { signOut } from 'firebase/auth';
import { auth } from './service/firebase';
import { useEditorStore } from './store/editorStore';

const TopBar = ({ actions }: {
  actions: {
    printDocument: () => void,
  }
}) => {

  const { user, removeUser } = useAuthStore();
  const { setDocument } = useEditorStore();
  return (
    <TopBarLayout>
      <Title>
        <b>KICE</b>ditor
      </Title>

      <ActionButtonsContainerLayout>
        {
          user && (
            <>
              <UserName>
                {user?.email}
              </UserName>
              <ActionButton onClick={() => {
                signOut(auth);
                removeUser();
                setDocument.setAll(null);
              }}>
                Logout
              </ActionButton>
            </>
          )
        }
        <ActionButton onClick={() => {
          window.open('https://open.kakao.com/o/gP28At3e');
        }}>
          <RiKakaoTalkFill size={16}/> 사용자 모임
        </ActionButton>
        <ActionButton onClick={actions.printDocument}>
          <FiPrinter size={16}/>
          프린트
        </ActionButton>
      </ActionButtonsContainerLayout>
    </TopBarLayout>
  );
};

export default TopBar;

const Title = styled.div`
  font-family: 'Pretendard';
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const UserName = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const TopBarLayout = styled.div`
  font-family: 'Pretendard';

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3em;
  padding: 0 1em;
  box-sizing: border-box;

  color: #BABAC2;
  border-bottom: 1px solid #393939;
`;

const ActionButtonsContainerLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 8px;
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
  gap: 8px;

  cursor: pointer;
  :hover {
    background-color: #86868613;
  }
`;
