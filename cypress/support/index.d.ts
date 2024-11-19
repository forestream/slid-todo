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

declare namespace Cypress {
  interface Chainable {
    /**
     * 페이지 최상단으로 스크롤
     */
    scrollToTop(): Chainable<Window>;

    /**
     * 페이지 최하단으로 스크롤
     */
    scrollToBottom(): Chainable<Window>;
  }
}