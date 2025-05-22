# Soma People Web

소프트웨어 마에스트로 수료생, 연수생, 준비생, 멘토를 위한 커뮤니티입니다.
모든 코드는 직접 작성하였으며 AI를 이용하지 않았습니다. (ChatGPT 등장 이전 완성)
Flutter 기반의 웹뷰상에서 주로 동작하며 웹브라우저에서도 접근 가능합니다.

## 💻 이 프로젝트를 진행한 이유

이 프로젝트는 프론트엔드 심화 공부 및 웹뷰상에서 동작하는 프론트 서비스에 대해 깊게 파보고 싶어 처음부터 끝까지 혼자 진행한 개인프로젝트입니다.

뿐만아니라 서비스 개발 전반에 대한 이해를 심화시키고 싶어 앱(Flutter), 백엔드(Spring Boot), 인프라(AWS, Github Actions)까지 모두 개발해보며 이해도를 높였습니다.

실제 서비스까지 하였고 23. 02. ~ 24. 10. 동안 약 1,000명의 이용자를 받고 개선하면서 공부하는 과정을 거쳤습니다. (이후 군대 + 비용 문제로 종료)

## 🎯 프로젝트 목표

이 프로젝트는 소프트웨어 마에스트로 커뮤니티의 효율적인 소통과 정보 공유를 위한 플랫폼을 제공합니다. 특히 다음과 같은 문제들을 해결하고자 합니다:

- 커뮤니티 멤버들 간의 효율적인 소통
- 정보의 체계적인 관리와 검색
- 모바일과 데스크톱 환경에서의 최적화된 사용자 경험
- 안정적이고 확장 가능한 코드베이스 유지

## 🛠 기술 스택

- **프레임워크**: Next.js 13.1.6
- **언어**: TypeScript 4.9.5
- **상태 관리**: Zustand, React Query
- **스타일링**: TailwindCSS, Material-UI
- **인증**: NextAuth.js

## 🔧 트러블슈팅

프로젝트 진행 중 마주친 주요 기술적 문제들과 해결 과정을 기록했습니다:

1. [React-Query를 이용해 No-Offset 방식의 무한스크롤 기능을 구현했습니다.](https://kbwplace.tistory.com/178)
   - 기존 offset 방식의 한계를 극복하기 위해 No-Offset 방식 도입
   - React-Query의 캐싱 기능을 활용한 성능 최적화
   - 스크롤 위치 기억 기능 구현

2. [React-Query의 useMutation을 커스텀 훅으로 만들어 기능에 따라 모듈화시키고 독립성을 높혔습니다.](https://kbwplace.tistory.com/177)
   - 재사용 가능한 mutation 로직 분리
   - 타입 안정성 강화
   - 에러 처리 표준화

3. [webview 양방향 통신을 구현했습니다.](https://kbwplace.tistory.com/176)
   - Flutter 웹뷰와의 효율적인 통신 구현
   - 이벤트 기반 메시지 처리
   - 타입 안정성 확보

## 💡 주요 기술적 특징

### 1. TypeScript를 활용한 견고한 타입 시스템

- 엄격한 타입 체크를 통한 런타임 에러 방지
- 명확한 인터페이스 정의와 타입 추론
- API 응답 타입의 체계적인 관리
```typescript
// storeTypes.ts
export interface UserInfo {
  userId: number;
  isCertified: boolean;
  // ...
}

// API 응답 타입
export interface MainPagePostListInfoType {
  recentPostList: PostInfoType[];
  freePostList: PostInfoType[];
  applicantPostList: PostInfoType[];
}
```

### 2. 모듈화된 컴포넌트 아키텍처

- 관심사 분리를 통한 명확한 디렉토리 구조
- 재사용 가능한 컴포넌트 설계
- 일관된 네이밍 컨벤션
```
components/
├── common/     # 재사용 가능한 컴포넌트
├── layout/     # 레이아웃 관련 컴포넌트
└── tag/        # 태그 관련 컴포넌트
```

### 3. 성능 최적화

- React Query를 활용한 효율적인 데이터 페칭
- 이미지 최적화 (Next.js Image 컴포넌트)
- 조건부 렌더링을 통한 불필요한 리렌더링 방지
- 스크롤 위치 유지 기능

### 4. 코드 품질 관리

- ESLint와 Prettier를 통한 일관된 코드 스타일
- Husky와 lint-staged를 활용한 Git 훅 설정
- TypeScript strict 모드 활성화

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "prettier --write",
      "eslint --fix"
    ]
  }
}
```

### 5. 확장 가능한 상태 관리

- Zustand를 활용한 전역 상태 관리
- React Query를 통한 서버 상태 관리
- 커스텀 훅을 통한 비즈니스 로직 분리

## 🚀 차별화된 기술적 성과

### 1. 효율적인 무한 스크롤 구현

- 스크롤 위치 기억 기능
- 최적화된 데이터 페칭
- 부드러운 사용자 경험

### 2. 모바일 최적화

- 반응형 디자인
- 모바일 퍼스트 접근
- 터치 인터랙션 최적화

### 3. 보안 강화

- NextAuth.js를 통한 안전한 인증
- API 요청 검증
- 권한 기반 접근 제어

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

## 🔍 코드 품질 관리

- ESLint와 Prettier를 통한 코드 스타일 통일
- TypeScript strict 모드로 타입 안정성 확보
- Git 훅을 통한 자동화된 코드 검사

## 🎨 실제 구현

### 크로스 플랫폼 접근성
![크로스 플랫폼 접근성](https://kbwportfolio.notion.site/image/attachment%3Ab53f13f6-1bf7-47b3-86fb-31a0d620c40b%3Aimage.png?table=block&id=1d41b47a-3bd0-8048-a13b-c0d406684d0e&spaceId=0ec83f0d-0bf0-4877-bb09-68a1391c59b3&width=2000&userId=&cache=v2)

- 커뮤니티의 목적 상 최대한 다양한 디바이스에서 쉽게 접근할 수 있어야하기 때문에 웹 기반으로 개발하게 되었습니다.
    - **반응형 웹** 기반으로 퍼블리싱 하였고 앱에서는 **웹뷰**를 통해 네이티브 기능(알림 등)에 접근할 수 있도록 하였습니다.
    - 데스크탑에서도 웹으로 접근할 수 있습니다.

### 사용자 권한 기반 게시판 접근
![사용자 권한 기반 게시판 접근](https://kbwportfolio.notion.site/image/attachment%3A780691a6-715d-4103-abb3-3f8344056def%3A0413221309524851.jpg?table=block&id=1d41b47a-3bd0-80b5-9bda-fa6929a875ee&spaceId=0ec83f0d-0bf0-4877-bb09-68a1391c59b3&width=2000&userId=&cache=v2)

- 연수생, 수료생, 멘토, 준비생 - 유저 구분에 따라 접근할 수 있는 게시판이 달라집니다.

### 자유로운 소통과 알림 시스템
![자유로운 소통과 알림 시스템](https://kbwportfolio.notion.site/image/attachment%3Acbf1e2ac-c3d2-4b8a-89d7-b48c52cf0e9b%3A0416151114411424.jpg?table=block&id=1d71b47a-3bd0-8075-80c7-de57dc74b497&spaceId=0ec83f0d-0bf0-4877-bb09-68a1391c59b3&width=2000&userId=&cache=v2)

- 사용자는 익명으로도 작성할 수 있으며 대댓글을 통해 자유롭게 소통할 수 있습니다.
- 작성한 글에 달린 댓글, 대댓글, 공지사항 등을 알림탭에서 모아볼 수 있으며 푸시 알림으로 알림이 갑니다.
