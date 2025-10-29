# 배포 가이드

이 문서는 구글 캘린더 에이전트 프론트엔드를 다양한 플랫폼에 배포하는 방법을 설명합니다.

## 목차

- [Docker를 이용한 배포](#docker를-이용한-배포)
- [Vercel 배포](#vercel-배포)
- [Netlify 배포](#netlify-배포)
- [AWS S3 + CloudFront 배포](#aws-s3--cloudfront-배포)
- [환경 변수 설정](#환경-변수-설정)

## Docker를 이용한 배포

### 1. 이미지 빌드

```bash
docker build -t calendar-agent-frontend .
```

### 2. 컨테이너 실행

```bash
docker run -d -p 3000:80 \
  -e VITE_API_BASE_URL=https://api.example.com \
  -e VITE_GOOGLE_CLIENT_ID=your-client-id \
  --name calendar-frontend \
  calendar-agent-frontend
```

### 3. Docker Compose 사용

```bash
# 환경 변수를 .env 파일에 설정
docker-compose up -d
```

## Vercel 배포

### 방법 1: Vercel CLI

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### 방법 2: Git 연동

1. GitHub 저장소를 Vercel에 연결
2. 프로젝트 설정에서 Framework Preset을 "Vite" 선택
3. 환경 변수 설정
4. 배포

### 환경 변수 설정 (Vercel)

Vercel Dashboard > Project Settings > Environment Variables에서 설정:

- `VITE_API_BASE_URL`
- `VITE_GOOGLE_CLIENT_ID`
- `VITE_APP_NAME`

## Netlify 배포

### netlify.toml 생성

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 배포

```bash
# Netlify CLI 설치
npm i -g netlify-cli

# 배포
netlify deploy --prod
```

## AWS S3 + CloudFront 배포

### 1. 빌드

```bash
npm run build
```

### 2. S3 버킷에 업로드

```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

### 3. CloudFront 캐시 무효화

```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## 환경 변수 설정

배포 전에 다음 환경 변수를 설정해야 합니다:

| 변수명 | 설명 | 필수 | 예시 |
|--------|------|------|------|
| VITE_API_BASE_URL | 백엔드 API URL | ✅ | https://api.example.com |
| VITE_GOOGLE_CLIENT_ID | 구글 OAuth 클라이언트 ID | ✅ | xxx.apps.googleusercontent.com |
| VITE_APP_NAME | 앱 이름 | ❌ | 구글 캘린더 에이전트 |

## 프로덕션 체크리스트

배포 전 확인 사항:

- [ ] 환경 변수가 올바르게 설정되었는지 확인
- [ ] API 엔드포인트가 프로덕션 환경을 가리키는지 확인
- [ ] 빌드가 성공적으로 완료되는지 확인 (`npm run build`)
- [ ] 린트 검사 통과 (`npm run lint`)
- [ ] 테스트 통과 (`npm test`)
- [ ] HTTPS 활성화 확인
- [ ] CORS 설정 확인

## 성능 최적화

배포된 애플리케이션의 성능을 향상시키기 위한 팁:

1. **코드 분할**: React.lazy를 사용한 동적 임포트
2. **이미지 최적화**: WebP 포맷 사용, 적절한 크기 조정
3. **캐싱**: CDN 활용, 적절한 캐시 헤더 설정
4. **번들 크기 분석**: `npm run build -- --analyze`
5. **Lighthouse 점수 확인**: 정기적인 성능 측정

## 모니터링

배포 후 다음 사항을 모니터링하세요:

- 에러율 (Sentry, LogRocket 등)
- 페이지 로드 시간
- API 응답 시간
- 사용자 행동 분석

## 롤백

문제가 발생한 경우:

### Docker
```bash
docker pull calendar-agent-frontend:previous-tag
docker-compose up -d
```

### Vercel/Netlify
대시보드에서 이전 배포 버전으로 롤백

## 문제 해결

### 빌드 실패
- Node.js 버전 확인 (v20 이상)
- `node_modules` 삭제 후 재설치
- 캐시 클리어

### 환경 변수 미적용
- 빌드 시점에 환경 변수가 설정되어 있는지 확인
- `VITE_` 접두사가 있는지 확인

### CORS 오류
- 백엔드 CORS 설정 확인
- API URL이 올바른지 확인
