
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
