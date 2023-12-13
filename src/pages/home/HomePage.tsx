import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DocumentListContainer from '../../components/specific/DocumentListContainer';
import { useAuthStore } from '../../store/AuthStore';
import TopBar from '../../components/layout/TopBar';

import { Timestamp } from 'firebase/firestore';
import { ActionButton } from '../../components/common/ActionButton';
import { FiPlus } from 'react-icons/fi';
import { DocumentScheme } from '../../types/Document';
import { createDocument, getDocuments } from '../../utils/documentCRUD';
import {
  updateDocument as updateDocumentToFirestore,
  deleteDocument as deleteDocumentFromFirestore,
} from '../../utils/documentCRUD';
import { User } from 'firebase/auth';

import { RxDragHandleDots2 } from 'react-icons/rx';


const HomePage = () => {

  const { user: _user } = useAuthStore();

  const user = useMemo(() => {
    return ({
      ..._user,
      email: _user?.email || '',
    });
  }, [_user]) as User;

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
        <NoticeContent>
          <NoticeTitle>
            [Update] 2023-12-11
          </NoticeTitle>
          <NoticeDescription>
            KICEditor의 새 운영사를 찾습니다 (<Link href="https://parkjiwon.notion.site/KICEditor-4b4f37a92ab546cdadddebaa535b9b21?pvs=4">더보기</Link>)
          </NoticeDescription>
        </NoticeContent>
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

  /* height: 50px; */
  background-color: #0b477c;

  padding: 8px 0;
`;

const NoticeContent = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: flex-start;

  box-sizing: border-box;

  width: calc(min(calc(100% - 64px), 800px));
`;

const NoticeTitle = styled.div`
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 4px;
`;

const NoticeDescription = styled.div`
  font-size: 12px;

  color: #ffffff;
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

  box-sizing: border-box;
  padding-top: 20px;
  width: calc(min(calc(100% - 64px), 800px));

`;

const Heading1 = styled.h1`
  font-family: 'Pretendard';
  font-size: 24px;
  font-weight: 700;
  color: #BABAC2;
`;

const Link = styled.a`
  color: #BABAC2;
`;