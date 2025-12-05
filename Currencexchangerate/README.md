# 네이버 카페 환율 자동 게시 프로그램

매일 자동으로 환율 정보를 네이버 카페에 게시하는 Python 스크립트입니다.

## 기능

- 네이버 금융에서 실시간 환율 정보 수집 (USD, JPY, EUR, CNY)
- 네이버 카페 API를 통한 자동 게시
- HTML 형식의 깔끔한 표 형식 게시글

## 설치 방법

1. 필요한 패키지 설치:
```bash
pip install -r requirements.txt
```

2. `.env` 파일 생성:
```bash
cp .env.example .env
```

3. `.env` 파일 편집하여 필수 정보 입력:
```
ACCESS_TOKEN=your_access_token_here
CLUBID=your_cafe_id_here
MENUID=your_board_id_here
```

## 사용 방법

### 테스트 실행 (Dry Run)
실제로 게시하지 않고 내용만 확인:
```bash
python main.py --dry-run
```

### 실제 게시
```bash
python main.py
```

## 필수 설정 정보

### 1. ACCESS_TOKEN 발급
- [네이버 로그인 API](https://developers.naver.com/docs/login/api/)를 통해 OAuth 2.0 접근 토큰 발급
- 카페 API 권한이 활성화된 토큰이어야 함

### 2. CLUBID 확인
- 카페 관리 페이지 URL에서 확인
- 예: `https://cafe.naver.com/ManageHome.nhn?clubid=12345678`
- 위 예시에서 `12345678`이 CLUBID

### 3. MENUID 확인
- 게시판 URL에서 확인
- 카페 게시판에 접속하여 URL 확인

## 자동화 설정

### macOS/Linux (cron)
매일 오전 9시에 실행:
```bash
crontab -e
```

다음 줄 추가:
```
0 9 * * * cd /path/to/Currencexchangerate && /usr/bin/python3 main.py
```

### Windows (작업 스케줄러)
1. 작업 스케줄러 열기
2. 기본 작업 만들기
3. 트리거: 매일 오전 9시
4. 작업: `python main.py` 실행

## 주의사항

- 네이버 카페는 공개 카페여야 API로 글 작성 가능
- ACCESS_TOKEN은 주기적으로 갱신 필요
- API 호출 제한에 유의

## 문제 해결

### 403 에러
- 카페가 공개 카페인지 확인
- API 권한이 활성화되어 있는지 확인
- ACCESS_TOKEN이 유효한지 확인

### 환율 정보를 가져오지 못함
- 네이버 금융 페이지 구조 변경 가능성
- 인터넷 연결 확인
