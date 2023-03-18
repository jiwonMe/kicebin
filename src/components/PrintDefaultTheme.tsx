import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BlockScheme } from '../types/Block';
import { DocumentScheme } from '../types/Document';
import Markdown from './Markdown';
import splitToColumns from './splitToColumns';

const chunk = <T,>(arr: T[], size: number): T[][] => {
  const chunked_arr: T[][] = [];
  let index = 0;
  while (index < arr.length) {
    chunked_arr.push(arr.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
};

const renderBlock = (block: BlockScheme) => {
  switch (block.type) {
  case 'STATEMENT':
    return (
      <div>
        <Markdown>

          {block.content}
        </Markdown>
      </div>
    );
  case 'CONDITIONS':
    return (
      <div>
        <ol>
          {
            (block.content as string[]).map((condition, conditionIndex) => (
              <li key={conditionIndex}>
                <Markdown>
                  {condition}
                </Markdown>
              </li>
            ))
          }
        </ol>
      </div>
    );
  case 'BOXED':
    return (
      <div>
        <Markdown>
          {block.content}
        </Markdown>
      </div>
    );
  case 'EXAMPLES':
    return (
      <div>
        <ol>
          {
            (block.content as string[]).map((example, exampleIndex) => (
              <li key={exampleIndex}>
                <Markdown>
                  {example}
                </Markdown>
              </li>
            ))
          }
        </ol>
      </div>
    );
  case 'CHOICES':
    return (
      null
    );
  case 'IMAGE':
    return (
      block.content && (
        <div>
          <img
            src={block.content as string}
            alt="uploaded"
          />
        </div>
      )
    );
  }
};

const documentToPrintBlocks = (document: DocumentScheme) => {
  const printBlocks = document.problems?.map((problem, problemIndex) => {
    const problemTitle: BlockScheme = {
      id: problem.id,
      type: 'STATEMENT',
      content: `${problemIndex + 1}. ${problem.meta.title}`,
    };
    return [
      problemTitle,
      ...problem.content,
    ];
  }).flat();
  return printBlocks;
};



const PrintDefaultTheme = ({ document }: {
  document: DocumentScheme
}) => {
  const printBlocks = documentToPrintBlocks(document);
  return (
    <DocumentLayout>
      {
        chunk(splitToColumns({
          children: printBlocks && printBlocks.map((block, blockIndex) => (
            <div key={blockIndex}>
              {renderBlock(block)}
            </div>
          )),
          heightLimit: 500,
          widthLimit: 500,
          Wrapper: PageLayout,
        }), 2).map((columns, pageIndex) => (
          <PageLayout key={pageIndex}>
            <TwoColumnLayout>
              <ColumnLayout>
                {columns[0]}
              </ColumnLayout>
              <ColumnLayout>
                {columns[1]}
              </ColumnLayout>
            </TwoColumnLayout>
          </PageLayout>
        ))
      }
    </DocumentLayout>
  );
};
const DocumentLayout = styled.div`
  @media screen {
   display : none;
  }
  @media print and (min-resolution: 600dpi) {
    @page {
      /* size 210mm 297mm; */
      size: 210mm 297mm;
    }
    display: block;
  }

  -ms-print-color-adjust: exact;
  -moz-print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
  text-rendering: geometricPrecision;

  line-height: 150%;

  font-family: 'Times New Roman', "SM3중명조";
  font-size: 12pt;

  font-stretch: 0.95%;
  word-spacing: 0.05em;
  letter-spacing: -0.05em;

  word-break: keep-all;
  text-align: justify;

  position: absolute;
  padding: 0;
`;

const PageLayout = styled.div`
  break-inside: avoid !important;
  position: relative;

  padding: 2cm 1.5cm 2.5cm 1.5cm;
  margin: 0;

  overflow: hidden;

  box-sizing: border-box;

  width: 1134px;
  height: 1602px;

  background-color: #ffffff;
`;

const ColumnLayout = styled.div`
  display: flex;
  flex-direction: column;

  width: 500px;
  height: 100%;

  box-sizing: border-box;
  border: 1px solid black;
`;

const TwoColumnLayout = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 100%;

  box-sizing: border-box;
`;

export default PrintDefaultTheme;
