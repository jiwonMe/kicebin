import { Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DocumentScheme } from '../types/Document';
import differenceInAppropriateUnits from '../utils/differenceInAppropriateUnits';

import { db } from '../service/firebase';
import { collection, getDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useAuthStore } from '../store/AuthStore';

const DocumentListContainer = ({
  updateDocument,
  deleteDocument,
  documentList,
}: {
  updateDocument: (document: DocumentScheme) => void;
  deleteDocument: (documentId: string) => void;
  documentList: DocumentScheme[];
}) => {
  const navigate = useNavigate();

  console.log(documentList);

  return (
    <DocumentListContainerLayout>
      {
        documentList.sort(
          (a, b) => b.meta.updatedAt.seconds - a.meta.updatedAt.seconds,
        ).map((document) => {
          return (
            <DocumentListCell
              key={document.id}
              document={document}
              updateDocument={updateDocument}
              deleteDocument={deleteDocument}
              onClick={() => navigate(`/editor/${document.id}`)}
            />
          );
        })
      }
    </DocumentListContainerLayout>
  );
};

export default DocumentListContainer;

const DocumentListContainerLayout = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  width: 100%;
  gap: 8px;
  overflow-y: scroll;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const DocumentListCell = ({
  onClick,
  updateDocument,
  deleteDocument,
  document,
}: {
  onClick: () => void;
  updateDocument: (document: DocumentScheme) => void;
  deleteDocument: (documentId: string) => void;
  document: DocumentScheme;
}) => {
  const { user } = useAuthStore();

  const [isOptionDropdownOpen, setIsOptionDropdownOpen] = useState(false);

  const _renameDocument = async () => {
    // prompt

    const newDocumentName = prompt('새로운 제목을 입력해주세요.', document.meta.title);
    const newDocumentDescription = prompt('새로운 설명을 입력해주세요.', document.meta.description);

    if (!newDocumentName || !newDocumentDescription) return;

    if (!user?.email) return;

    // update document
    updateDocument({
      ...document,
      meta: {
        ...document.meta,
        title: newDocumentName,
        description: newDocumentDescription,
        updatedAt: new Timestamp(new Date().getTime() / 1000, 0),
      },
    });
  };
  return (
    <DocumentListCellLayout
      key={document.id}
      onClick={onClick}
    >
      <OptionButton
        onClick={(e) => {
          e.stopPropagation();
          console.log('option button clicked');
          setIsOptionDropdownOpen(!isOptionDropdownOpen);
        }}
      >
        <FiMoreHorizontal size={24}/>
      </OptionButton>
      {isOptionDropdownOpen && (
        <OptionsDropdown>
          <OptionsDropdownItem
            onClick={(e) => {
              e.stopPropagation();
              deleteDocument(document.id);
            }}
          >
            <OptionsDropdownItemText
            >삭제</OptionsDropdownItemText>
          </OptionsDropdownItem>
          <OptionsDropdownItem
            onClick={(e) => {
              e.stopPropagation();
              _renameDocument();
            }}
          >
            <OptionsDropdownItemText
            >제목/설명 변경</OptionsDropdownItemText>
          </OptionsDropdownItem>
        </OptionsDropdown>
      )}
      <DocumentCellTitleAndDescription>
        <DocumentListCellTitle>{document.meta.title}</DocumentListCellTitle>
        <DocumentListCellDescription>{document.meta.description}</DocumentListCellDescription>
      </DocumentCellTitleAndDescription>
      <DocumentListCellDescription>{
        document.meta.updatedAt && `${differenceInAppropriateUnits(
          new Date(),
          new Timestamp(document.meta.updatedAt.seconds, document.meta.updatedAt.nanoseconds).toDate(),
        )} 전 · ${
          document.problems.length
        }문항`}</DocumentListCellDescription>
    </DocumentListCellLayout>
  );
};

const DocumentListCellLayout = styled.div`
  font-family: 'Pretendard';

  position: relative;

  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
  border-radius: 8px;

  color: #BABAC2;
  width: calc(100% / 2 - 4px);
  /* background-color: #232327; */

  border: 1px solid #484848;
  box-sizing: border-box;
`;

const DocumentListCellTitle = styled.div`
  font-size: 16px;
`;

const DocumentListCellDescription = styled.div`
  font-size: 14px;
  color: #7E7E8C;
`;

const DocumentCellTitleAndDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const OptionButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
  cursor: pointer;
`;

const OptionsDropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  padding: 8px;
  cursor: pointer;

  background-color: #232327;
  border-radius: 8px;

  border: 1px solid #484848;
`;

const OptionsDropdownItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  color: #BABAC2;
  gap: 8px;

  height: 24px;

  box-sizing: border-box;

  cursor: pointer;

  :hover {
    background-color: #86868613;
  }
`;

const OptionsDropdownItemText = styled.div`
  font-size: 14px;
`;
