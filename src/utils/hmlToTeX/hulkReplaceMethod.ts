import ConvertMapJSON from './convertMap.json';

interface ConvertMap {
  'convertMap': {
    [key: string]: string
  },
  'middleConvertMap': {
    [key: string]: string
  },
  'BarConvertMap': {
    [key: string]: string
  },
  'MatrixConvertMap': {
    [key: string]: {
      'begin': string,
      'end': string
      'removeOutterBrackets': boolean
    }
  },
  'BraceConvertMap': {
    [key: string]: string,
  },
}
const convertMap = ConvertMapJSON as ConvertMap;

const barDict = convertMap['BarConvertMap'];
const matDict = convertMap['MatrixConvertMap'];
const braceDict = convertMap['BraceConvertMap'];

interface Brackets {
  startCursor: number;
  endCursor: number;
}

function _findOutterBrackets(eqString: string, startIdx: number): Brackets {
  /*
    eqString : equation string for converting.
    startIdx : the cursor of equation string to find brackets.
    return:
        (startCursor, endCursor) for outter brackets.
  */
  let idx = startIdx;
  /* eslint-disable no-constant-condition */
  while (true) {
    idx -= 1;
    if (eqString[idx] == '{') {
      break;
    }
  }

  return _findBrackets(eqString, idx, 1);
}

function _findBrackets(eqString: string, startIdx: number, direction: number): Brackets {
  /*
    eqString : equation string for converting.
    startIdx : the cursor of equation string to find brackets.
    direction : the direction of find.
        if 0, find brackets before the cursor.
           1, find brackets after the cursor.
    return:
        (startCursor, endCursor) for brackets.
  */
  if (direction == 1) {
    const startCur = eqString.indexOf('{', startIdx);
    let bracketCount = 1;
    for (let i = startCur + 1; i < eqString.length; i++) {
      if (eqString[i] == '{') {
        bracketCount += 1;
      } else if (eqString[i] == '}') {
        bracketCount -= 1;
      }

      if (bracketCount == 0) {
        return { startCursor: startCur, endCursor: i + 1 };
      }
    }
  } else {
    // reverse string and convert brackets.
    eqString = eqString.split('').reverse().join('');
    eqString = eqString.replace(/\{/g, '}').replace(/\}/g, '{');

    // find brackets with new cursor
    const newStartIdx = eqString.length - (startIdx + 1);
    const { startCursor, endCursor } = _findBrackets(eqString, newStartIdx, 1);
    return { startCursor: eqString.length - endCursor, endCursor: eqString.length - startCursor };
  }

  throw new Error('cannot find bracket');
}

function replaceAllBar(eqString: string): string {
  /**
   * Replace hat-like equation string.
   */
  function replaceBar(eqString: string, barStr: string, barElem: string): string {
    let cursor = 0;

    /* eslint-disable no-constant-condition */
    while (true) {
      cursor = eqString.indexOf(barStr, cursor);
      if (cursor === -1) {
        break;
      }

      try {
        const { startCursor: eStart, endCursor: eEnd } = _findBrackets(eqString, cursor, 1);
        const { startCursor: bStart, endCursor: bEnd } = _findOutterBrackets(eqString, cursor);
        const elem = eqString.slice(eStart, eEnd);

        const beforeBar = eqString.slice(0, bStart);
        const afterBar = eqString.slice(bEnd);

        eqString = beforeBar + barElem + elem + afterBar;
      } catch (error) {
        return eqString;
      }
    }

    return eqString;
  }

  for (const [barKey, barElem] of Object.entries(barDict)) {
    eqString = replaceBar(eqString, barKey, barElem);
  }

  return eqString;
}

interface MatrixElement {
  begin: string;
  end: string;
  removeOutterBrackets: boolean;
}

function replaceAllMatrix(eqString: string): string {
  function replaceElementsOfMatrix(bracketStr: string): string {
    bracketStr = bracketStr.slice(1, -1); // remove brackets
    bracketStr = bracketStr.replace(/#/g, ' \\\\ ');
    bracketStr = bracketStr.replace(/&amp;/g, '&');
    return bracketStr;
  }

  function replaceMatrix(eqString: string, matStr: string, matElem: MatrixElement): string {
    let cursor = 0;
    while (true) {
      cursor = eqString.indexOf(matStr);
      if (cursor == -1) {
        break;
      }
      try {
        const { startCursor: eStart, endCursor: eEnd } = _findBrackets(eqString, cursor, 1);
        const elem = replaceElementsOfMatrix(eqString.slice(eStart, eEnd));

        let beforeMat, afterMat;
        if (matElem.removeOutterBrackets) {
          const { startCursor: bStart, endCursor: bEnd } = _findOutterBrackets(eqString, cursor);
          beforeMat = eqString.slice(0, bStart);
          afterMat = eqString.slice(bEnd);
        } else {
          beforeMat = eqString.slice(0, cursor);
          afterMat = eqString.slice(eEnd);
        }

        eqString = `${beforeMat}${matElem.begin}${elem}${matElem.end}${afterMat}`;
      } catch {
        return eqString;
      }
    }
    return eqString;
  }

  for (const [matKey, matElem] of Object.entries(matDict)) {
    eqString = replaceMatrix(eqString, matKey, matElem);
  }
  return eqString;
}

function replaceRootOf(eqString: string): string {
  /*
   * `root {1} of {2}` -> `\sqrt[1]{2}`
   */

  const rootStr = 'root';
  const ofStr = 'of';

  while (true) {
    const rootCursor = eqString.indexOf(rootStr);
    if (rootCursor === -1) {
      break;
    }
    try {
      const ofCursor = eqString.indexOf(ofStr);

      const elem1 = _findBrackets(eqString, rootCursor, 1);
      const elem2 = _findBrackets(eqString, ofCursor, 1);

      const e1 = eqString.substring(elem1.startCursor + 1, elem1.endCursor - 1);
      const e2 = eqString.substring(elem2.startCursor + 1, elem2.endCursor - 1);

      eqString =
        eqString.substring(0, rootCursor) +
        '\\sqrt' +
        '[' +
        e1 +
        ']' +
        '{' +
        e2 +
        '}' +
        eqString.substring(elem2.endCursor + 1);
    } catch {
      return eqString;
    }
  }
  return eqString;
}

function replaceFrac(eqString: string): string {
  /*
   * `{1} over {2}` -> `\frac{1}{2}`
   */
  const hmlFracString = 'over';
  const latexFracString = '\\frac';

  while (true) {
    const cursor = eqString.indexOf(hmlFracString);

    if (cursor === -1) {
      break;
    }
    try {
      // find numerator
      const {
        startCursor: numStart,
        endCursor: numEnd,
      } = _findBrackets(eqString, cursor, 0);
      const numerator = eqString.substring(numStart, numEnd);

      const beforeFrac = eqString.substring(0, numStart);
      const afterFrac = eqString.substring(cursor + hmlFracString.length);

      eqString = beforeFrac + latexFracString + numerator + afterFrac;
    } catch {
      return eqString;
    }
  }
  return eqString;
}

function replaceAllBrace(eqString: string): string {
  /**
   * replace (over, under)brace equation string.
   */
  function replaceBrace(eqString: string, braceStr: string, braceElem: string): string {
    let cursor = 0;

    while (true) {
      cursor = eqString.indexOf(braceStr, cursor);
      if (cursor == -1) {
        break;
      }
      try {
        const {
          startCursor: eStart1,
          endCursor: eEnd1,
        } = _findBrackets(eqString, cursor, 1);
        const {
          startCursor: eStart2,
          endCursor: eEnd2,
        } = _findBrackets(eqString, eEnd1, 1);
        const elem1 = eqString.substring(eStart1, eEnd1);
        const elem2 = eqString.substring(eStart2, eEnd2);

        const beforeBrace = eqString.substring(0, cursor);
        const afterBrace = eqString.substring(eEnd2);

        eqString = beforeBrace + braceElem + elem1 + '^' + elem2 + afterBrace;
      } catch (error) {
        return eqString;
      }
    }
    return eqString;
  }

  for (const [braceKey, braceElem] of Object.entries(braceDict)) {
    eqString = replaceBrace(eqString, braceKey, braceElem);
  }
  return eqString;
}

export {
  replaceAllBar,
  replaceAllMatrix,
  replaceRootOf,
  replaceFrac,
  replaceAllBrace,
};
