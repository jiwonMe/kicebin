import convertMap from './convertMap.json';
import {
  replaceFrac,
  replaceRootOf,
  replaceAllMatrix,
  replaceAllBar,
  replaceAllBrace,
} from './hulkReplaceMethod';

function hmlEquation2latex(hmlEqStr: string): string {
  /**
   * Convert hmlEquation string to latex string.
   *
   * @param hmlEqStr - A hml equation string to be converted.
   * @returns A converted latex string.
   */
  function replaceBracket(strList: string[]): string[] {
    /**
     * "\left {"  -> "\left \{"
     * "\right }" -> "\right \}"
     */
    for (let i = 0; i < strList.length; i++) {
      const string = strList[i];
      if (string === '{') {
        if (i > 0 && strList[i - 1] === '\\left') {
          strList[i] = '\\{';
        }
      }
      if (string === '}') {
        if (i > 0 && strList[i - 1] === '\\right') {
          strList[i] = '\\}';
        }
      }
    }
    return strList;
  }

  let strConverted = hmlEqStr.replace('`', ' ');
  strConverted = strConverted.replace('{', ' { ');
  strConverted = strConverted.replace('}', ' } ');
  strConverted = strConverted.replace('&', ' & ');

  let strList = strConverted.split(' ');

  for (let key = 0; key < strList.length; key++) {
    const candidate = strList[key];
    if (candidate in convertMap.convertMap) {
      strList[key] = (convertMap.convertMap as any)[candidate];
    } else if (candidate in convertMap.middleConvertMap) {
      strList[key] = (convertMap.middleConvertMap as any)[candidate];
    }
  }

  strList = strList.filter((string) => string.length !== 0);
  strList = replaceBracket(strList);

  strConverted = strList.join(' ');

  strConverted = replaceFrac(strConverted);
  strConverted = replaceRootOf(strConverted);
  strConverted = replaceAllMatrix(strConverted);
  strConverted = replaceAllBar(strConverted);
  strConverted = replaceAllBrace(strConverted);

  return strConverted;
}

export default hmlEquation2latex;
