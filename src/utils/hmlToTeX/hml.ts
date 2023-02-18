export interface HMLJSON {
  HWPML: {
    HEAD: any,
    BODY: {
      SECTION: {
        // key must be 'P' | 'TEXT' | 'CHAR' | 'EQUATION' | 'SCRIPT'
        [key: string]: any
      }
    }
  }
}

// interface HMLEquation {
//   SCRIPT: string,
// }
