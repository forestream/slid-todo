Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('input[placeholder="이메일을 입력해주세요"]').type(email);
  cy.get('input[placeholder="비밀번호를 입력해주세요"]').type(password);
  cy.contains('로그인하기').click();
  cy.wait(500);
  cy.visit('/dashboard');
});