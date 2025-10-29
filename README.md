# 구글 캘린더 에이전트 - Frontend

React + TypeScript로 구축된 구글 캘린더 작성 에이전트 애플리케이션의 프론트엔드입니다.

## 기술 스택

- **React 18+** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구
- **Tailwind CSS** - 스타일링
- **React Router** - 라우팅
- **Zustand** - 상태 관리
- **React Query (TanStack Query)** - 서버 상태 관리
- **React Hook Form + Zod** - 폼 관리 및 검증
- **Axios** - HTTP 클라이언트
- **date-fns** - 날짜 처리
- **Lucide React** - 아이콘
- **Jest + React Testing Library** - 테스팅

## 주요 기능

- ✅ 사용자 인증 (로그인/회원가입)
- ✅ 구글 캘린더 연동
- ✅ 캘린더 이벤트 CRUD
- ✅ AI 에이전트를 통한 자연어 이벤트 생성
- ✅ 월간/주간/일간 캘린더 뷰
- ✅ 반응형 디자인
- ✅ 실시간 이벤트 동기화
- ✅ 에러 핸들링 및 로딩 상태

## 시작하기

### 필수 요구사항

- Node.js 20 이상
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일을 열어 필요한 값들을 설정하세요
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

### 테스트

```bash
# 테스트 실행
npm test

# watch 모드로 테스트
npm run test:watch
```

### 린팅

```bash
npm run lint
```

## 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── auth/           # 인증 관련 컴포넌트
│   ├── calendar/       # 캘린더 관련 컴포넌트
│   ├── layout/         # 레이아웃 컴포넌트
│   └── ui/             # 기본 UI 컴포넌트
├── hooks/              # 커스텀 React hooks
├── lib/                # 유틸리티 및 라이브러리 설정
├── pages/              # 페이지 컴포넌트
├── store/              # Zustand 스토어
├── types/              # TypeScript 타입 정의
├── __tests__/          # 테스트 파일
├── App.tsx             # 메인 앱 컴포넌트
└── main.tsx            # 진입점
```

## 환경 변수

다음 환경 변수를 `.env` 파일에 설정하세요:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_APP_NAME=구글 캘린더 에이전트
```

## Docker 실행

### Docker로 빌드 및 실행

```bash
# 이미지 빌드
docker build -t calendar-agent-frontend .

# 컨테이너 실행
docker run -p 3000:80 calendar-agent-frontend
```

### Docker Compose 사용

```bash
# 전체 스택 실행 (프론트엔드 + 백엔드)
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 중지
docker-compose down
```

## API 통합

백엔드 API와의 통합을 위해 `src/lib/api.ts`에서 API 엔드포인트를 정의합니다.

주요 API 모듈:
- `authApi` - 인증 관련 API
- `eventsApi` - 캘린더 이벤트 API
- `aiApi` - AI 에이전트 API
- `googleCalendarApi` - 구글 캘린더 연동 API

## 상태 관리

### Zustand Stores

- `authStore` - 사용자 인증 상태
- `calendarStore` - 캘린더 뷰 및 선택 상태

### React Query

서버 데이터는 React Query를 통해 관리되며, 자동 캐싱, 리페칭, 낙관적 업데이트를 지원합니다.

## 컴포넌트 가이드

### UI 컴포넌트

- `Button` - 다양한 variant와 크기를 지원하는 버튼
- `Input` - 폼 입력 필드
- `Modal` - 모달 다이얼로그
- `Card` - 카드 컨테이너
- `Alert` - 알림 메시지
- `Spinner` - 로딩 스피너

### 캘린더 컴포넌트

- `CalendarHeader` - 캘린더 헤더 (날짜 네비게이션, 뷰 전환)
- `MonthView` - 월간 캘린더 뷰
- `EventForm` - 이벤트 생성/수정 폼
- `AIEventCreator` - AI 기반 이벤트 생성 UI

## 베스트 프랙티스

- ✅ TypeScript strict 모드 사용
- ✅ 컴포넌트 분리 및 재사용성
- ✅ Custom hooks를 통한 로직 분리
- ✅ React Query를 통한 서버 상태 관리
- ✅ Zod를 통한 런타임 검증
- ✅ Error Boundary를 통한 에러 처리
- ✅ 반응형 디자인 (모바일 우선)
- ✅ 접근성 고려

## 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 라이센스

MIT License

## 지원

문제가 발생하거나 질문이 있으시면 이슈를 생성해주세요.
