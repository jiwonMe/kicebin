import React from 'react';
import styled from 'styled-components';
import CodeEditor from 'react-simple-code-editor';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Prism, { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-latex.js';
import 'prismjs/themes/prism-tomorrow.css';

const LatexCodeEditor = ({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) => {
  return (
    <CodeEditorLayout
      value={value}
      onValueChange={onValueChange}
      highlight={(code) => highlight(code, languages.latex, 'latex')}
      padding={16}
    />
  );
};

export default LatexCodeEditor;

const CodeEditorLayout = styled(CodeEditor)`

  background-color: #232327;
  color: #aaa;

  font-family: 'D2Coding', 'Fira code', 'Fira Mono', monospace;
  font-size: 14px;

  border-radius: 8px;

  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;
