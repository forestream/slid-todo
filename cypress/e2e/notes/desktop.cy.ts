import 'cypress-real-events';

describe('노트 E2E 테스트 - 데스크탑', () => {
  before(() => {
    cy.viewport(1280, 720);
  });

  after(() => {
    cy.visit('/dashboard');
    cy.wait(2000)
      .get('[aria-label="todo-테스트용 할일"]')
      .first()
      .within(() => cy.get('button[title="더보기"]').click().get('li').contains('삭제하기').click())
      .get('button')
      .contains('확인')
      .click();
  });

  it('대시보드에서 새 할 일 생성 후 노트가 없는 할일 항목의 연필 아이콘을 누르면 노트 생성 페이지로 이동합니다.', () => {
    cy.contains('새 할 일').click();
    cy.get('input[id="제목"]').type('테스트용 할일');
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    cy.get('[aria-label="todo-테스트용 할일"]')
      .first()
      .within(() => cy.get('[id=noteWriteTitle]').parentsUntil('button').click());
    cy.wait(2000)
      .location('pathname')
      .should('to.match', /^\/todos\/.*\/create$/);
  });

  context('텍스트 에디터 버튼 기능 테스트', () => {
    beforeEach(() => {
      cy.get('[aria-label="todo-테스트용 할일"]')
        .first()
        .within(() => cy.get('[id=noteWriteTitle]').parentsUntil('button').click());
      cy.wait(2000)
        .location('pathname')
        .should('to.match', /^\/todos\/.*\/create$/);
      cy.get('div[contenteditable=true]').as('editor');
      cy.get('@editor').focus().type('테스트\n본문입니다.');
    });

    it('노트 텍스트 에디터의 버튼이 모두 정상적으로 작동합니다.', () => {
      // 굵은 글씨 테스트
      cy.get('@editor').focus().type('{selectAll}');
      cy.get('button[aria-label="bold"]').click();
      cy.get('@editor').get('strong').first().should('contain.text', '테스트');
      cy.get('@editor').focus().type('{selectAll}');
      cy.get('button[aria-label="bold"]').click();

      // 기울임체 테스트
      cy.get('@editor').focus().type('{selectAll}');
      cy.get('button[aria-label="italics"]').click();
      cy.get('@editor').get('em').first().should('contain.text', '테스트');
      cy.get('@editor').focus().type('{selectAll}');
      cy.get('button[aria-label="italics"]').click();

      // 밑줄 테스트
      cy.get('@editor').focus().type('{selectAll}');
      cy.get('button[aria-label="underline"]').click();
      cy.get('@editor').get('u').first().should('contain.text', '테스트');
      cy.get('@editor').focus().type('{selectAll}');
      cy.get('button[aria-label="underline"]').click();

      // 왼쪽 정렬 테스트
      cy.get('@editor').focus().type('{selectAll}');
      cy.get('button[aria-label="align left"]').click();
      cy.get('@editor').within(() => {
        cy.get('p')
          .first()
          .invoke('attr', 'style')
          .then((value) =>
            expect(value).to.not.be.a('string', 'text-align: center').and.not.be.a('string', 'text-align: right')
          );
      });

      // 가운데 정렬 테스트
      cy.get('@editor').focus().type('{selectAll}');
      cy.get('button[aria-label="align center"]').click();
      cy.get('@editor').within(() => {
        cy.get('p').first().should('have.attr', 'style', 'text-align: center');
      });

      // 오른쪽 정렬 테스트
      cy.get('@editor').focus().type('{selectAll}');
      cy.get('button[aria-label="align right"]').click();
      cy.get('@editor').within(() => {
        cy.get('p').first().should('have.attr', 'style', 'text-align: right');
      });

      // unordered list 테스트
      cy.get('@editor').focus().type('{selectAll}');
      cy.get('button[aria-label="unordered list"]').click();
      cy.get('@editor').within(() => {
        cy.get('p').parent().parent().should('match', 'ul');
      });

      // ordered list 테스트
      cy.get('@editor').focus().type('{selectAll}');
      cy.get('button[aria-label="ordered list"]').click();
      cy.get('@editor').within(() => {
        cy.get('p').parent().parent().should('match', 'ol');
      });

      // highlight color 테스트 보류
      // cy.get('@editor').focus().type('{selectAll}');
      // cy.get('label[aria-label="text highlight"]>input')
      // cy.get('@editor').within(() => {
      //   cy.get('p mark').should('have.attr', 'data-color', '#ffb3b3');
      // });
    });
  });
});
