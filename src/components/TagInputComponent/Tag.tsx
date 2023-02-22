import React from 'react';
import { FiX } from 'react-icons/fi';
import styled from 'styled-components';

interface TagProps {
  text: string;
  remove: any;
  disabled?: boolean;
  className?: string;
}

export default function Tag({ text, remove, disabled }: TagProps) {
  const handleOnRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    remove(text);
  };

  return <TagLayout># {text}</TagLayout>;
}

const TagLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* min-width: 100px; */
  width: fit-content;

  padding: 0 8px;
  height: 24px;

  border-radius: 4px;

  background-color: #f4f4f4;
`;
