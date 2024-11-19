declare namespace Cypress {
  interface Chainable {
    /**
     * 커스텀 로그인 명령어
     * @param email - 사용자 이메일
     * @param password - 사용자 비밀번호
     */
    login(email: string, password: string): Chainable<Element>;
  }
}