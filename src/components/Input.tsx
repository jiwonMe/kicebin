import React from 'react';
import styled from 'styled-components';
import LatexCodeEditor from './LatexCodeEditor';

const Input = styled.input`
  border: 1px solid #353535;
  border-radius: 4px;

  box-sizing: border-box;

  background-color: #0000;
  color: #aaa;

  padding: 4px;

  width: 100%;

  &:focus {
    outline: none;
  }
`;

const InputWithLabel = ({ label, type, value, onChange }: { label: string, type: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <InputWithLabelLayout>
    <label>{label}</label>
    <Input
      type={type}
      value={value}
      onChange={onChange}
    />
    {/* <LatexCodeEditor
      value={value}
      onValueChange={(v) => {
        onChange({
          target: {
            value: v,
          },
        } as any);
      }}
    /> */}
  </InputWithLabelLayout>
);

const InputWithLabelLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #d4d4d4;
  gap: 8px;

  margin: 8px 0;

  label {
    font-size: 14px;
    width: fit-content;
    white-space: nowrap;
  }
`;

export default Input;
export { InputWithLabel };
