import React, { useState } from 'react';
import styled from 'styled-components';

import Tag from './Tag';
import { useDidUpdateEffect } from './useDidUpdateEffect';

export interface TagsInputProps {
  name?: string;
  placeHolder?: string;
  value?: string[];
  onChange?: (tags: string[]) => void;
  onBlur?: any;
  separators?: string[];
  disableBackspaceRemove?: boolean;
  onExisting?: (tag: string) => void;
  onRemoved?: (tag: string) => void;
  disabled?: boolean;
  isEditOnRemove?: boolean;
  beforeAddValidate?: (tag: string, existingTags: string[]) => boolean;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  classNames?: {
    input?: string;
    tag?: string;
  };
}

const defaultSeparators = ['Enter'];

export const TagsInput = ({
  name,
  placeHolder,
  value,
  onChange,
  onBlur,
  separators,
  disableBackspaceRemove,
  onExisting,
  onRemoved,
  disabled,
  isEditOnRemove,
  beforeAddValidate,
  onKeyUp,
  classNames,
}: TagsInputProps) => {
  const [tags, setTags] = useState<any>(value || []);

  useDidUpdateEffect(() => {
    onChange && onChange(tags);
  }, [tags]);

  useDidUpdateEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(tags)) {
      setTags(value);
    }
  }, [value]);

  const handleOnKeyUp = (e: any) => {
    onKeyUp && onKeyUp(e);
    e.stopPropagation();

    const text = e.target.value;

    if (text && (separators || defaultSeparators).includes(e.key)) {
      e.preventDefault();
      if (beforeAddValidate && !beforeAddValidate(text, tags)) return;

      if (tags.includes(text)) {
        onExisting && onExisting(text);
        return;
      }
      setTags([...tags, text]);
      e.target.value = '';
    }
  };

  const handleOnKeyDown = (e: any) => {
    e.stopPropagation();

    const text = e.target.value;

    if (!text && !disableBackspaceRemove && tags.length && e.key === 'Backspace') {
      e.target.value = isEditOnRemove ? `${tags.at(-1)} ` : '';
      setTags([...tags.slice(0, -1)]);
    }
  };

  const onTagRemove = (text: string) => {
    setTags(tags.filter((tag: any) => tag !== text));
    onRemoved && onRemoved(text);
  };

  return (
    <TagInputLayout aria-labelledby={name} className="rti--container">
      {tags.map((tag: any) => (
        <Tag
          key={tag}
          className={classNames?.tag}
          text={tag}
          remove={onTagRemove}
          disabled={disabled}
        />
      ))}
      <Input
        type="text"
        name={name}
        placeholder={placeHolder}
        onKeyUp={handleOnKeyUp}
        onBlur={onBlur}
        disabled={disabled}
        onKeyDown={handleOnKeyDown}
        // onKeyUp={onKeyUp}
      />
    </TagInputLayout>
  );
};

const TagInputLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  flex-direction: row;

  gap: 8px;

  height: 36px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
`;

const Input = styled.input`
  appearance: none;
  flex: 1;
  height: 100%;
  padding: 0 8px;

  color: white;
  border: none;
  outline: none;

  background: transparent;
`;
