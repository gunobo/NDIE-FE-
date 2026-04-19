# 변경 사항 정리

## 수정된 파일 목록

- `src/components/layout/Header.tsx`
- `src/components/layout/Listbox.tsx`
- `src/components/ui/list.tsx`
- `src/app/(main)/[datas]/[id]/page.tsx`
- `src/util/makeDocument.tsx`

---

## 파일별 상세 변경 내용

### src/components/layout/Header.tsx

**수정**
- 데스크탑 헤더의 인증 로딩 중 표시되던 `로딩중...` 텍스트를 회전 스피너로 교체
- 모바일 메뉴의 인증 로딩 중 표시되던 `로딩중...` 텍스트를 회전 스피너로 교체
- 모바일 드롭다운 메뉴의 표시 방식을 `hidden` / `flex` 즉시 전환에서 `max-height` + `opacity` 기반 슬라이드 애니메이션(300ms)으로 변경

---

### src/components/layout/Listbox.tsx

**추가**
- `isLoading` prop 추가
- 로딩 중일 때 게시글 건수 영역을 스켈레톤(회색 블록)으로 표시
- 로딩 중일 때 데스크탑 테이블 행 6개를 pulse 스켈레톤으로 표시
- 로딩 중일 때 모바일 목록 행 6개를 pulse 스켈레톤으로 표시

**수정**
- 테이블 헤더(번호/제목/작성자/등록일/조회)를 로딩 상태와 무관하게 항상 렌더링하도록 구조 변경

**삭제**
- 더 이상 사용되지 않는 `Loading` 컴포넌트 import 제거
- 도달 불가능한 `<Loading />` fallback 분기 제거

---

### src/components/ui/list.tsx

**추가**
- `isLoading` 상태 추가 (초기값 `true`)
- Firebase 데이터 fetch 완료 후 `finally` 블록에서 `isLoading`을 `false`로 전환
- `Listbox`에 `isLoading` prop 전달

---

### src/app/(main)/[datas]/[id]/page.tsx

**추가**
- `imageLoaded` 상태 추가
- 활동 상세 이미지에 `loading="lazy"` 속성 추가
- 이미지 로드 완료 시 `onLoad`로 `imageLoaded`를 `true`로 전환
- 이미지 로드 전후로 `opacity-0` -> `opacity-100` fade-in 전환 효과(500ms) 추가

**수정**
- 이미지 컨테이너 배경색 `bg-gray-50` -> `bg-gray-100` 변경 (로딩 중 플레이스홀더 시각화)

---

### src/util/makeDocument.tsx

**추가**
- 게시물 본문 인라인 이미지(`next/image`)에 `loading="lazy"` 속성 추가

**수정**
- 인라인 주석(`{/* 원하는 높이 설정 */}`) 제거
