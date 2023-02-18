import React from 'react';
import styled from 'styled-components';
import { InputWithLabel } from './Input';
import LatexCodeEditor from './LatexCodeEditor';
import { FiX, FiPlus, FiUpload } from 'react-icons/fi';

import { storage } from '../service/firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { BlockScheme, BlockType } from '../types/Block';
import { motion, Reorder, useDragControls } from 'framer-motion';

import { RxDragHandleDots2 } from 'react-icons/rx';


interface EditorBlockProps extends BlockScheme {
  block: BlockScheme;
  setBlock: (block: BlockScheme) => void;
  deleteBlock: (blockId: string) => void;
  addBlockAfter: (blockId: string) => void;
}

const EditorBlock = ({
  block, type, id, content, setBlock, deleteBlock, addBlockAfter,
}: EditorBlockProps) => {

  const controls = useDragControls();

  return (
    <EditorBlockLayout
      key={id}
      value={block}
      dragListener={false}
      dragControls={controls}
    >
      <BlockHeaderLayout>
        <DragHandle
          onPointerDown={(e) => {
            controls.start(e);
          }}
        >
          <RxDragHandleDots2 />
        </DragHandle>
        <Select
          value={type}
          onChange={(e) => {
            const blockType = e.target.value as BlockType;
            setBlock({
              type: e.target.value as BlockType,
              id,
              content: {
                STATEMENT: '',
                CONDITIONS: ['', ''],
                BOXED: '',
                EXAMPLES: [''],
                CHOICES: ['','','','',''],
                IMAGE: '',
              }[blockType]
            });
          }}
        >
          <option value="STATEMENT">statement</option>
          <option value="CONDITIONS">conditions</option>
          <option value="BOXED">boxed</option>
          <option value="EXAMPLES">examples</option>
          <option value="CHOICES">choices</option>
          <option value="IMAGE">image</option>
        </Select>
        <BlockButton
          onClick={() => {
            addBlockAfter(id);
          }}
        >
          <FiPlus size={16} />
        </BlockButton>
        <BlockButton
          onClick={() => {
            deleteBlock(id);
            if (type === 'IMAGE') {
              const imageRef = ref(storage, `images/${id}`);
              deleteObject(imageRef);
            }
          }}
        >
          <FiX size={16} />
        </BlockButton>
      </BlockHeaderLayout>
      <div>
        {['STATEMENT', 'BOXED'].includes(type) && (
          <LatexCodeEditor
            value={content as string}
            onValueChange={(value) => {
              setBlock({
                type,
                id,
                content: value,
              });
            }}
          />
        )}
        {
          type === 'CONDITIONS' && (
            <div>
              {
                (content as string[]).map((condition, i) => {
                  return (
                    <ConditionLayout
                      key={i}
                    >
                      <InputWithLabel
                        label={['(가)', '(나)', '(다)', '(라)', '(마)', '(바)', '(사)', '(아)', '(자)', '(차)', '(카)', '(타)', '(파)', '(하)'][i]}
                        type="text"
                        value={condition}
                        onChange={(e) => {
                          setBlock({
                            type,
                            id,
                            content: (content as string[]).map((c, j) => (j === i ? e.target.value : c)),
                          });
                        }}
                      />
                      <DeleteButton
                        onClick={() => {
                          if ((content as string[]).length <= 2) {
                            alert('최소 2개 이상의 조건이 있어야 합니다.');
                            return;
                          }
                          setBlock({
                            type,
                            id,
                            content: (content as string[]).filter((_, j) => j !== i),
                          });
                        }}
                      >
                        <FiX size={16} />
                      </DeleteButton>
                    </ConditionLayout>
                  );
                })
              }
              <AddConditionButton
                onClick={() => {
                  if ((content as string[]).length >= 14) {
                    alert('최대 14개까지 추가할 수 있습니다.');
                    return;
                  }
                  setBlock({
                    type,
                    id,
                    content: [...(content as string[]), ''],
                  });
                }}
              >
                <FiPlus size={16} />
                보기 추가
              </AddConditionButton>
            </div>
          )
        }
        {
          type === 'EXAMPLES' && (
            <div>
              {
                (content as string[]).map((example, i) => {
                  const ExampleSymbols = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
                  return (
                    <ExampleLayout
                      key={i}
                    >
                      <InputWithLabel
                        label={`보기 ${ExampleSymbols[i]}`}
                        type="text"
                        value={example}
                        onChange={(e) => {
                          setBlock({
                            type,
                            id,
                            content: (content as string[]).map((c, j) => (j === i ? e.target.value : c)),
                          });
                        }}
                      />
                      <DeleteButton
                        onClick={() => {
                          if ((content as string[]).length <= 2) {
                            alert('최소 2개 이상의 보기가 있어야 합니다.');
                            return;
                          }
                          setBlock({
                            type,
                            id,
                            content: (content as string[]).filter((_, j) => j !== i),
                          });
                        }}
                      >
                        <FiX size={16} />
                      </DeleteButton>
                    </ExampleLayout>
                  );
                })
              }
              <AddExampleButton
                onClick={() => {
                  if ((content as string[]).length >= 14) {
                    alert('최대 14개까지 추가할 수 있습니다.');
                    return;
                  }
                  setBlock({
                    type,
                    id,
                    content: [...(content as string[]), ''],
                  });
                }}
              >
                <FiPlus size={16} />
                보기 추가
              </AddExampleButton>
            </div>
          )
        }
        {
          type === 'CHOICES' && (
            <div>{
              (content as string[]).map((choice, i) => {

                const choiceSymbols = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨'];

                return (
                  <ChoiceLayout
                    key={i}
                  >
                    <InputWithLabel
                      label={choiceSymbols[i]}
                      type="text"
                      value={choice}
                      onChange={(e) => {
                        setBlock({
                          type,
                          id,
                          content: (content as string[]).map((c, j) => (j === i ? e.target.value : c)),
                        });
                      }}
                    />
                    <DeleteButton
                      onClick={() => {
                        if ((content as string[]).length <= 2) {
                          alert('최소 2개의 선택지가 필요합니다.');
                          return;
                        }
                        setBlock({
                          type,
                          id,
                          content: (content as string[]).filter((_, j) => j !== i),
                        });
                      }}
                    >
                      <FiX size={16} />
                    </DeleteButton>
                  </ChoiceLayout>
                );
              })}
            {
              <AddChoiceButton
                onClick={() => {
                  if ((content as string[]).length >= 9) {
                    alert('최대 9개까지 추가할 수 있습니다.');
                    return;
                  }
                  setBlock({
                    type,
                    id,
                    content: [...(content as string[]), ''],
                  });
                }}
              >
                <FiPlus size={16} />
                선택지 추가
              </AddChoiceButton>
            }</div>
          )
        }
        {
          type === 'IMAGE' && (
            <div>
              {
                content ? (
                  <PreviewImage src={content as string} alt="uploaded" />
                ) : (
                  <ImagePlaceholder
                    htmlFor={`image-input-${id}`}
                  >
                    <FiUpload size={16} />
                    <span>Upload</span>
                  </ImagePlaceholder>
                )
              }
              <ImageInput
                id={`image-input-${id}`}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  // upload image to firebase storage
                  const file = e.target.files?.[0];
                  if (file) {
                    const storageRef = ref(storage, `images/${id}`);
                    const response = uploadBytes(storageRef, file);
                    response.then((snapshot) => {
                      getDownloadURL(snapshot.ref).then((url) => {
                        setBlock({
                          type,
                          id,
                          content: url,
                        });
                      });
                    });
                  }
                }}
              />
              {
                content && (
                  <ImageDeleteButton
                    onClick={() => {
                      setBlock({
                        type,
                        id,
                        content: '',
                      });
                      const imageRef = ref(storage, `images/${id}`);
                      deleteObject(imageRef);
                    }}
                  >
                    <FiX size={16} />
                  </ImageDeleteButton>
                )
              }
            </div>
          )
        }
      </div>
    </EditorBlockLayout>
  );
};

export default React.memo(EditorBlock);

const EditorBlockLayout = styled(Reorder.Item)`
  font-family: 'Pretendard';

  display: flex;
  flex-direction: column;

  background-color: #232327;
  width: 100%;

  padding: 0 8px;

  box-sizing: border-box;

  border-radius: 4px;

`;

const BlockHeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #464646;
`;

const DragHandle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  /* width: 40px; */
  height: 40px;

  color: #d4d4d4;
  /* :hover {
    background-color: #86868613;
  } */
`;

const BlockButton = styled.button`
  background-color: #0000;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;

  color: #d4d4d4;
  :hover {
    background-color: #86868613;
  }
`;

const Select = styled.select`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  border: none;

  background-color: #0000;
  color: #d4d4d4;

  padding: 8px 4px;

  height: 40px;

  width: 100%;

  &:focus {
    outline: none;
  }

`;

const ImageInput = styled.input`
  display: none;
`;

const ImageInputLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  width: 100%;
  height: 40px;

  border: 1px solid #868686;
  border-radius: 4px;

  font-size: 14px;

  color: #d4d4d4;

  cursor: pointer;

  margin-bottom: 8px;

  :hover {
    background-color: #86868613;
  }
`;

const ImageDeleteButton = styled.button`
  background-color: #0000;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;

  color: #d4d4d4;
  :hover {
    background-color: #86868613;
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImagePlaceholder = styled.label`
  width: 100%;
  height: 100px;

  border: 1px solid #868686;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 14px;

  color: #d4d4d4;

  margin-bottom: 8px;
`;

const DeleteButton = styled.button`
  background-color: #0000;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;

  color: #d4d4d4;
  :hover {
    background-color: #86868613;
  }
`;

const ConditionLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const AddConditionButton = styled.button`
  background-color: #0000;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  width: 100%;
  height: 40px;

  border-radius: 4px;

  border: 1px solid #868686;

  color: #d4d4d4;
  :hover {
    background-color: #86868613;
  }
`;

const ExampleLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const AddExampleButton = styled(AddConditionButton)``;

const ChoiceLayout = styled(ExampleLayout)``;

const AddChoiceButton = styled(AddConditionButton)``;
