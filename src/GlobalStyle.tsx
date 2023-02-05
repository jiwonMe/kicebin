import { createGlobalStyle } from 'styled-components';
import SM신명조03 from './assets/SM3신명조-03.woff';
import SM3중명조 from './assets/SM3중명조.woff';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'KBIZHanmaumMyungjo';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/KBIZHanmaumMyungjo.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'MaruBuri';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/MaruBuri-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'SM신명조03';
    src: local('SM신명조03'), local('SM신명조03');
    font-style: normal;
    src: url(${SM신명조03}) format('woff');
  }

  @font-face {
    font-family: 'SM3중명조';
    src: local('SM3중명조'), local('SM3중명조');
    font-style: normal;
    src: url(${SM3중명조}) format('woff');
  }

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'D2Coding';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_three@1.0/D2Coding.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  font-family: 'Pretendard-Regular';
`;

export default GlobalStyle;
