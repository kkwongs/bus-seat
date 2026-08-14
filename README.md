# Bus Seat

> 통근버스 예약 및 운행 관리 서비스

통근버스의 노선 조회와 좌석 예약부터 예약 관리 및 운행 현황까지
사용자와 관리자가 이용할 수 있는 통근버스 관리 플랫폼을 구현합니다.

## 🛠 Tech Stack

- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia
- Tailwind CSS
- ESLint
- Prettier

## 📌 Features

### User

- [x] 로그인
- [ ] 노선 조회
- [ ] 좌석 조회
- [ ] 좌석 예약
- [ ] 예약 내역
- [ ] 예약 취소

### Admin

- [ ] Dashboard
- [ ] 노선 관리
- [ ] 차량 관리
- [ ] 예약 관리
- [ ] 운행 현황

## 📁 Project Structure

```text
src/
├── components/      # 공통 및 도메인 UI 컴포넌트
├── composables/     # 재사용 가능한 Vue Composition 로직
├── constants/       # 프로젝트 상수 및 환경 설정
├── layouts/         # 페이지 레이아웃
├── mocks/           # Mock 데이터
├── pages/           # 페이지 컴포넌트
├── router/          # Vue Router 설정
├── services/        # API / Mock API
├── stores/          # Pinia Store
├── styles/          # 전역 스타일
├── types/           # TypeScript 타입 정의
└── utils/           # 공통 유틸리티
```

## 🚀 Getting Started

### Requirements

- Node.js 24.x
- Yarn 4.18.0

### Installation

```bash
yarn install
```

### Development

```bash
yarn dev
```

### Build

```bash
yarn build
```

### Lint

```bash
yarn lint
```

### Format

```bash
yarn format
```

## 📖 Development

실제 서비스 개발 과정을 가정하여 요구사항 정의부터 화면 설계,
API 명세, TypeScript 타입 정의, Mock 데이터 설계 및 기능 구현까지
단계적으로 진행합니다.

단순한 화면 구현에 그치지 않고 유지보수와 확장성을 고려한
프로젝트 구조와 컴포넌트 설계를 목표로 합니다.
