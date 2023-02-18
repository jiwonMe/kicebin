import React from 'react';
import { HMLJSON } from '../../utils/hmlToTeX/hml';
import hmlEquation2latex from '../../utils/hmlToTeX/hulkEqParser';
import loadHMLtoJSON from '../../utils/hmlToTeX/loadHMLtoJSON';

// console.log(hmlEquation2latex('h LEFT ( x RIGHT )'));

const TestPage = () => {
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

            const findEquation = (json: XMLJSONNode) => {
              if (['HEAD', 'TAIL', 'SHAPECOMMENT'].includes(json.tagName)) {
                return;
              }
              if (json.tagName === 'SCRIPT') {
                json.childNodes?.forEach((child) => {
                  if (child.tagName === 'LITERAL') {
                    str +=`$${hmlEquation2latex(child.value || '')}$`;
                  }
                });
              } else if (json.childNodes) {
                json.childNodes.forEach((child) => {
                  findEquation(child);
                });
              } else if (json.tagName === 'LITERAL') {
                str += json.value;
              }
            };

            findEquation(json);
            console.log(str);
          }
        }}
        type="file" />
    </div>
  );
};

export default TestPage;
