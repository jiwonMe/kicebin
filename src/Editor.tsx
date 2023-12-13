import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useEditorStore } from './store/editorStore';
import EditorBlock from './components/specific/EditorBlock';
import { v4 as uuid } from 'uuid';

import { FiPlus } from 'react-icons/fi';
import { InputWithLabel } from './components/common/Input';
import { ProblemScheme } from './types/Problem';
import { Reorder } from 'framer-motion';
import ModeTab from './components/specific/ModeTab';

const Editor = () => {
  const { document, setDocument, currentProblemId: _currProbId, mode, setMode } = useEditorStore();

  const currentProblemId = _currProbId || document.problems?.[0]?.id || null;

  const currentProblem = document.problems?.find((p) => p.id === currentProblemId);

  const content = useMemo(() => {
    if (!currentProblem) {
      return [];
    } else if (mode === 'PROBLEM') {
      return currentProblem.content || [];
    } else {
      return currentProblem.explanation || [];
    }
  }, [currentProblem, mode]);

  const deleteBlock = (blockId: string) => {
    if (!currentProblemId || !currentProblem) {
      return;
    }
    if (mode === 'PROBLEM') {
      setDocument.setProblems.update(currentProblemId).setContent((currentProblem as ProblemScheme).content.filter((block) => block.id !== blockId)
      );
    } else {
      setDocument.setProblems.update(currentProblemId).setExplanation((currentProblem as ProblemScheme).explanation.filter((block) => block.id !== blockId)
      );
    }
  };

  const addBlockAfter = (blockId: string) => {
    if (!currentProblemId || !currentProblem) {
      return;
    }
    if (mode === 'PROBLEM') {
      setDocument.setProblems.update(currentProblemId).setContent([
        ...currentProblem.content.splice(0, currentProblem.content.findIndex((block) => block.id === blockId) + 1),
        {
          id: uuid(),
          type: 'STATEMENT',
          content: '',
        },
        ...currentProblem.content.splice(currentProblem.content.findIndex((block) => block.id === blockId) + 1),
      ]);
    } else {
      setDocument.setProblems.update(currentProblemId).setExplanation([
        ...currentProblem.explanation.splice(0, currentProblem.explanation.findIndex((block) => block.id === blockId) + 1),
        {
          id: uuid(),
          type: 'STATEMENT',
          content: '',
        },
        ...currentProblem.explanation.splice(currentProblem.explanation.findIndex((block) => block.id === blockId) + 1),
      ]);
    }
  };

  if (!currentProblem) {
    return <EditorLayout></EditorLayout>;
  }
  return (
    <EditorLayout>
      <ModeTab onChange={(value) => setMode(value as 'PROBLEM' | 'EXPLANATION')} value={mode} />
      <FormBox>
        <InputWithLabel
          label="title"
          type="text"
          value={currentProblem.meta.title}
          onChange={(e) => {
            if (!currentProblemId) {
              return;
            }
            setDocument.setProblems.update(currentProblemId).setMeta({
              ...currentProblem.meta,
              title: e.target.value,
            });
          }}
        />
        <InputWithLabel
          label="description"
          type='text'
          value={currentProblem.meta.description || ''}
          onChange={(e) => {
            if (!currentProblemId) {
              return;
            }
            setDocument.setProblems.update(currentProblemId).setMeta({
              ...currentProblem.meta,
              description: e.target.value,
            });
          }}
        />
        <InputWithLabel
          label="answer"
          type='text'
          value={currentProblem.answer || ''}
          onChange={(e) => {
            if (!currentProblemId) {
              return;
            }
            setDocument.setProblems.update(currentProblemId).setAnswer(e.target.value);
          }}
        />
        {/* <TagsInput
          value={[]}
        /> */}
      </FormBox>
      {
        <EditorBlockContainerLayout
          axis='y'
          values={currentProblem.content}
          onReorder={(newOrder) => {
            if (!currentProblemId) {
              return;
            }
            if (mode === 'PROBLEM') {
              return setDocument.setProblems.update(currentProblemId).setContent(newOrder);
            } else {
              return setDocument.setProblems.update(currentProblemId).setContent(newOrder);
            }
          }}
        >
          {content.map((block) => (
            <EditorBlock
              key={block.id}
              block={block}
              setBlock={(newBlock) => {
                if (!currentProblemId) {
                  return;
                }
                if (mode === 'PROBLEM') {
                  setDocument.setProblems.update(currentProblemId).setContent(
                    currentProblem.content.map((b) => (b.id === newBlock.id ? newBlock : b)),
                  );
                } else {
                  setDocument.setProblems.update(currentProblemId).setExplanation(
                    currentProblem.explanation.map((b) => (b.id === newBlock.id ? newBlock : b)),
                  );
                }
              }}
              deleteBlock={deleteBlock}
              addBlockAfter={addBlockAfter}
              id={block.id}
              type={block.type}
              content={block.content}
            />
          ))}
        </EditorBlockContainerLayout>
      }
      {
        <AddBlockButton
          type="button"
          onClick={() => {
            if (!currentProblemId) {
              return;
            }
            if (mode === 'PROBLEM') {
              return setDocument.setProblems.update(currentProblemId).setContent([
                ...currentProblem.content,
                {
                  id: uuid(),
                  type: 'STATEMENT',
                  content: '',
                },
              ]);
            } else {
              setDocument.setProblems.update(currentProblemId).setExplanation([
                ...(currentProblem.explanation || []),
                {
                  id: uuid(),
                  type: 'STATEMENT',
                  content: '',
                }
              ]);
            }
          }}
        >
          <FiPlus size={16}/>
            add block
        </AddBlockButton>
      }
    </EditorLayout>
  );
};

export default React.memo(Editor);

const EditorLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 40%;
  height: 100%;

  gap: 16px;

  box-sizing: border-box;

  padding: 1em;

  background-color: #1A1A1C;

  overflow-y: scroll;

  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const FormBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  padding-bottom: 16px;
  border-bottom: 1px solid #353535;

  label {
    font-size: 14px;
    margin-bottom: 0.25em;
  }
`;

const EditorBlockContainerLayout = styled(Reorder.Group)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  padding: 0;
  width: 100%;
  gap: 16px;
`;

const AddBlockButton = styled.button`
  background-color: #232327;
  border: none;
  color: #aaa;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
  text-align: center;
  border-radius: 4px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;

  :hover {
    background-color: #86868613;
  }
`;
