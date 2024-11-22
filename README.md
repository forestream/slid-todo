# 당신의 동료 Slid ToDo 
효율적인 목표 관리와 체계적인 할 일 관리 서비스 Slid ToDo는 목표 설정과 할 일 관리에 필요한 모든 기능을 제공합니다. 목표부터 세부적인 할 일과 노트까지 체계적으로 관리하여 효율적인 작업 흐름을 만들어 보세요.  
  
<p align='center'><img src="https://github.com/user-attachments/assets/06bf13cb-27a8-41e9-9f03-d299daf65e23" width='800' height='400' /></p>

## 배포 주소 [slid-todo-xi.vercel.app ](https://slid-todo-xi.vercel.app/) 

## 🚀 기술 스택 
프레임워크: React.js    
메타 프레임워크: Next.js 14(App Router)    
개발 언어: Typescript    
서버 상태 관리: TanStack Query v5    
상태 관리: Zustand    
유틸리티    
  CSS: Tailwind CSS  
  코드 포맷: Prettier, ESLint  
  CI/CD: GitHub Actions 

# 주요 기능 
## 사이드 메뉴
### 유저 정보
유저의 프로필 사진과 이름, 이메일을 확인할 수 있습니다.  
로그아웃하면 로그인 페이지로 이동합니다.   
로그아웃 상태에서는 [서비스 소개페이지](https://slid-todo-xi.vercel.app/)와 로그인 페이지만 접근 가능합니다. 

### 새 할 일 버튼
할 일 생성 모달을 띄웁니다.  
해당 모달에서 할 일 제목, 링크, 파일, 목표를 설정하여 할 일을 생성할 수 있습니다. 

### 대시보드 탭
대시보드 페이지로 이동합니다.

### 모든 할 일 탭
모든 할 일 페이지로 이동합니다.

### 목표 탭
사용자의 모든 목표를 확인할 수 있습니다.  
케밥 메뉴를 통해 목표명 수정, 목표 삭제가 가능합니다. 목표 삭제 시 그 안에 포함된 할 일과 노트가 모두 삭제됩니다.  
새 목표 버튼을 통해 목표를 생성할 수 있습니다. 

## 대시보드 
### 최근 등록한 할 일
최근 등록한 할 일을 4개까지 보여줍니다. 

#### 할 일 컴포넌트  
대시보드를 포함한 여러 페이지에서 공통으로 쓰이는 할 일 컴포넌트를 통해 완료 여부 변경, 할 일이 속한 목표, 등록한 파일과 링크, 사이드 시트로 노트 열람, 노트 생성/수정 페이지로 이동, 할 일 수정/삭제가 가능합니다. 

##### 파일 아이콘 <img src="/public/file.svg" width='20px' height='20px' />
할 일을 생성할 때 업로드한 파일을 다운로드할 수 있습니다. 

##### 링크 아이콘 <img src="/public/link.svg" width='20px' height='20px' />
할 일을 생성할 때 등록한 링크가 새 탭에서 열립니다.

##### 노트 아이콘 <img src="/public/note.svg" width='20px' height='20px' />
할 일에 등록한 노트를 사이드 시트를 통해 열람할 수 있습니다. 

##### 연필 아이콘 <img src="/public/pencil.svg" width='20px' height='20px' />
할 일에 노트가 없다면 노트 생성 페이지로, 있다면 노트 수정 페이지로 이동합니다. 

##### 케밥 아이콘 <img src="/public/kebab.svg" width='20px' height='20px' />
할 일을 수정, 삭제할 수 있습니다. 

### 내 진행 상황
사용자의 전체 할 일 중 완료된 할 일 비율을 도넛 차트로 표시합니다. 할 일 완료 여부 변경에 따라서 실시간으로 업데이트됩니다. 

### 목표별 할 일
목표별 할 일을 진행 중 상태와 미완료 상태별로 5개씩 보여줍니다. 더 많은 할 일이 있을 경우 더보기 버튼을 눌러서 5개 더 로드할 수 있습니다. 목표는 무한 스크롤 방식으로 로드됩니다.  
목표명, 목표 내 할 일 추가 버튼, 진행률 그래프를 확인할 수 있습니다.  
최근 등록한 할 일과 마찬가지로 완료 여부 변경 등의 작업을 할 수 있고, 데이터 변경 사항은 실시간으로 반영됩니다. 

## 목표 상세 페이지
목표명 수정, 목표 삭제, 할 일 수정 등의 작업을 할 수 있습니다.  
노트 모아보기 메뉴를 통해 해당 목표의 할 일에 등록된 모든 노트를 모아둔 페이지로 이동합니다.

## 노트 모아보기
한 가지 목표의 할 일에 등록된 모든 노트들을 모아둔 페이지입니다. 

## 모든 할 일
사용자의 모든 할 일을 필터별로 확인할 수 있습니다.  
할 일에 이미지 파일이 등록된 경우 해당 이미지가 할 일 컴포넌트 하단에 표시됩니다. 

# 팀 Slid Todo
[노민하](https://github.com/MinaRoh)  
[조한빈](https://github.com/forestream)  
[조현진](https://github.com/ahrrrl)
