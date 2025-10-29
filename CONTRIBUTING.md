# 기여 가이드

구글 캘린더 에이전트 프로젝트에 기여해 주셔서 감사합니다!

## 개발 환경 설정

1. 저장소를 포크하고 클론합니다:
```bash
git clone https://github.com/YOUR_USERNAME/calendar-agent-frontend.git
cd calendar-agent-frontend
```

2. 의존성을 설치합니다:
```bash
npm install
```

3. 환경 변수를 설정합니다:
```bash
cp .env.example .env
# .env 파일을 편집하여 필요한 값들을 설정하세요
```

4. 개발 서버를 실행합니다:
```bash
npm run dev
```

## 코드 스타일

- ESLint와 Prettier를 사용하여 코드 스타일을 유지합니다
- 커밋 전에 `npm run lint`를 실행하여 린트 오류를 확인하세요
- TypeScript strict 모드를 준수하세요

## 커밋 메시지 규칙

의미 있는 커밋 메시지를 작성해주세요:

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅, 세미콜론 누락 등
refactor: 코드 리팩토링
test: 테스트 추가/수정
chore: 빌드 프로세스, 도구 설정 등
```

## 풀 리퀘스트 프로세스

1. 새로운 브랜치를 생성합니다:
```bash
git checkout -b feature/your-feature-name
```

2. 변경사항을 커밋합니다:
```bash
git commit -m "feat: add your feature"
```

3. 브랜치를 푸시합니다:
```bash
git push origin feature/your-feature-name
```

4. Pull Request를 생성합니다

## 테스트

새로운 기능을 추가할 때는 테스트도 함께 작성해주세요:

```bash
npm test
```

## 질문이나 도움이 필요하신가요?

이슈를 생성하거나 토론에 참여해주세요!
