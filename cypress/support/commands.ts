/* 테스트에서 공통으로 사용될 함수 */

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('input[placeholder="이메일을 입력해주세요"]').type(email);
  cy.get('input[placeholder="비밀번호를 입력해주세요"]').type(password);
  cy.contains('로그인하기').click();
  cy.wait(500);
  cy.visit('/dashboard');
});

Cypress.Commands.add('scrollToTop', () => {
  cy.window().then((win) => {
    win.scrollTo(0, 0);
  });
});

Cypress.Commands.add('scrollToBottom', () => {
  cy.window().then((win) => {
    win.scrollTo(0, win.document.body.scrollHeight);
  });
});

Cypress.Commands.add('openNav', () => {
  cy.get('div[aria-label="사이드바 네비게이션 열기/닫기"][aria-expanded="false"]').click();
  cy.contains('로그아웃').should('be.visible');
});

Cypress.Commands.add('closeNav', () => {
  cy.get('div[aria-label="사이드바 네비게이션 열기/닫기"][aria-expanded="true"]').click();
  cy.contains('로그아웃').should('not.be.visible');
});

Cypress.Commands.add('openMobileNav', () => {
  cy.get('div[aria-label="모바일 네비게이션 열기/닫기"][aria-expanded="false"]').click();
  cy.contains('로그아웃').should('be.visible');
});


Cypress.Commands.add('closeMobileNav', () => {
  cy.get('button[aria-label="모바일 네비게이션 열기/닫기"][aria-expanded="true"]').click({ force: true });
  cy.contains('로그아웃').should('not.be.visible');
});
