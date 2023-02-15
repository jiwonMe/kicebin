import React from 'react';
import styled from 'styled-components';
import { useAuthStore } from '../store/AuthStore';
import { signOut } from 'firebase/auth';
import { auth } from '../service/firebase';
import { useEditorStore } from '../store/editorStore';
import { ActionButton } from './ActionButton';
import { useNavigate } from 'react-router-dom';

const TopBar = ({ actionButtons }: {
  actionButtons?: React.ReactNode[];
}) => {

  const { user, removeUser } = useAuthStore();
  const { setDocument } = useEditorStore();
  const navigate = useNavigate();
  return (
    <TopBarLayout>
      <Title>
        <b>KICE</b>ditor
      </Title>

      <ActionButtonsContainerLayout>
        <>
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
                  navigate('/login');
                }}>
                  Logout
                </ActionButton>
              </>
            )
          }
          {actionButtons}
        </>
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
  height: 64px;
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
