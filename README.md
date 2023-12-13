# KICEditor

KICEditor는 문제집을 만들고 관리할 수 있는 웹 기반 편집기입니다. 사용자 친화적인 인터페이스와 다양한 기능을 제공하여 문제집 제작을 간편하게 도와줍니다.

## TODOS

- [ ] UI 컴포넌트 관심사 분리
- [ ] 상태관리 로직 리팩토링
- [ ] 문제집 편집기 리팩토링

- [ ] **어드민 페이지** 개발

- [ ] 디자인 변경


## 주요 기능

- 문제집 생성, 편집 및 삭제
- 문제집 목록 관리
- 인쇄용 레이아웃 뷰어
- 다양한 문제 유형 지원
- 사용자 계정 관리

## 기술 스택

KICEditor는 다음과 같은 기술 스택을 사용하여 개발되었습니다:

### 프론트엔드
- **React**: 사용자 인터페이스 구축을 위한 JavaScript 라이브러리
- **TypeScript**: JavaScript에 타입을 추가하여 안정성을 높이는 언어
- **Styled Components**: 컴포넌트 스타일링을 위한 CSS-in-JS 라이브러리
- **KaTeX**: 수학적 표현을 위한 렌더링 라이브러리

#### 상태관리
- **Zustand**: 상태 관리 라이브러리

### 백엔드
- **Firebase**: 사용자 인증, 데이터베이스 관리 및 호스팅을 위한 플랫폼

### 개발 도구
- **pnpm**: 효율적인 패키지 관리를 위한 빠른 고성능 Node.js 패키지 매니저
- **Vite**: 프론트엔드 도구로, 빠른 핫 모듈 교체(HMR)와 빌드 기능을 제공


## 설치 및 실행

KICEditor를 설치하고 실행하기 위해서는 다음과 같은 사전 준비가 필요합니다:

- Node.js 14 이상
- pnpm (`npm install -g pnpm`)
- Firebase 프로젝트
- Firebase CLI (`npm install -g firebase-tools`)
- Firebase Admin SDK 키 파일
- Firebase Admin SDK 키 파일 경로를 저장한 환경 변수 `GOOGLE_APPLICATION_CREDENTIALS`
- Firebase 프로젝트의 `firestore.rules` 파일에 다음과 같은 규칙 추가:

```firebase
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /books/{bookId} {
      allow read, write: if request.auth.uid == resource.data.owner;
    }
  }
}
```

- `.env.example` 파일과 같은 형식으로 `.env` 파일 생성

위 사전 준비가 완료되면 다음과 같은 명령어를 실행하여 KICEditor를 설치하고 실행할 수 있습니다:

```bash
git clone git@github.com:jiwonMe/kicebin.git
cd kiceditor
pnpm install
pnpm run dev
```

- google login 정책에 따라 `127.0.0.1`을 `localhost`로 변경해야 합니다.

## 현재 존재하는 문제점들

- firebase를 백엔드로 사용하고 있으나, 정확한 데이터 모델링을 하지 않고 있음
- 적절한 admin 페이지가 없음
- 사용하지 않는 코드들과 의존성이 존재함
- 적절한 에러핸들링이 일어나지 않고 있음
- 중복된 Styled component 스타일들이 많음
- 관심자 분리(Separation of Concerns)가 제대로 이루어지지 않음