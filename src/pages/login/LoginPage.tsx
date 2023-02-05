import React, { useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../service/firebase';
import { useAuthStore } from '../../store/AuthStore';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { BsGoogle } from 'react-icons/bs';

const provider = new GoogleAuthProvider();

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('user is logged in', user);
  } else {
    console.log('user is not logged in');
  }
});

const LoginPage = () => {
  const { user, setUser, removeUser } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // redirect to main page
      navigate('/');
    }
  });

  return (
    <LoginPageLayout>
      <Title>
        <b>KICE</b>ditor
      </Title>
      <VSpace />
      <GoogleLoginButton
        onClick={async () => {
          const result = await signInWithPopup(auth, provider);
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          const user = result.user;

          console.log({ token, user });

          setUser(user);
        }}
      >
        <BsGoogle size={16} />
        Google로 로그인
      </GoogleLoginButton>
      <VSpace />
      <SubTitle>
        created by hanpanic
      </SubTitle>
    </LoginPageLayout>
  );
};

export default LoginPage;

const LoginPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  background-color: #232327;
`;

const Title = styled.div`
  font-family: 'Pretendard';
  font-size: 36px;
  /* font-weight: bold; */
  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
`;

const SubTitle = styled.div`
  font-family: 'Pretendard';
  font-size: 14px;

  color: #BABAC2;
`;

const VSpace = styled.div`
  height: 1em;
`;

const GoogleLoginButton = styled.button`
  background-color: #37373E;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  width: 200px;
  height: 40px;

  border-radius: 4px;

  color: #BABAC2;

  :hover {
    background-color: #86868613;
  }
`;
