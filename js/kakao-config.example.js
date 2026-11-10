/* 카카오맵 키 (예시)
   1) 이 파일을 복사해 js/kakao-config.js 로 저장
   2) 아래 키를 카카오 개발자 콘솔 값으로 채우기
   3) js/kakao-config.js 는 .gitignore 대상 — 깃허브에 올리지 마세요

   - APP_KEY: JavaScript 키 (지도·로드뷰·장소검색). 콘솔 Web 도메인 등록 필요
   - REST_KEY: REST 키 (대중교통 경로). 브라우저 직접 호출은 CORS에 막히므로 serve.py 프록시 사용
   - TRANSIT_PROXY: 선택. 비우면 /api/kakao/transit 및 http://127.0.0.1:8765/api/kakao/transit 자동 시도 */
window.KAKAO_MAP_APP_KEY = "";
window.KAKAO_MAP_REST_KEY = "";
window.KAKAO_TRANSIT_PROXY = "";
