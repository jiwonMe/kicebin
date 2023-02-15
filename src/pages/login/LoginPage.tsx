import React, { useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { analytics, auth } from '../../service/firebase';
import { useAuthStore } from '../../store/AuthStore';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { BsGoogle } from 'react-icons/bs';

import { db, storage } from '../../service/firebase';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, Timestamp } from 'firebase/firestore';
import { dummyProblem } from '../../store/dummy';
import { useEditorStore } from '../../store/editorStore';
import { DocumentScheme } from '../../types/Document';
import { createDocument } from '../../utils/documentCRUD';
import { logEvent } from 'firebase/analytics';


const provider = new GoogleAuthProvider();

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('user is logged in', user);
  } else {
    console.log('user is not logged in');
  }
});

const LoginPage = () => {
  const { user, setUser } = useAuthStore();
  const { setDocument } = useEditorStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // redirect to main page
      navigate('/');
    }
  }, [user]);

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

          setUser(user);

          // if first login, create user data

          if (user) {
            if (!user.email) {
              return;
            }
            const userDoc = doc(db, 'users', user.email);
            const userDocSnapshot = await getDoc(userDoc);

            if (!userDocSnapshot.exists()) {
              await setDoc(userDoc, {
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                registeredAt: new Date(),
              });

              const newDocument: DocumentScheme = {
                id: 'it will be replaced',
                meta: {
                  title: 'KICEditor Sample Document',
                  description: 'This is a sample document for KICEditor.',
                  createdAt: new Timestamp(new Date().getTime() / 1000, 0),
                  updatedAt: new Timestamp(new Date().getTime() / 1000, 0),
                  pagination: true,
                },
                problems: [
                  dummyProblem,
                ],
              };

              // log event

              logEvent(analytics, 'register', {
                method: 'google',
                user: user.email,
              });


              // create user's document collection
              createDocument(user, newDocument);

              setDocument.setAll(newDocument);
            }
          }

          // redirect to main page
          navigate('/');
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
