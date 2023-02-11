import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DocumentListContainer from '../../components/DocumentListContainer';
import { useAuthStore } from '../../store/AuthStore';
import TopBar from '../../components/TopBar';

import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from '../../service/firebase';


const HomePage = () => {

  const { user } = useAuthStore();

  const [documentList, setDocumentList] = React.useState<DocumentScheme[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    getDocumentList();
  }, []);

  const getDocumentList = async () => {
    if (!user?.email) return;

    const querySnapshot = await getDocs(collection(db,'users', user?.email, 'docs'));
    setDocumentList(querySnapshot.docs.map((doc) => doc.data()) as DocumentScheme[]);
    console.log(documentList);
  };

  return (
    <EntireLayout>
      <TopLayout>
        <TopBar />
      </TopLayout>
      <MainLayout>
        <ContentLayout>
          <Heading1>내 문제집</Heading1>
          <DocumentListContainer
            documentList={documentList}
          />
        </ContentLayout>
      </MainLayout>
    </EntireLayout>
  );
};

export default HomePage;

const EntireLayout = styled.div`
  height: 100vh;
  overflow: hidden;

  box-sizing: border-box;
`;

const TopLayout = styled.div`
  display: flex;
  height: 50px;
  background-color: #232327;
`;

const MainLayout = styled.div`
  display: flex;
  justify-content: center;

  height: calc(100vh - 50px);

  box-sizing: border-box;

  background-color: #1A1A1C;
`;

const ContentLayout = styled.div`
  display: flex;
  flex-direction: column;

  padding-top: 20px;
  width: 50%;
`;

const Heading1 = styled.h1`
  font-family: 'Pretendard';
  font-size: 24px;
  font-weight: 700;
  color: #BABAC2;
`;
