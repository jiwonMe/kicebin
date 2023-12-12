import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import styled, { StyleSheetManager } from 'styled-components';
import Editor from '../../Editor';
import Viewer from '../../components/Viewer';
import { v4 as uuid } from 'uuid';
import ProblemListContainer from '../../components/ProblemListContainer';
import TopBar from '../../components/TopBar';
import GlobalStyle from '../../GlobalStyle';
import Frame, { FrameContext } from 'react-frame-component';
import { useEditorStore } from '../../store/editorStore';
import { useAuthStore } from '../../store/AuthStore';
import { useNavigate, useParams } from 'react-router-dom';

import { analytics, storage } from '../../service/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { ActionButton } from '../../components/ActionButton';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FiPrinter, FiUploadCloud } from 'react-icons/fi';
import { ProblemScheme } from '../../types/Problem';
import { getDocument as getDocumentFromFirestore, updateDocument } from '../../utils/documentCRUD';
import { User } from 'firebase/auth';
import { logEvent } from 'firebase/analytics';
import PrintDefaultTheme from '../../components/PrintDefaultTheme';
import PrintViewer from '../../components/PrintViewer';

const createNewProblem = (): ProblemScheme => {
  return {
    id: uuid(),
    meta: {
      title: '새 문제',
      description: '새 문제입니다.',
    },
    answer: '',
    content: [],
    explanation: [],
  };
};

const InjectFrameStyles = (props: any) => {
  const { document } = useContext(FrameContext);
  return <StyleSheetManager target={document?.head}>{props.children}</StyleSheetManager>;
};

const EditorPage = () => {
  const { documentId } = useParams();
  const { document, setDocument, currentProblemId: _currProbId, setCurrentProblemId, mode, setMode } = useEditorStore();

  const [isPrintMode, setIsPrintMode] = useState(false);

  const currentProblemId = useMemo(() => {
    return _currProbId || document?.problems?.[0]?.id || null;
  }, [_currProbId, document.problems]);

  const [isDocumentLoaded, setIsDocumentLoaded] = useState(false);

  const deleteProblem = (problemId: string) => {
    setDocument.setProblems.remove(problemId);

    const problem = document.problems?.find((p) => p.id === problemId);
    if (problem) {
      problem.content.forEach((block) => {
        if (block.type === 'IMAGE') {
          const imageRef = ref(storage, `images/${block.id}`);
          deleteObject(imageRef);
        }
      });
    }

    setCurrentProblemId(document.problems?.[0].id || null);
  };

  const handlePrint = () => {
    setIsPrintMode(true);

    setTimeout(() => {
      window.print();
      setIsPrintMode(false);
    }, 1000);
  };

  const { user: _user } = useAuthStore();

  const user = useMemo(() => {
    return ({
      ..._user,
      email: _user?.email || '',
    });
  }, [_user]) as User;

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      // console.log('user is logged in', user);
    }
  }, [user]);

  const getDocument = async () => {
    if (!documentId) {
      return;
    }
    const document = await getDocumentFromFirestore(user, documentId);

    if (!document) {
      console.log('document is not found');
      return;
    }

    setDocument.setAll(document);
    setIsDocumentLoaded(true);
  };

  const setDocumentToFirestore = async () => {
    if (!isDocumentLoaded) {
      return;
    }
    updateDocument(user, document);
  };

  useEffect(() => {
    // load datas
    if (!isDocumentLoaded) {
      getDocument();
    }
  }, [user?.email]);

  useEffect(() => {
    // save datas
    setDocumentToFirestore();
  }, [document]);

  useEffect(() => {
    // save datas when command s is pressed
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 's' && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        setDocumentToFirestore();
        alert('저장되었습니다.');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [user]);

  return (
    <EntireLayout>
      {
        isPrintMode && (
          <LoadingLayout>
            <div>인쇄 로딩중...</div>
          </LoadingLayout>
        )
      }
      <TopLayout>
        <TopBar
          actionButtons={[
            <ActionButton
              key={uuid()}
              onClick={() => {
                logEvent(analytics, 'kakao_button_clicked', {
                  user: user.email,
                  documentId: documentId,
                });
                window.open('https://open.kakao.com/o/gP28At3e');
              }}>
              <RiKakaoTalkFill size={16}/> 사용자 모임
            </ActionButton>,
            <ActionButton
              key={uuid()}
              onClick={() => {
                // log Event
                logEvent(analytics, 'print_button_clicked', {
                  user: user.email,
                  documentId: documentId,
                });
                handlePrint();
              }}>
              <FiPrinter size={16}/>
          프린트
            </ActionButton>,
            <SaveButton
              key={uuid()}
              // save
              onClick={() => {
                // log Event
                logEvent(analytics, 'save_button_clicked', {
                  user: user.email,
                  documentId: documentId,
                });
                setDocumentToFirestore();
                alert('저장되었습니다.');
              }}>
              <FiUploadCloud size={16}/>
              저장
            </SaveButton>,
          ]}
        />
      </TopLayout>
      <MainLayout>
        <ProblemListContainer
          problems={document.problems || []}
          setProblems={setDocument.setProblems.all}
          currentProblemId={currentProblemId || null}
          createNewProblem={() => {
            setDocument.setProblems.add(createNewProblem());
          }}
          onClick={(problemId) => {
            setCurrentProblemId(problemId);
          }}
          deleteProblem={deleteProblem}
        />
        <Editor/>
        <Viewer
          problems={document.problems || []}
          currentProblemId={currentProblemId || null}
          mode={mode}
        />
      </MainLayout>
      {
        <PrintPreviewLayout>
          {isPrintMode && <PrintDefaultTheme
            document={document}
          />}
          {
            isPrintMode && <PrintViewer
              document={document}
            />
          }
          {/* <PrintDefaultTheme
            document={document}
          /> */}
        </PrintPreviewLayout>
      }
    </EntireLayout>
  );
};

export default EditorPage;

const PrintPreviewLayout = styled.div`
@media print {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 1000;
}
`;

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

  height: calc(100vh - 64px);

  box-sizing: border-box;

  background-color: #1A1A1C;
`;

const SaveButton = styled(ActionButton)`
  /* blue */
  background-color: #003ee8 !important;
  color: #FFFFFF !important;
`;

const LoadingLayout = styled.div`
  @media screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #FFFFFF;
    background-color: #00000055;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
