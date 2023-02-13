import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import styled, { StyleSheetManager } from 'styled-components';
import Editor from '../../Editor';
import Viewer from '../../components/Viewer';
import { v4 as uuid } from 'uuid';
import ProblemListContainer from '../../components/ProblemListContainer';
import TopBar from '../../components/TopBar';
import GlobalStyle from '../../GlobalStyle';
import Frame, { FrameContext } from 'react-frame-component';
import PrintViewer from '../../components/PrintViewer';
import { useEditorStore } from '../../store/editorStore';
import { useAuthStore } from '../../store/AuthStore';
import { useNavigate, useParams } from 'react-router-dom';

import { storage } from '../../service/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { ActionButton } from '../../components/ActionButton';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FiPrinter } from 'react-icons/fi';
import { ProblemScheme } from '../../types/Problem';
import { getDocument as getDocumentFromFirestore, updateDocument } from '../../utils/documentCRUD';

const createNewProblem = (): ProblemScheme => {
  return {
    id: uuid(),
    meta: {
      title: '새 문제',
      description: '새 문제입니다.',
    },
    content: [],
  };
};

const InjectFrameStyles = (props: any) => {
  const { document } = useContext(FrameContext);
  return <StyleSheetManager target={document?.head}>{props.children}</StyleSheetManager>;
};

const EditorPage = () => {
  const { documentId } = useParams();
  const { document, setDocument, currentProblemId: _currProbId, setCurrentProblemId } = useEditorStore();

  const currentProblemId = useMemo(() => {
    return _currProbId || document.problems[0]?.id;
  }, [_currProbId, document.problems]);

  const [isDocumentLoaded, setIsDocumentLoaded] = useState(false);

  const deleteProblem = (problemId: string) => {
    setDocument.setProblems.remove(problemId);

    const problem = document.problems.find((p) => p.id === problemId);
    if (problem) {
      problem.content.forEach((block) => {
        if (block.type === 'IMAGE') {
          const imageRef = ref(storage, `images/${block.id}`);
          deleteObject(imageRef);
        }
      });
    }

    setCurrentProblemId(document.problems[0].id);
  };

  const printViewerRef = useRef<HTMLIFrameElement>(null);

  const print = () => {
    if (printViewerRef.current) {
      const win = printViewerRef.current.contentWindow;
      if (win) {
        win.focus();
        win.print();
      }
    }
  };

  const { user } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      console.log('user is logged in', user);
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
    console.log('get');
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

  return (
    <EntireLayout>
      <TopLayout>
        <TopBar
          actionButtons={[
            <ActionButton
              key={uuid()}
              onClick={() => {
                window.open('https://open.kakao.com/o/gP28At3e');
              }}>
              <RiKakaoTalkFill size={16}/> 사용자 모임
            </ActionButton>,
            <ActionButton
              key={uuid()}
              onClick={() => {
                print();
              }}>
              <FiPrinter size={16}/>
          프린트
            </ActionButton>
          ]}
        />
      </TopLayout>
      <MainLayout>
        <ProblemListContainer
          problems={document.problems}
          currentProblemId={currentProblemId}
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
          problems={document.problems}
          currentProblemId={currentProblemId}
        />
      </MainLayout>
      <Frame
        style={{
          // display: 'none',
          backgroundColor: 'white',
        }}
        ref={printViewerRef}
        head={
          <>
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css"
              integrity="sha384-vKruj+a13U8yHIkAyGgK1J3ArTLzrFGBbBc0tDp4ad/EyewESeXE/Iv67Aj8gKZ0"
              crossOrigin="anonymous"
            />
            <link
              rel="stylesheet"
              href="./assets/index.css"
            />
            <script
              src="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.js"
              integrity='sha384-PwRUT/YqbnEjkZO0zZxNqcxACrXe+j766U2amXcgMg5457rve2Y7I6ZJSm2A0mS4'
              crossOrigin='anonymous'
            />
            <style>
              {/* css */`
              html, body {
                padding: 0;
                margin: 0;
                height: 100%;
                page-break-inside: avoid;
                break-inside: avoid-page;
              }
              `}
            </style>
          </>
        }
      >
        <InjectFrameStyles>
          <>
            <GlobalStyle />
            <PrintViewer
              document={document}
            />
          </>
        </InjectFrameStyles>
      </Frame>
    </EntireLayout>
  );
};

export default EditorPage;

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