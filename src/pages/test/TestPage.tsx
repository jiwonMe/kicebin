import React, { useState } from 'react';
import { ProblemScheme } from '../../types/Problem';
import { HMLJSON } from '../../utils/hmlToTeX/hml';
import hmlEquation2latex from '../../utils/hmlToTeX/hulkEqParser';
import loadHMLtoJSON from '../../utils/hmlToTeX/loadHMLtoJSON';
import { v4 as uuid } from 'uuid';
import _Viewer from '../../components/Viewer';
import styled from 'styled-components';

// console.log(hmlEquation2latex('h LEFT ( x RIGHT )'));

const TestPage = () => {
  const [problem, setProblem] = useState<ProblemScheme | null>();

  return (
    // input form that open hml file.
    <div>
      <input
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) {
            const json = await loadHMLtoJSON(file) as XMLJSONNode;
            console.log(json) ;

            // download json
            // const a = document.createElement('a');
            // const file2 = new Blob([JSON.stringify(json)], { type: 'application/json' });
            // a.href = URL.createObjectURL(file2);
            // a.download = 'test.json';
            // a.click();

            // translate all equations in json
            // find equation in json


            let str = '';
            let examples: string[] = [];

            const findEquation = (json: XMLJSONNode,
              cb: (json: XMLJSONNode) => void = () => {
                //
              }
            ) => {
              if (json.pwd?.includes('PARALIST')) {
                let examplesStr = '';
                // if 'LITERAL' in childNodes or childNodes of childNodes or etc...
                const addLiteral = (json: XMLJSONNode) => {
                  if (json.tagName === 'LITERAL') {
                    if (json.pwd?.includes('SCRIPT')) {
                      examplesStr += `$${hmlEquation2latex(json.value || '')}$ `;
                    } else {
                      examplesStr += json.value;
                    }
                  } else if (json.childNodes) {
                    json.childNodes.forEach(addLiteral);
                  }
                };

                json.childNodes?.forEach(addLiteral);

                // split by 'ㄱ', 'ㄴ', 'ㄷ'
                examplesStr = examplesStr.replaceAll(/ㄱ.|ㄴ.|ㄷ./g, '%split%').replaceAll(/수식입니다./g, '');
                examples = examplesStr.split('%split%');
                return;
              }
              if (['HEAD', 'TAIL', 'SHAPECOMMENT'].includes(json.tagName)) {
                return;
              }
              if (json.tagName === 'SCRIPT') {
                json.childNodes?.forEach((child) => {
                  if (child.tagName === 'LITERAL') {
                    str +=`$${hmlEquation2latex(child.value || '')}$`;
                    cb(child);
                  }
                });
              } else if (json.tagName === 'TEXT' && (
                !json.childNodes || json.childNodes.length === 0
              )) {
                // console.log(json);
                str += '\n\n';
              } else if (json.childNodes) {
                json.childNodes.forEach((child) => {
                  findEquation(child);
                });
              } else if (json.tagName === 'LITERAL') {
                str += json.value;
                cb(json);
              }
            };

            findEquation(json);

            // get choices from str
            // divide by ①|②|③|④|⑤|⑥|⑦|⑧|⑨|⑩
            const choices: string[] = [];
            str = str.replaceAll(/①|②|③|④|⑤|⑥|⑦|⑧|⑨|⑩/g, '%split%');
            str.split('%split%').forEach((choice, i) => {
              if (i === 0) {
                str = choice;
              } else {
                choices.push(choice);
              }
            });


            const problem: ProblemScheme = {
              id: uuid(),
              meta: {
                title: 'test',
                description: 'test',
              },
              content: [],
            };

            problem.content.push({
              id: uuid(),
              type: 'STATEMENT',
              content: str,
            });

            problem.content.push({
              id: uuid(),
              type: 'EXAMPLES',
              content: examples.splice(1, 4),
            });

            problem.content.push({
              id: uuid(),
              type: 'CHOICES',
              content: choices,
            });

            console.log(problem);
            setProblem(problem);
          }
        }}
        type="file" />
      {
        problem &&
          <Viewer
            problems={[problem]}
            currentProblemId={problem.id}
          />
      }
    </div>
  );
};

export default TestPage;

const Viewer = styled(_Viewer)`
  width: 100% !important;
`;
