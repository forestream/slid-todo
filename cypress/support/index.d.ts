declare namespace Cypress {
  interface Chainable {
    /**
     * 커스텀 로그인 명령어
     * @param email - 사용자 이메일
     * @param password - 사용자 비밀번호
     */
    login(email: string, password: string): Chainable<Element>;

    /**
    * 페이지 최상단으로 스크롤
    */
    scrollToTop(): Chainable<Window>;

    /**
     * 페이지 최하단으로 스크롤
     */
    scrollToBottom(): Chainable<Window>;

    /**
     * 네비게이션 열기. 로그아웃 텍스트 보임 여부로 확인한다.
     */
    openNav(): Chainable<Element>;

    /**
     * 네비게이션 닫기.
     */
    closeNav(): Chainable<Element>;

    /**
 * 네비게이션 열기. 로그아웃 텍스트 보임 여부로 확인한다.
 */
    openMobileNav(): Chainable<Element>;

    /**
     * 네비게이션 닫기.
     */
    closeMobileNav(): Chainable<Element>;
  }
}

