import 'cypress-real-events';

describe('할 일 추가 및 삭제', () => {
  context('할 일 생성', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
      // 할 일 생성 모달 열기
      cy.get('button').contains('새 할 일').click();
    });

    it('기본 할 일 생성', () => {
      // 제목 입력
      cy.get('input[placeholder="할 일의 제목을 적어주세요"]').type('프로젝트 기획 회의');

      // 확인 버튼 클릭
      cy.get('button').contains('확인').click();

      // 할 일 목록에 추가 확인
      cy.contains('프로젝트 기획 회의').should('be.visible');
    });

    it('링크와 함께 할 일 생성', () => {
      // 제목 입력
      cy.get('input[placeholder="할 일의 제목을 적어주세요"]').type('프로젝트 노션 페이지 검토');

      // 링크 입력
      cy.get('input[placeholder="링크를 입력하세요"]').type('https://www.notion.so/project');

      // 확인 버튼 클릭
      cy.get('button').contains('확인').click();

      // 할 일 목록에 추가 및 링크 확인
      cy.contains('프로젝트 노션 페이지 검토').should('be.visible');
    });

    it('목표와 함께 할 일 생성', () => {
      // 제목 입력
      cy.get('input[placeholder="할 일의 제목을 적어주세요"]').type('주간 회고 작성');

      // 목표 선택 드롭다운 열기
      cy.get('button[aria-labelledby="new-todo-goal-selector"]').click();

      // 첫 번째 목표 선택
      cy.get('#dropdown-menu li').first().click();

      // 확인 버튼 클릭
      cy.get('button').contains('확인').click();

      // 할 일 목록에 추가 확인
      cy.contains('주간 회고 작성').should('be.visible');
    });

    it('이미지 업로드와 함께 할 일 생성', () => {
      // 제목 입력
      cy.get('input[placeholder="할 일의 제목을 적어주세요"]').type('프로젝트 스크린샷 첨부');

      // 파일 업로드 input 선택 (실제 hidden input을 찾아야 함)
      cy.get('label[for="file-upload"]').click({ force: true }).selectFile('cypress/fixtures/test-file.png');
      cy.wait(1000);
      // 확인 버튼 클릭
      cy.get('button').contains('확인').click();

      // 할 일 목록에 추가 확인
      cy.contains('프로젝트 스크린샷 첨부').should('be.visible');
    });

    it('필수 항목 미입력시 에러 표시', () => {
      // 제목 입력 없이 확인 버튼 클릭
      cy.get('button').contains('확인').click();
      cy.wait(1000);
      // 에러 메시지 확인
      cy.contains('제목을 입력').should('be.visible');
    });

    it('긴 제목 입력 및 할 일 생성', () => {
      // 긴 제목 입력
      const longTitle = '2024년 첫 분기 프로젝트 진행 상황 점검 및 다음 분기 전략 수립을 위한 포괄적인 팀 미팅';
      cy.get('input[placeholder="할 일의 제목을 적어주세요"]').type(longTitle);
      cy.get('button').contains('확인').click();
      cy.wait(1000);
      cy.contains('제목은 최대').should('be.visible');
    });
  });

  context('할 일 수정', () => {
    beforeEach(() => {
      // 할 일 보기 페이지 url로 이동
      cy.visit('/todos');
    });

    it('할 일 수정', () => {
      // 프로젝트 기획 회의 찾기
      cy.get('article[aria-label="todo-프로젝트 기획 회의"]')
        .first()
        .within(() => {
          // title이 '더보기'인 캐밥 버튼 찾아 클릭
          cy.get('button[title="더보기"]').click();

          // 드롭다운 메뉴에서 '수정하기' 클릭
          cy.contains('li', '수정하기').click();
        });

      // 모달 내 입력 필드에 새로운 제목 입력
      cy.get('input[placeholder="할 일의 제목을 적어주세요"]').clear().type('수정된 프로젝트 기획 회의');

      // 링크 추가
      cy.get('input[placeholder="링크를 입력하세요"]').type('https://updated-project-link.com');

      // 목표 선택 드롭다운 열기
      cy.get('button[aria-labelledby="new-todo-goal-selector"]').click();

      // 첫 번째 목표 선택
      cy.get('#dropdown-menu li').first().click();

      // 확인 버튼 클릭
      cy.get('button').contains('확인').click();

      // 수정된 할 일 목록에 추가 확인
      cy.contains('수정된 프로젝트 기획 회의').should('be.visible');

      // 수정된 할 일 상세 확인
      cy.get('article[aria-label="todo-수정된 프로젝트 기획 회의"]').should('exist');
    });
  });

  context('할 일 삭제', () => {
    beforeEach(() => {
      // 할 일 보기 페이지 url로 이동
      cy.visit('/todos');
    });

    context('할 일 삭제', () => {
      beforeEach(() => {
        // 할 일 보기 페이지 url로 이동
        cy.visit('/todos');
      });

      it('할 일 삭제', () => {
        // 프로젝트 기획 회의 찾기
        cy.get('article[aria-label="todo-수정된 프로젝트 기획 회의"]')
          .first()
          .within(() => {
            // title이 '더보기'인 캐밥 버튼 찾아 클릭
            cy.get('button[title="더보기"]').click();

            // 드롭다운 메뉴에서 '삭제하기' 클릭
            cy.contains('li', '삭제하기').click();
          });

        // 삭제 확인 모달에서 확인 버튼 클릭
        cy.get('div[role="dialog"]').contains('button', '확인').click();
        cy.contains('할 일이 삭제되었습니다').should('be.visible');

        // 삭제 후 해당 할 일이 존재하지 않는지 확인
        cy.get('article[aria-label="todo-수정된 프로젝트 기획 회의"]').should('not.exist');

        // 프로젝트 노션 페이지 검토 찾기
        cy.get('article[aria-label="todo-프로젝트 노션 페이지 검토"]')
          .first()
          .within(() => {
            // title이 '더보기'인 캐밥 버튼 찾아 클릭
            cy.get('button[title="더보기"]').click();

            // 드롭다운 메뉴에서 '삭제하기' 클릭
            cy.contains('li', '삭제하기').click();
          });

        // 삭제 확인 모달에서 확인 버튼 클릭
        cy.get('div[role="dialog"]').contains('button', '확인').click();
        cy.contains('할 일이 삭제되었습니다').should('be.visible');

        // 삭제 후 해당 할 일이 존재하지 않는지 확인
        cy.get('article[aria-label="todo-프로젝트 노션 페이지 검토"]').should('not.exist');

        //주간 회고 작성 찾기
        cy.get('article[aria-label="todo-주간 회고 작성"]')
          .first()
          .within(() => {
            // title이 '더보기'인 캐밥 버튼 찾아 클릭
            cy.get('button[title="더보기"]').click();

            // 드롭다운 메뉴에서 '삭제하기' 클릭
            cy.contains('li', '삭제하기').click();
          });

        // 삭제 확인 모달에서 확인 버튼 클릭
        cy.get('div[role="dialog"]').contains('button', '확인').click();
        cy.contains('할 일이 삭제되었습니다').should('be.visible');

        // 삭제 후 해당 할 일이 존재하지 않는지 확인
        cy.get('article[aria-label="todo-주간 회고 작성"]').should('not.exist');

        //프로젝트 스크린샷 첨부 찾기
        cy.get('article[aria-label="todo-프로젝트 스크린샷 첨부"]')
          .first()
          .within(() => {
            // title이 '더보기'인 캐밥 버튼 찾아 클릭
            cy.get('button[title="더보기"]').click();

            // 드롭다운 메뉴에서 '삭제하기' 클릭
            cy.contains('li', '삭제하기').click();
          });

        // 삭제 확인 모달에서 확인 버튼 클릭
        cy.get('div[role="dialog"]').contains('button', '확인').click();
        cy.contains('할 일이 삭제되었습니다').should('be.visible');

        // 삭제 후 해당 할 일이 존재하지 않는지 확인
        cy.get('article[aria-label="todo-프로젝트 스크린샷 첨부"]').should('not.exist');
      });
    });
  });
});
