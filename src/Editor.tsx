import React from 'react';
import styled from 'styled-components';
import CodeEditor from 'react-simple-code-editor';
// import { highlight, languages } from 'prismjs';
// import 'prismjs/components/prism-markdown';
// import 'prismjs/components/prism-latex';
// import 'prismjs/themes/prism-solarizedlight.css'; //Example style, you can use another
import { useEditorStore } from './store/editorStore';
import EditorBlock from './components/EditorBlock';
import { v4 as uuid } from 'uuid';

import { FiPlus } from 'react-icons/fi';
import { InputWithLabel } from './components/Input';

const Editor = () => {
  const { document, setDocument, currentProblemId: _currProbId } = useEditorStore();

  const currentProblemId = _currProbId || document.problems[0]?.id;

  const currentProblem = document.problems.find((p) => p.id === currentProblemId);

  const deleteBlock = (blockId: string) => {
    setDocument.setProblems.update(currentProblemId).setContent((currentProblem as ProblemScheme).content.filter((block) => block.id !== blockId)
    );
  };

  const addBlockAfter = (blockId: string) => {
    if (!currentProblem) {
      return;
    }
    setDocument.setProblems.update(currentProblemId).setContent([
      ...currentProblem.content.splice(0, currentProblem.content.findIndex((block) => block.id === blockId) + 1),
      {
        id: uuid(),
        type: 'STATEMENT',
        content: '',
      },
      ...currentProblem.content.splice(currentProblem.content.findIndex((block) => block.id === blockId) + 1),
    ]);
  };

  if (!currentProblem) {
    return <EditorLayout></EditorLayout>;
  }
  return (
    <EditorLayout>
      <FormBox>
        <InputWithLabel
          label="title"
          type="text"
          value={currentProblem.meta.title}
          onChange={(e) => {
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
            setDocument.setProblems.update(currentProblemId).setMeta({
              ...currentProblem.meta,
              description: e.target.value,
            });
          }}
        />
      </FormBox>
      {
        currentProblem.content.map((block) => (
          <EditorBlock
            key={block.id}
            {...block}
            setBlock={(newBlock) => {
              setDocument.setProblems.update(currentProblemId).setContent(
                currentProblem.content.map((b) => (b.id === newBlock.id ? newBlock : b)),
              );
            }}
            deleteBlock={deleteBlock}
            addBlockAfter={addBlockAfter}
            id={block.id}
            type={block.type}
            content={block.content}
          />
        ))
      }
      {
        <AddBlockButton
          type="button"
          onClick={() => {
            setDocument.setProblems.update(currentProblemId).setContent([
              ...currentProblem.content,
              {
                id: uuid(),
                type: 'STATEMENT',
                content: '',
              }
            ]);
          }}
        >
          <FiPlus size={16}/>
            add block
        </AddBlockButton>
      }
    </EditorLayout>
  );
};

export default Editor;

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
