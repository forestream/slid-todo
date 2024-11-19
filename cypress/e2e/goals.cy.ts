import 'cypress-real-events';

function scrollToTop() {
  cy.window().then((win) => {
    win.scrollTo(0, 0);
  });
}

function scrollToBottom() {
  cy.window().then((win) => {
    win.scrollTo(0, win.document.body.scrollHeight);
  });
}


describe('목표 CRUD 테스트', () => {

  beforeEach(() => {
    cy.get('[aria-label="사이드바 네비게이션 열기/닫기"]')
      .invoke('attr', 'aria-expanded')
      .then((expandedValue) => {
        if (expandedValue === 'false') {
          // 사이드바가 닫혀 있는 경우 클릭
          cy.get('[aria-label="사이드바 네비게이션 열기/닫기"]').click();

          cy.wait(500);

          // 사이드바가 열렸는지 확인
          cy.get('[aria-label="사이드바 네비게이션 열기/닫기"]')
            .should('have.attr', 'aria-expanded', 'true');
        }
      });
  });

  it('목표를 등록하고 모든 페이지에서 확인할 수 있어야 합니다.', () => {

    // 네비게이션에서 할 일 등록하기
    cy.contains('새 목표').click();
    cy.get('input').should('have.value', '· ').type('새로운 목표 테스트');
    cy.contains('새 목표').click();

    // 등록한 후, nav에 등록된 할 일이 있는지 확인
    cy.contains('a', '새로운 목표 테스트').scrollIntoView().should('be.visible');

    scrollToTop();

    cy.wait(500)

    cy.wrap(Array(10))  // 무한 스크롤로 대시보드 하단에 목표를 모두 불러올때까지 반복
      .each(() => {
        scrollToBottom();
        cy.wait(500);
      });

    // 이후 목표를 찾고 스크롤하여 보이게 하기
    cy.contains('h3', '새로운 목표 테스트').scrollIntoView().should('be.visible');


    // 새로 등록한 목표 페이지로 이동하여 등록된 목표가 있는지 확인
    cy.contains('a', '새로운 목표 테스트').click();

    cy.wait(1000);
    cy.url().should('include', 'goals');

    cy.contains('h2', '새로운 목표 테스트').should('be.visible');
  });



  it('목표 상세 페이지에서 목표를 수정 할 수 있어야 합니다.', () => {

    // 목표 상세 페이지로 이동
    cy.contains('a', '새로운 목표 테스트').click();
    cy.wait(1000);

    cy.get('[aria-labelledby="goal-menu-options"]').click();
    cy.contains('li', '수정하기').click();

    // 기존 목표 수정 후 엔터 클릭
    cy.get('input[placeholder="새로운 목표 테스트"]').type('새로운 목표 테스트 수정').type('{enter}');
    cy.contains('h2', '새로운 목표 테스트 수정').should('be.visible');


  })

  it('nav에서 목표를 수정 할 수 있어야 합니다.', () => {
    cy.wait(1000);

    // '새로운 목표 테스트'라는 텍스트를 가진 <a> 태그의 부모 <li>에 마우스를 오버
    cy.contains('a', '새로운 목표 테스트 수정')
      .closest('li')
      .scrollIntoView()
      .should('be.visible')
      .realHover();

    // 동일한 <li> 내의 <div> 버튼을 클릭
    cy.contains('a', '새로운 목표 테스트 수정')
      .closest('li')
      .find('div[aria-label="목표 관리 메뉴 열기"]')
      .invoke('css', 'display', 'block')
      .should('be.visible').click();

    cy.wait(1000);

    cy.contains('li', '수정하기').should('be.visible').click();

    cy.wait(1000);

    cy.get('input[placeholder="새로운 목표 테스트 수정"]').type('새로운 목표 테스트 수정2').type('{enter}');
    cy.wait(1000);

    cy.contains('a', '새로운 목표 테스트 수정2').should('be.visible');

  })


  it('목표 상세 페이지에서 목표를 삭제할 수 있어야 합니다.', () => {
    cy.contains('a', '새로운 목표 테스트 수정2').click(); // 목표 상세 페이지로 이동

    cy.get('[aria-labelledby="goal-menu-options"]').click();
    cy.contains('li', '삭제하기').should('be.visible').click();
    cy.contains('확인').click();

    // nav 에서 해당 목표를 찾을 수 없어야함.

    cy.visit('/dashboard');

    cy.wait(1000)

    cy.get('ul[aria-label="목표 전체 리스트"]')
      .find('li')
      .each(($li) => {
        cy.wrap($li)
          .find('a')
          .should('not.contain', '새로운 목표 테스트 수정2');
      });

  })

  it('nav에서 목표를 삭제할 수 있어야 합니다.', () => {

    cy.visit('/dashboard');

    // 네비게이션에서 할 일 등록하기
    cy.contains('새 목표').click();
    cy.get('input').should('have.value', '· ').type('nav 목표 삭제 테스트');
    cy.contains('새 목표').click();

    // nav에서 하나 클릭
    cy.contains('a', 'nav 목표 삭제 테스트').click();
    cy.wait(1000)

    // newNavGoal텍스트를 가진 <a> 태그의 부모 <li>에 마우스를 오버
    cy.contains('a', 'nav 목표 삭제 테스트')
      .closest('li')
      .scrollIntoView()
      .should('be.visible')
      .realHover();

    cy.wait(1000);

    // 동일한 <li> 내의 <div> 버튼을 클릭
    cy.contains('a', 'nav 목표 삭제 테스트')
      .closest('li')
      .find('div[aria-label="목표 관리 메뉴 열기"]')
      .invoke('css', 'display', 'block')
      .should('be.visible').click();

    cy.wait(1000);

    cy.contains('li', '삭제하기').should('be.visible').click();

    cy.contains('확인').click();
    cy.wait(1000);


    // 삭제 이후 페이지가 대시보드로 이동했는지 확인
    cy.url().should('include', '/dashboard');


    // nav에 방금 삭제한 목표가 없는지 확인
    cy.wait(1000)

    cy.get('ul[aria-label="목표 전체 리스트"]')
      .find('li')
      .each(($li) => {
        cy.wrap($li).find('a').should('not.contain', 'nav 목표 삭제 테스트');
      });

  })

});


