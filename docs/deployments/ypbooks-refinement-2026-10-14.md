# 영풍문고 상세 배치·스크롤 개선 배포와 복구

## 보관 기준

- 수정 전 커밋: `d7536afdaeae2f60018e9af545e5130e57e37d96`
- 수정 전 태그: `rollback/before-ypbooks-refinement-2026-10-14`
- 수정 브랜치: `feature/ypbooks-refinement-2026-10-14`
- 수정 후 태그: `release/ypbooks-refinement-2026-10-14`
- 배포 브랜치: `main`
- 사이트: https://portfolio-muteljs-projects.vercel.app/

## 변경 범위

`Projects.tsx`, `Projects.module.css`의 영풍문고 상세 전용 동작·스타일을 개선했습니다. 상세 시작 위치와 여백, 내부 스크롤과 키보드 포커스, 원본 이미지 사용, 문제·해결 문구를 수정했습니다. 풍경 및 나뭇잎 탐색 구조는 유지합니다.

## 이전 버전으로 복구

아래는 복구할 때 실행할 명령이며 현재 배포에서 실행하지 않습니다. 작업 트리와 이후 변경을 확인하고 충돌이 있으면 해결한 뒤 진행합니다.

```powershell
git fetch origin --tags
git switch main
git pull --ff-only origin main
git revert --no-edit release/ypbooks-refinement-2026-10-14
npm run lint
npm run build
git push origin main
```

Vercel 배포 성공과 실제 사이트 반영을 확인합니다. 기존 이력을 삭제하거나 강제 푸시할 필요가 없으며 수정본은 별도 브랜치와 태그에 남습니다. 이후 다른 변경이 추가됐다면 이 명령은 이번 개선만 취소하므로 전체를 특정 시점으로 되돌리는 것과 다릅니다.

## 검증

- `npm run lint`, `npm run build` 통과 (TypeScript 포함)
- Chrome 자동화: 1366×768, 1363×936, 1920×1080, 390×844
- 상세 선택·닫기, Main/Best 이미지 및 링크 전환, 스택 펼침·접힘, 키보드 포커스, 다른 프로젝트와 섹션 이동 확인
- 1363×936와 1920×1080에서 기본 상세 내용의 내부 스크롤 없음
- 낮은 데스크톱 화면에서 상세 스크롤 및 닫기 버튼 접근 확인
- 모바일에서는 내부 이중 스크롤 없이 페이지를 자연스럽게 스크롤
- 가로 넘침과 브라우저 런타임 오류 없음
- 실제 모바일 기기의 터치·Safari 검증은 하지 않음
- 로컬 스크린샷 및 결과: `artifacts/ypbooks-refinement/` (배포 커밋 제외)

기존 640px 최적화 이미지 대신 Main 1900×940, Best 1902×944의 실제 PNG 원본을 사용합니다. 새 이미지나 패키지는 추가하지 않았습니다.
