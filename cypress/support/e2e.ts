/* 테스트 파일이 실행 되기 전에 먼저 실행되는 글로벌 테스트 */

import './commands'

beforeEach(() => {
  // 로그인
  cy.login(Cypress.env('email'), Cypress.env('password'));

});