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
import {
  updateDocument as updateDocumentToFirestore,
  deleteDocument as deleteDocumentFromFirestore,
} from '../../utils/documentCRUD';


const HomePage = () => {

  const { user } = useAuthStore();

  const [documentList, setDocumentList] = React.useState<DocumentScheme[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  useEffect(() => {
    getDocumentList();
  }, []);

  const getDocumentList = async () => {
    const documents = await getDocuments(user);
    if (!documents) return;
    setDocumentList(documents);
  };

  const createNewDocument = async () => {
    const newDocument: DocumentScheme = {
      id: 'it will be replaced',
      meta: {
        title: '새 문제집',
        description: '새 문제집입니다.',
        createdAt: new Timestamp(new Date().getTime() / 1000, 0),
        pagination: true,
        updatedAt: new Timestamp(new Date().getTime() / 1000, 0),
      },
      problems: [],
    };

    const createdDocument = await createDocument(user, newDocument);

    if (!createdDocument) return;

    setDocumentList([...documentList, createdDocument]);
  };

  const updateDocument = async (document: DocumentScheme) => {
    updateDocumentToFirestore(user, document);

    const newDocumentList = documentList.map((doc) => {
      if (doc.id === document.id) {
        return document;
      }
      return doc;
    });

    setDocumentList(newDocumentList);
  };

  const deleteDocument = async (documentId: DocumentScheme['id']) => {
    const confirmString = prompt('정말로 삭제하시겠습니까? (삭제하려면 "삭제"를 입력하세요.)');

    if (confirmString !== '삭제') {
      alert('삭제가 취소되었습니다.');
      return;
    }

    deleteDocumentFromFirestore(user, documentId);

    const newDocumentList = documentList.filter((doc) => doc.id !== documentId);
    setDocumentList(newDocumentList);
  };

  return (
    <EntireLayout>
      <TopLayout>
        <TopBar />
      </TopLayout>
      <NoticeLayout>
        [Notice] 새로운 문제집 만들기 기능이 추가되었습니다.
      </NoticeLayout>
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
            updateDocument={updateDocument}
            deleteDocument={deleteDocument}
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

const NoticeLayout = styled.div`
  display: flex;

  font-family: Pretendard;
  font-size: 14px;

  align-items: center;
  justify-content: center;

  height: 50px;
  background-color: #88cc28;
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
