# 영풍문고 상세 개편 배포 및 복구

## 버전 기준

- 수정 전 커밋: `7c9d7ea`
- 수정 전 보관 태그: `rollback/before-ypbooks-detail-2026-10-14`
- 수정 브랜치: `feature/ypbooks-detail-2026-10-14`
- 수정 후 보관 태그: `release/ypbooks-detail-2026-10-14`
- 프로덕션 브랜치: `main`
- 사이트: https://portfolio-muteljs-projects.vercel.app/
- 수정 전 Vercel 배포: https://vercel.com/muteljs-projects/portfolio/2ZfHPWpprZhzhNw5fR6hid6D5Z2a

이번 변경은 영풍문고 상세 구성, 전용 반응형 스타일, 가지 포털 초기 렌더링 오류 수정으로 구성됩니다. Hero, About, Contact 및 전체 내비게이션은 변경하지 않았습니다.

## Git 이력을 보존하며 복구

아래 명령은 복구가 필요할 때 실행합니다. 현재 배포 작업에서는 실행하지 않습니다.
먼저 작업 폴더가 깨끗한지 확인하고, 후속 변경이 있다면 충돌과 영향 범위를 검토합니다.

```powershell
git fetch origin --tags
git switch main
git pull --ff-only origin main
git revert --no-edit release/ypbooks-detail-2026-10-14
npm run lint
npm run build
git push origin main
```

Vercel 자동 배포가 성공했는지 확인하고 사이트를 점검합니다. 이 방식은 변경 이력을 삭제하지 않으며, 수정본도 별도 브랜치와 태그에 남습니다. 강제 푸시나 `reset --hard`는 필요하지 않습니다.

## 사이트만 즉시 복구

Vercel 프로젝트에서 `Instant Rollback`을 선택하고 위의 수정 전 배포가 맞는지 확인합니다. Hobby 요금제는 바로 직전 프로덕션 배포로 롤백할 수 있습니다. 더 오래된 버전이나 Git 소스까지 복구해야 하면 위의 Git revert 방식을 사용합니다.

Instant Rollback은 Git 소스를 되돌리지 않습니다. 또한 이후 푸시의 프로덕션 도메인 자동 연결이 중지되므로 정상 배포를 재개할 때 Vercel의 `Undo Rollback` 또는 배포 승격 절차를 확인해야 합니다.

공식 안내: https://vercel.com/docs/instant-rollback

## 배포 전 검증

- ESLint 및 프로덕션 빌드 통과
- 1366×768, 1920×1080, 390×844 브라우저 화면 검증 통과
- 선택·닫기·다른 프로젝트 전환·PAGES·STACK·사이트 링크 확인
- 상세 스크롤과 가로 넘침 확인, 브라우저 실행 오류 없음
- 실제 휴대폰 터치 테스트는 별도로 수행하지 않음
- 로컬 스크린샷과 검증 결과는 `artifacts/ypbooks/`에 보관하며 배포 커밋에는 포함하지 않음
