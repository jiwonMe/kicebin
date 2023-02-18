import React from 'react';
import hmlEquation2latex from '../../utils/hmlToTeX/hulkEqParser';
import loadHMLtoJSON from '../../utils/hmlToTeX/loadHMLtoJSON';

console.log(hmlEquation2latex('h LEFT ( x RIGHT )'));

const TestPage = () => {
  return (
    // input form that open hml file.
    <div>
      <input
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) {
            const json = await loadHMLtoJSON(file);
            console.log(json);

            // download json
            // const a = document.createElement('a');
            // const file2 = new Blob([JSON.stringify(json)], { type: 'application/json' });
            // a.href = URL.createObjectURL(file2);
            // a.download = 'test.json';
            // a.click();
          }
        }}
        type="file" />
    </div>
  );
};

export default TestPage;
