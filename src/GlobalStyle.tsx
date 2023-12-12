import { createGlobalStyle } from 'styled-components';
import HYHwpEQ_Partial from './assets/fonts/HYHWPEQ.woff';

import lmBold from './assets/fonts/latinmodernroman_10bold_macroman/lmroman10-bold-webfont.woff';
import lmBoldItalic from './assets/fonts/latinmodernroman_10bolditalic_macroman/lmroman10-bolditalic-webfont.woff';
import lmItalic from './assets/fonts/latinmodernroman_10italic_macroman/lmroman10-italic-webfont.woff';
import lmRegular from './assets/fonts/latinmodernroman_10regular_macroman/lmroman10-regular-webfont.woff';
import lmCapsOblique from './assets/fonts/latinmodernromancaps_10oblique_macroman/lmromancaps10-oblique-webfont.woff';
import lmCapsRegular from './assets/fonts/latinmodernromancaps_10regular_macroman/lmromancaps10-regular-webfont.woff';
import lmDemiBold from './assets/fonts/latinmodernroman_10bold_macroman/lmroman10-bold-webfont.woff';
import lmDemiRegular from './assets/fonts/latinmodernromandemi_10regular_macroman/lmromandemi10-regular-webfont.woff';
import lmDunhillOblique from './assets/fonts/latinmodernromandunhill_10oblique_macroman/lmromandunh10-oblique-webfont.woff';
import lmDunhillRegular from './assets/fonts/latinmodernromandunhill_10regular_macroman/lmromandunh10-regular-webfont.woff';
import lmSlanted from './assets/fonts/latinmodernromanslanted_10regular_macroman/lmromanslant10-regular-webfont.woff';
import lmSlantedBold from './assets/fonts/latinmodernromanslanted_10bold_macroman/lmromanslant10-bold-webfont.woff';

import lmMath from './assets/fonts/latinmodern-math.woff';

import kopubWorldBatangBold from './assets/fonts/KoPubWorld-Batang-Bold.woff';
import kopubWorldBatangMedium from './assets/fonts/KoPubWorld-Batang-Medium.woff';
import kopubWorldBatangLight from './assets/fonts/KoPubWorld-Batang-Light.woff';


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

  @font-face {
    font-family: "Computer Modern";
    src: url('http://mirrors.ctan.org/fonts/cm-unicode/fonts/otf/cmunss.otf');
  }
  @font-face {
    font-family: "Computer Modern";
    src: url('http://mirrors.ctan.org/fonts/cm-unicode/fonts/otf/cmunsx.otf');
    font-weight: bold;
  }
  @font-face {
    font-family: "Computer Modern";
    src: url('http://mirrors.ctan.org/fonts/cm-unicode/fonts/otf/cmunsi.otf');
    font-style: italic, oblique;
  }
  @font-face {
    font-family: "Computer Modern";
    src: url('http://mirrors.ctan.org/fonts/cm-unicode/fonts/otf/cmunbxo.otf');
    font-weight: bold;
    font-style: italic, oblique;
  }

  @font-face {
    font-family: 'HYHwpEQ_Partial';
    src: url(${HYHwpEQ_Partial}) format('woff');
    font-weight: normal;
    font-style: normal;
    /* unicode-range: U+E09D-E0C4, U+E0E5-E0FE; */
    unicode-range: U+E09D-E0C4;
  }

  @font-face {
    font-family: 'HYHwpEQ_Partial_Print';
    src: url(${HYHwpEQ_Partial}) format('woff');
    font-weight: normal;
    font-style: normal;
    /* unicode-range: U+E09D-E0C4, U+E0E5-E0FE; */
    unicode-range: U+E09D-E0C4;
  }


  @font-face {
    font-family: 'Latin Modern Roman';
    src: url(${lmBold}) format('woff');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'Latin Modern Roman';
    src: url(${lmBoldItalic}) format('woff');
    font-weight: bold;
    font-style: italic;
  }

  @font-face {
    font-family: 'Latin Modern Roman';
    src: url(${lmItalic}) format('woff');
    font-weight: normal;
    font-style: italic;
  }

  @font-face {
    font-family: 'Latin Modern Roman';
    src: url(${lmRegular}) format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Latin Modern Roman Caps';
    src: url(${lmCapsOblique}) format('woff');
    font-weight: normal;
    font-style: oblique;
  }

  @font-face {
    font-family: 'Latin Modern Roman Caps';
    src: url(${lmCapsRegular}) format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Latin Modern Roman Demi';
    src: url(${lmDemiRegular}) format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Latin Modern Roman Demi';
    src: url(${lmDemiBold}) format('woff');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'Latin Modern Roman Dunhill';
    src: url(${lmDunhillOblique}) format('woff');
    font-weight: normal;
    font-style: oblique;
  }

  @font-face {
    font-family: 'Latin Modern Roman Dunhill';
    src: url(${lmDunhillRegular}) format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Latin Modern Roman Slanted';
    src: url(${lmSlantedBold}) format('woff');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'Latin Modern Roman Slanted';
    src: url(${lmSlanted}) format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Latin Modern Math';
    src: url(${lmMath}) format('woff');
  }

  @font-face {
    font-family: 'KoPubWorld Batang';
    src: local('KoPubWorld Batang'), local('KoPubWorldBatang'), url(${kopubWorldBatangBold}) format('woff');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'KoPubWorld Batang';
    src: local('KoPubWorld Batang'), local('KoPubWorldBatang'), url(${kopubWorldBatangMedium}) format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'KoPubWorld Batang';
    src: local('KoPubWorld Batang'), local('KoPubWorldBatang'), url(${kopubWorldBatangLight}) format('woff');
    font-weight: 300;
    font-style: normal;
  }
  font-family: 'Pretendard';
`;

export default GlobalStyle;
