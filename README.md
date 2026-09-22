# Bus Seat

> 출퇴근 시간대 광역버스 이용자를 위한 광역버스 예약 서비스

출퇴근 시간대 원하는 광역버스를 미리 조회하고, 출발 시간과 승·하차 정류장을 선택하여 예약할 수 있는 서비스를 가정하여 개발한 프론트엔드 프로젝트입니다.

단순한 화면 구현에 그치지 않고 **API 구조, 상태 관리, 타입 설계, Mock API 환경을 실제 서비스와 유사하게 구성하는 것**을 목표로 하였습니다.

## 🔗 Links

- **Live Demo**: [Bus Seat](https://kkwongs.github.io/bus-seat/)
- **GitHub**: [Repository](https://github.com/kkwongs/bus-seat)

## ✨ Features

### 인증

- 로그인 및 로그아웃
- 로그인 상태에 따른 라우팅 제어
- USER / ADMIN 권한 구분

### 노선 조회

- 노선 및 정류장 검색
- 노선 상세 정보 조회
- 출발 시간 선택

### 승·하차 정류장 선택

- 노선별 승차 가능 구간 / 하차 가능 구간 구분
- 승차 및 하차 정류장 선택
- 출발 시간별 예상 도착 시간 및 소요 시간 계산

### 즐겨찾기

- 노선 및 승·하차 정류장 즐겨찾기
- 즐겨찾기 추가 / 삭제
- 정류장 알림 ON/OFF
- localStorage를 활용한 데이터 유지

## 🛠️ Tech Stack

| Category        | Technology         |
| --------------- | ------------------ |
| Framework       | Vue 3              |
| Language        | TypeScript         |
| Build           | Vite               |
| State           | Pinia              |
| Routing         | Vue Router         |
| Styling         | Tailwind CSS       |
| API Mocking     | MSW                |
| UI              | PrimeIcons, Swiper |
| Code Quality    | ESLint, Prettier   |
| Package Manager | Yarn 4             |

## 🏰 Architecture

```text
Page / Component
       ↓
     Store
       ↓
  API Service
       ↓
  MSW Handler
       ↓
    Mock DB
       ↓
  localStorage
```

API 호출과 상태 관리를 분리하고, 화면에서 Mock 데이터를 직접 사용하지 않도록 구성하였습니다.

`API Service → MSW` 구조를 통해 실제 백엔드 API로 전환하더라도 화면 및 상태 관리 영역의 변경을 최소화할 수 있도록 설계하였습니다.

즐겨찾기 데이터는 Mock DB와 localStorage를 활용하여 새로고침 이후에도 변경된 상태가 유지되도록 구현하였습니다.

## 📁 Project Structure

```text
src/
├── assets/             # 이미지 및 정적 리소스
├── components/         # 공통 UI 컴포넌트
├── composables/        # 재사용 Composition API 로직
├── constants/          # 프로젝트 상수
├── layouts/            # 페이지 레이아웃
├── mocks/              # MSW 설정 및 Mock 데이터
├── pages/              # 페이지 컴포넌트
├── router/             # Vue Router 설정
├── services/           # API 및 Mock Service
├── stores/             # Pinia Store
├── styles/             # 스타일
├── types/              # TypeScript 타입 정의
└── utils/              # 공통 유틸리티
```

## 🚧 Roadmap

- [x] 로그인 / 권한 처리
- [x] 노선 및 정류장 검색
- [x] 노선 상세 조회
- [x] 출발 시간 선택
- [x] 승·하차 정류장 선택
- [x] 예상 소요 시간 계산
- [x] 즐겨찾기 CRUD
- [x] 예약 화면
- [ ] 실제 좌석 조회 및 좌석 선택
- [ ] 예약 생성 / 취소 및 예약 내역
- [ ] 결제 / 충전
- [ ] 관리자 운행 및 예약 관리
- [ ] 실제 백엔드 API 연동

## 🚀 Getting Started

### Requirements

- Node.js 24.x
- Yarn 4.18.0

### Installation

```bash
git clone https://github.com/kkwongs/bus-seat.git
cd bus-seat
yarn install
```

### Development

```bash
yarn dev
```
