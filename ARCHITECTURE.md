# 아키텍처 문서

## 개요

구글 캘린더 에이전트는 React + TypeScript 기반의 현대적인 웹 애플리케이션입니다. 
AI를 활용하여 자연어로 캘린더 이벤트를 생성하고 관리할 수 있습니다.

## 기술 스택

### 프론트엔드 프레임워크
- **React 18+**: 사용자 인터페이스 구축
- **TypeScript**: 타입 안정성 및 개발자 경험 향상
- **Vite**: 빠른 개발 서버 및 빌드 도구

### 상태 관리
- **Zustand**: 클라이언트 전역 상태 관리 (인증, 캘린더 상태)
- **React Query**: 서버 상태 관리, 캐싱, 동기화

### UI & 스타일링
- **Tailwind CSS**: 유틸리티 퍼스트 CSS 프레임워크
- **Lucide React**: 모던한 아이콘 라이브러리
- **date-fns**: 날짜 처리 및 포맷팅

### 폼 & 검증
- **React Hook Form**: 효율적인 폼 관리
- **Zod**: 스키마 기반 런타임 검증

### 네트워킹
- **Axios**: HTTP 클라이언트 및 인터셉터

### 라우팅
- **React Router v6**: SPA 라우팅

### 테스팅
- **Jest**: 테스트 러너
- **React Testing Library**: 컴포넌트 테스팅

## 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── auth/           # 인증 관련 (ProtectedRoute)
│   ├── calendar/       # 캘린더 뷰 및 이벤트 관리
│   ├── layout/         # 레이아웃 컴포넌트 (Header, Layout)
│   └── ui/             # 기본 UI 컴포넌트 (Button, Input, Modal 등)
├── hooks/              # 커스텀 React hooks
│   ├── useAuth.ts      # 인증 관련 로직
│   ├── useEvents.ts    # 이벤트 CRUD
│   └── useAI.ts        # AI 기능
├── lib/                # 라이브러리 설정
│   ├── api.ts          # API 엔드포인트 정의
│   └── axios.ts        # Axios 인스턴스 설정
├── pages/              # 페이지 컴포넌트
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   ├── DashboardPage.tsx
│   └── NotFoundPage.tsx
├── store/              # Zustand 스토어
│   ├── authStore.ts    # 인증 상태
│   └── calendarStore.ts # 캘린더 상태
├── types/              # TypeScript 타입 정의
│   └── index.ts        # 공통 타입
├── utils/              # 유틸리티 함수
│   ├── date.ts         # 날짜 관련 헬퍼
│   ├── validation.ts   # 검증 함수
│   └── errors.ts       # 에러 처리
└── __tests__/          # 테스트 파일
```

## 데이터 흐름

### 1. 인증 플로우

```
사용자 입력 (LoginPage)
    ↓
useAuth hook
    ↓
authApi.login()
    ↓
Axios (with interceptors)
    ↓
Backend API
    ↓
Response 처리
    ↓
authStore 업데이트
    ↓
localStorage 저장
    ↓
Dashboard로 리다이렉트
```

### 2. 이벤트 관리 플로우

```
사용자 액션 (DashboardPage)
    ↓
useEvents hook
    ↓
React Query mutation
    ↓
eventsApi.createEvent()
    ↓
Backend API
    ↓
Optimistic Update
    ↓
Cache Invalidation
    ↓
UI 자동 업데이트
```

### 3. AI 이벤트 생성 플로우

```
자연어 입력 (AIEventCreator)
    ↓
useAI hook
    ↓
aiApi.createEventFromPrompt()
    ↓
Backend AI Service
    ↓
이벤트 제안 받기
    ↓
사용자 확인
    ↓
이벤트 생성
```

## 주요 컴포넌트

### UI 컴포넌트 (Atomic Design)

#### Atoms (기본 빌딩 블록)
- `Button`: 다양한 variant를 지원하는 버튼
- `Input`: 폼 입력 필드
- `Spinner`: 로딩 인디케이터
- `Alert`: 알림 메시지

#### Molecules (조합된 컴포넌트)
- `Card`: 카드 컨테이너
- `Modal`: 모달 다이얼로그

#### Organisms (복잡한 컴포넌트)
- `Header`: 네비게이션 헤더
- `EventForm`: 이벤트 생성/수정 폼
- `AIEventCreator`: AI 이벤트 생성 UI
- `MonthView/WeekView/DayView`: 캘린더 뷰

## 상태 관리 전략

### 클라이언트 상태 (Zustand)
- 인증 정보 (user, token)
- 캘린더 뷰 설정 (currentDate, view)
- UI 상태 (모달 열림/닫힘)

### 서버 상태 (React Query)
- 이벤트 목록
- 사용자 정보
- AI 응답

**왜 분리했는가?**
- 클라이언트 상태: 앱 내부 UI 상태, 빠른 접근 필요
- 서버 상태: 동기화 필요, 캐싱 및 리페칭 지원

## API 통합

### Axios 인터셉터

#### Request Interceptor
```typescript
- 모든 요청에 JWT 토큰 자동 추가
- 헤더 설정
```

#### Response Interceptor
```typescript
- 401 에러 시 자동 로그아웃
- 에러 응답 정규화
```

### API 모듈

- `authApi`: 로그인, 회원가입, 로그아웃
- `eventsApi`: 이벤트 CRUD
- `aiApi`: AI 이벤트 생성
- `googleCalendarApi`: 구글 캘린더 동기화

## 보안

### 인증 & 권한
- JWT 기반 인증
- localStorage에 토큰 저장
- ProtectedRoute로 인증된 사용자만 접근 가능

### XSS 방지
- React의 기본 XSS 방지 (자동 이스케이핑)
- sanitizeInput 유틸리티 함수

### CORS
- 백엔드에서 허용된 origin만 접근 가능

## 성능 최적화

### 코드 분할
- React.lazy를 통한 페이지 레벨 분할 (향후 구현 예정)

### 캐싱
- React Query 자동 캐싱 (5분)
- 낙관적 업데이트

### 메모이제이션
- useMemo로 계산 비용이 큰 작업 최적화
- useCallback으로 함수 재생성 방지

## 에러 처리

### 전역 에러 경계
- ErrorBoundary 컴포넌트로 React 에러 캐치
- 사용자 친화적인 에러 메시지 표시

### API 에러
- Axios 인터셉터로 중앙 집중식 에러 처리
- 사용자에게 의미 있는 에러 메시지 전달

## 테스팅 전략

### 단위 테스트
- 유틸리티 함수 테스트
- 커스텀 hook 테스트

### 컴포넌트 테스트
- UI 컴포넌트 렌더링 테스트
- 사용자 상호작용 테스트

### 통합 테스트
- API 통합 테스트
- 전체 플로우 테스트

## 배포

### Docker
- Multi-stage 빌드로 최적화된 이미지
- Nginx로 정적 파일 서빙
- 환경 변수 주입

### CI/CD
- GitHub Actions (향후 구현 예정)
- 자동 테스트 및 빌드
- 자동 배포

## 향후 개선 사항

1. **성능**
   - 코드 분할 확대
   - 이미지 최적화
   - Service Worker (PWA)

2. **기능**
   - 오프라인 지원
   - 실시간 동기화 (WebSocket)
   - 알림 기능

3. **테스트**
   - E2E 테스트 (Playwright)
   - 시각적 회귀 테스트

4. **접근성**
   - ARIA 레이블 강화
   - 키보드 네비게이션 개선
   - 스크린 리더 최적화

5. **국제화**
   - i18n 지원
   - 다국어 지원

## 참고 자료

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Query](https://tanstack.com/query/latest)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com)
