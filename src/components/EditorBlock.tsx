import React from 'react';
import styled from 'styled-components';
import { InputWithLabel } from './Input';
import LatexCodeEditor from './LatexCodeEditor';
import { FiX, FiPlus } from 'react-icons/fi';

interface EditorBlockProps extends BlockScheme {
  setBlock: (block: BlockScheme) => void;
  deleteBlock: (blockId: string) => void;
  addBlockAfter: (blockId: string) => void;
}

const EditorBlock = ({
  type, id, content, setBlock, deleteBlock, addBlockAfter,
}: EditorBlockProps) => {
  return (
    <EditorBlockLayout>
      <BlockHeaderLayout>
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
              }[blockType]
            });
          }}
        >
          <option value="STATEMENT">statement</option>
          <option value="CONDITIONS">conditions</option>
          <option value="BOXED">boxed</option>
          <option value="EXAMPLES">examples</option>
          <option value="CHOICES">choices</option>
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
              <div>
                <InputWithLabel
                  label='(가)'
                  type="text"
                  value={content[0]}
                  onChange={(e) => {
                    setBlock({
                      type,
                      id,
                      content: [e.target.value, content[1]],
                    });
                  }}
                />
              </div>
              <div>
                <InputWithLabel
                  label='(나)'
                  type="text"
                  value={content[1]}
                  onChange={(e) => {
                    setBlock({
                      type,
                      id,
                      content: [content[0], e.target.value],
                    });
                  }}
                />
              </div>
            </div>
          )
        }
        {
          type === 'EXAMPLES' && (
            <div>
              <div>
                <InputWithLabel
                  label='보기 ㄱ'
                  type="text"
                  value={content[0]}
                  onChange={(e) => {
                    setBlock({
                      type,
                      id,
                      content: [e.target.value, content[1], content[2]],
                    });
                  }}
                />
              </div>
              <div>
                <InputWithLabel
                  label='보기 ㄴ'
                  type="text"
                  value={content[1]}
                  onChange={(e) => {
                    setBlock({
                      type,
                      id,
                      content: [content[0], e.target.value, content[2]],
                    });
                  }}
                />
              </div>
              <div>
                <InputWithLabel
                  label='보기 ㄷ'
                  type="text"
                  value={content[2]}
                  onChange={(e) => {
                    setBlock({
                      type,
                      id,
                      content: [content[0], content[1], e.target.value],
                    });
                  }}
                />
              </div>
            </div>
          )
        }
        {
          type === 'CHOICES' && (
            <div>{
              [1, 2, 3, 4, 5].map((i) => (
                <InputWithLabel
                  key={i}
                  label={['①', '②', '③', '④', '⑤'][i - 1]}
                  type="text"
                  value={content[i - 1]}
                  onChange={(e) => {
                    setBlock({
                      type,
                      id,
                      content: (content as string[]).map((c, j) => (j === i - 1 ? e.target.value : c)),
                    });
                  }}
                />
              ))
            }</div>
          )
        }
      </div>
    </EditorBlockLayout>
  );
};

export default EditorBlock;

const EditorBlockLayout = styled.div`
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
