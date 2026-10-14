# 영풍문고 상세 가로 배치·줄바꿈 배포 및 복구

- 이전 커밋: `522156bb5f72014d93bb615113726b6586d129f2`
- 이전 버전 백업 태그: `rollback/before-ypbooks-alignment-2026-10-14`
- 수정 브랜치: `feature/ypbooks-alignment-2026-10-14`
- 수정본 태그: `release/ypbooks-alignment-2026-10-14`
- 배포 브랜치: `main`
- 공개 사이트: https://portfolio-muteljs-projects.vercel.app/

## 변경 및 검증

`Projects.module.css`에서 영풍문고 상세 패널의 데스크톱 왼쪽 여백을 12px 줄이고 설명의 줄바꿈을 설정했습니다. `Projects.tsx`에서 문제·해결 문구에 의미 단위 줄바꿈을 넣었습니다. 모바일의 기존 여백과 자연스러운 줄바꿈은 유지합니다. 배경, 헤더, 대표 이미지, 기존 인터랙션은 변경하지 않았습니다.

Chrome에서 1363×936, 1920×1080, 390×844를 확인했습니다. 패널과 자식 요소의 이동량, 너비·세로 위치 유지, 세 열 정렬, 상세 콘텐츠 가로 넘침 없음, 열기·닫기, Main/Best 전환, 스택 펼침·접힘 및 다른 프로젝트 선택을 확인했습니다. 실제 모바일 기기 및 Safari는 별도 검증하지 않았습니다.

로컬 스크린샷과 측정 결과는 `artifacts/ypbooks-alignment/`에 보관하며 배포 커밋에는 포함하지 않습니다.

## 복구할 때만 실행

작업 트리가 깨끗한지 확인하고, 이후 변경과 충돌이 있다면 검토·해결한 뒤 진행합니다.

```powershell
git fetch origin --tags
git switch main
git pull --ff-only origin main
git revert --no-edit release/ypbooks-alignment-2026-10-14
npm run lint
npm run build
git push origin main
```

검사와 빌드가 모두 성공한 경우에만 푸시하고 Vercel 배포 및 실제 사이트 반영을 확인합니다. 이 명령은 이번 수정만 취소하며, 수정본은 별도 브랜치·태그에 남습니다. 강제 푸시나 기존 이력 삭제는 필요하지 않습니다.
