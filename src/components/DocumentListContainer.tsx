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
  documentList,
}: {
  documentList: DocumentScheme[];
}) => {
  const navigate = useNavigate();

  return (
    <DocumentListContainerLayout>
      {
        documentList.sort(
          (a, b) => b.meta.updatedAt.seconds - a.meta.updatedAt.seconds,
        ).map((document) => {
          return (
            <DocumentListCell
              key={document.id}
              onClick={() => navigate(`/editor/${document.id}`)}
              documentId={document.id}
              documentName={document.meta.title}
              documentDescription={document.meta.description ?? ''}
              documentModifiedAt={document.meta.updatedAt}
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
  documentId,
  documentName,
  documentDescription,
  documentModifiedAt,
}: {
  onClick: () => void;
  documentId: string;
  documentName: string;
  documentDescription: string;
  documentModifiedAt?: Timestamp;
}) => {
  const { user } = useAuthStore();

  const [isOptionDropdownOpen, setIsOptionDropdownOpen] = useState(false);

  const deleteDocument = async (documentId: string) => {
    const confirmDelete = confirm('정말로 삭제하시겠습니까?');
    if (!confirmDelete) return;

    if (!user?.email) return;
    // delete document
    const querySnapShot = await getDoc(doc(db, 'users', user?.email, 'docs', documentId));

    if (querySnapShot.exists()) {
      await deleteDoc(doc(db, 'users', user?.email, 'docs', documentId));
    }
  };

  const renameDocument = async (documentId: string) => {
    // prompt

    const newDocumentName = prompt('새로운 제목을 입력해주세요.', documentName);
    const newDocumentDescription = prompt('새로운 설명을 입력해주세요.', documentDescription);

    if (!newDocumentName || !newDocumentDescription) return;

    if (!user?.email) return;

    // update document
    const querySnapShot = await getDoc(doc(db, 'users', user?.email, 'docs', documentId));

    const document = querySnapShot.data() as DocumentScheme;

    if (querySnapShot.exists()) {
      await updateDoc(doc(db, 'users', user?.email, 'docs', documentId), {
        ...document,
        meta: {
          ...document.meta,
          title: newDocumentName,
          description: newDocumentDescription,
        },
      });
    }
  };

  console.log(documentModifiedAt, new Date().getTime());
  return (
    <DocumentListCellLayout
      key={documentId}
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
              deleteDocument(documentId);
            }}
          >
            <OptionsDropdownItemText
            >삭제</OptionsDropdownItemText>
          </OptionsDropdownItem>
          <OptionsDropdownItem
            onClick={(e) => {
              e.stopPropagation();
              renameDocument(documentId);
            }}
          >
            <OptionsDropdownItemText
            >제목/설명 변경</OptionsDropdownItemText>
          </OptionsDropdownItem>
        </OptionsDropdown>
      )}
      <DocumentCellTitleAndDescription>
        <DocumentListCellTitle>{documentName}</DocumentListCellTitle>
        <DocumentListCellDescription>{documentDescription}</DocumentListCellDescription>
      </DocumentCellTitleAndDescription>
      <DocumentListCellDescription>{
        documentModifiedAt && `${differenceInAppropriateUnits(
          new Date(),
          new Timestamp(documentModifiedAt.seconds, documentModifiedAt.nanoseconds).toDate(),
        )} 전`}</DocumentListCellDescription>
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
