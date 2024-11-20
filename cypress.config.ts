import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',
    experimentalStudio: true,

    /* 아래 내용 중 하나를 주석 해제하고 사용하시면 편리합니다 */

    // 데스크탑 화면 크기 고정
    // viewportWidth: 1280,
    // viewportHeight: 720,

    // 태블릿 화면 크기 고정
    // viewportWidth: 768,
    // viewportHeight: 1024,

    // 모바일 화면 크기 고정
    // viewportWidth: 375,
    // viewportHeight: 667,

  }
});
