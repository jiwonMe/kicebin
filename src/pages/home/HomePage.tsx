import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DocumentListContainer from '../../components/DocumentListContainer';
import { useAuthStore } from '../../store/AuthStore';
import TopBar from '../../components/TopBar';
import { v4 as uuid } from 'uuid';

import { Timestamp } from 'firebase/firestore';
import { ActionButton } from '../../components/ActionButton';
import { FiPlus } from 'react-icons/fi';
import { DocumentScheme } from '../../types/Document';
import { createDocument, getDocuments } from '../../utils/documentCRUD';


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
    const documents = await getDocuments();
    if (!documents) return;
    setDocumentList(documents);
  };

  const createNewDocument = async () => {
    const newDocument: DocumentScheme = {
      id: uuid(),
      meta: {
        title: '새 문제집',
        description: '새 문제집입니다.',
        createdAt: new Timestamp(new Date().getTime() / 1000, 0),
        pagination: true,
        updatedAt: new Timestamp(new Date().getTime() / 1000, 0),
      },
      problems: [],
    };

    await createDocument(newDocument);

    setDocumentList([...documentList, newDocument]);
  };

  return (
    <EntireLayout>
      <TopLayout>
        <TopBar />
      </TopLayout>
      <MainLayout>
        <ContentLayout>
          <HeaderLayout>
            <Heading1>내 문제집</Heading1>
            <ActionButton
              onClick={createNewDocument}
            >
              <FiPlus size={24} />
            </ActionButton>
          </HeaderLayout>
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
  height: 64px;
  background-color: #232327;
`;

const MainLayout = styled.div`
  display: flex;
  justify-content: center;

  height: calc(100vh - 64px);

  box-sizing: border-box;

  background-color: #1A1A1C;
`;

const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 50px;
  /* padding: 0 20px; */

  box-sizing: border-box;

  width: 100%;

  margin-bottom: 20px;
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
