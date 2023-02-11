import React from 'react';
import styled from 'styled-components';

const DocumentListContainer = ({
  documentList,
}: {
  documentList: DocumentScheme[];
}) => {
  return (
    <DocumentListContainerLayout>
      {
        documentList.map((document) => {
          return (
            <DocumentListCell
              key={document.id}
              documentId={document.id}
              documentName={document.meta.title}
              documentDescription={document.meta.description ?? ''}
              documentModifiedAt={document.meta.updatedAt ?? ''}
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
  documentId,
  documentName,
  documentDescription,
  documentModifiedAt,
}: {
  documentId: string;
  documentName: string;
  documentDescription: string;
  documentModifiedAt: string;
}) => {
  return (
    <DocumentListCellLayout>
      <div>{documentName}</div>
      <div>{documentDescription}</div>
      <div>{documentModifiedAt}</div>
    </DocumentListCellLayout>
  );
};

const DocumentListCellLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  /* border-radius: 8px; */

  color: #BABAC2;
  width: 48%;
  /* background-color: #232327; */

  border: 1px solid #484848;
  box-sizing: border-box;
`;
