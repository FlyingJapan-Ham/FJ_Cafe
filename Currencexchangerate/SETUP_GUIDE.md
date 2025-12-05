# 네이버 카페 환율 자동 게시 설정 가이드

## 1️⃣ ACCESS_TOKEN 발급 방법

### 사전 준비
- 네이버 개발자 센터에 애플리케이션이 이미 등록되어 있음
- Client ID: `5MzjxJnbfqza1vBR_wYm`
- Client Secret: `W1EZIk5pU2`

### ACCESS_TOKEN 발급 단계

#### 방법 1: 브라우저를 통한 간단한 발급

1. **로그인 URL 생성**
   
   다음 URL을 브라우저에서 열기:
   ```
   https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=5MzjxJnbfqza1vBR_wYm&redirect_uri=http://localhost&state=RANDOM_STATE
   ```

2. **네이버 로그인**
   - 카페 관리자 계정으로 로그인
   - 권한 동의 화면에서 "동의하기" 클릭

3. **인증 코드 받기**
   - 리다이렉트된 URL에서 `code` 파라미터 복사
   - 예: `http://localhost?code=AUTHORIZATION_CODE&state=RANDOM_STATE`
   - `AUTHORIZATION_CODE` 부분을 복사

4. **ACCESS_TOKEN 발급**
   
   터미널에서 다음 명령 실행:
   ```bash
   curl -X POST "https://nid.naver.com/oauth2.0/token" \
     -d "grant_type=authorization_code" \
     -d "client_id=5MzjxJnbfqza1vBR_wYm" \
     -d "client_secret=W1EZIk5pU2" \
     -d "code=위에서_복사한_AUTHORIZATION_CODE" \
     -d "state=RANDOM_STATE"
   ```

5. **응답에서 access_token 복사**
   ```json
   {
     "access_token": "AAAANjARrFheyb3+6rEc5X6AebqU...",
     "refresh_token": "...",
     "token_type": "bearer",
     "expires_in": 3600
   }
   ```

#### 방법 2: Python 스크립트로 자동 발급

아래 스크립트를 사용하여 자동으로 발급받을 수도 있습니다:

```python
# get_token.py
import webbrowser
import urllib.parse

client_id = "5MzjxJnbfqza1vBR_wYm"
redirect_uri = "http://localhost"
state = "RANDOM_STATE"

# 1. 로그인 URL 생성 및 브라우저 열기
auth_url = f"https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id={client_id}&redirect_uri={redirect_uri}&state={state}"
print(f"브라우저에서 다음 URL을 열어주세요:\n{auth_url}")
webbrowser.open(auth_url)

# 2. 리다이렉트된 URL에서 code 입력받기
redirected_url = input("\n리다이렉트된 전체 URL을 붙여넣으세요: ")
code = urllib.parse.parse_qs(urllib.parse.urlparse(redirected_url).query)['code'][0]

# 3. ACCESS_TOKEN 발급
import requests
token_url = "https://nid.naver.com/oauth2.0/token"
data = {
    "grant_type": "authorization_code",
    "client_id": "5MzjxJnbfqza1vBR_wYm",
    "client_secret": "W1EZIk5pU2",
    "code": code,
    "state": state
}
response = requests.post(token_url, data=data)
result = response.json()

print("\n✅ ACCESS_TOKEN 발급 성공!")
print(f"ACCESS_TOKEN: {result['access_token']}")
print(f"\n이 토큰을 .env 파일에 입력하세요.")
```

---

## 2️⃣ CLUBID 찾는 방법

### 방법 1: 카페 관리 페이지에서 확인

1. **카페 관리 페이지 접속**
   - 카페 메인 → 상단 메뉴 "관리" 클릭
   - 또는 직접 `https://cafe.naver.com/ManageHome.nhn` 접속

2. **URL에서 clubid 확인**
   ```
   https://cafe.naver.com/ManageHome.nhn?clubid=12345678
                                                 ^^^^^^^^
   ```
   - `clubid=` 뒤의 숫자가 카페 ID

### 방법 2: 카페 메뉴 URL에서 확인

1. 카페 내 아무 게시판이나 클릭
2. URL 확인:
   ```
   https://cafe.naver.com/ArticleList.nhn?search.clubid=12345678&...
                                                         ^^^^^^^^
   ```

### 방법 3: 브라우저 개발자 도구 사용

1. 카페 페이지에서 F12 (개발자 도구)
2. Console 탭에서 실행:
   ```javascript
   document.querySelector('input[name="clubid"]').value
   ```

---

## 3️⃣ MENUID 찾는 방법

### 방법 1: 게시판 URL에서 확인

1. **환율 정보를 올릴 게시판 클릭**
2. **URL에서 menuid 확인**
   ```
   https://cafe.naver.com/ArticleList.nhn?search.clubid=12345678&search.menuid=123
                                                                              ^^^
   ```
   - `search.menuid=` 뒤의 숫자가 게시판 ID

### 방법 2: 카페 관리 페이지에서 확인

1. **카페 관리 → 메뉴 관리**
2. **각 게시판 옆 "설정" 클릭**
3. **URL에서 menuid 확인**
   ```
   https://cafe.naver.com/ManageMenuForm.nhn?clubid=12345678&menuid=123
                                                                     ^^^
   ```

### 방법 3: API로 확인 (고급)

네이버 카페 API에는 메뉴 목록 조회 기능이 없지만, 브라우저에서 확인 가능:

1. 카페 메인 페이지 접속
2. F12 → Network 탭
3. 게시판 클릭
4. Network 요청에서 `menuid` 파라미터 확인

---

## 4️⃣ .env 파일 설정

위에서 찾은 정보를 `.env` 파일에 입력:

```bash
# .env 파일 편집
cd /Users/sanghunbruceham/Documents/GitHub/FJ_Cafe/Currencexchangerate
nano .env
```

내용:
```env
ACCESS_TOKEN=AAAANjARrFheyb3+6rEc5X6AebqU...  # 1단계에서 발급받은 토큰
CLUBID=12345678                                # 2단계에서 찾은 카페 ID
MENUID=123                                     # 3단계에서 찾은 게시판 ID

CLIENT_ID=5MzjxJnbfqza1vBR_wYm
CLIENT_SECRET=W1EZIk5pU2
```

---

## 5️⃣ 실제 게시 테스트

### 테스트 실행

```bash
cd /Users/sanghunbruceham/Documents/GitHub/FJ_Cafe/Currencexchangerate
python3 main.py
```

### 예상 출력

```
==================================================
📊 네이버 카페 환율 자동 게시 시작
==================================================

1️⃣ 환율 정보 가져오는 중...
✅ 환율 정보 가져오기 성공!
   - 미국 USD: 1,471.60 원 (4.60)
   - 일본 JPY(100엔): 950.86 원 (5.90)
   - 유럽연합 EUR: 1,717.87 원 (6.17)
   - 중국 CNY: 208.25 원 (0.43)

2️⃣ 게시글 포맷팅 중...
✅ 제목: 📊 2025년 12월 04일 환율 정보

3️⃣ 네이버 카페에 게시 중...
✅ 게시글 작성 성공!
게시글 URL: https://cafe.naver.com/your-cafe/12345

==================================================
✅ 완료!
==================================================
```

### 문제 해결

#### 403 에러: CA003
```
공개 및 바로 가입 가능한 카페만, 가입이 가능합니다.
```
**해결**: 카페 관리 → 카페 운영 → 카페 성격을 "공개"로 변경

#### 403 에러: AP002
```
접근 제한 중인 게시판입니다.
```
**해결**: 다른 게시판의 MENUID 사용

#### 403 에러: AP003
```
카페에서 특정한 등급의 멤버만 쓸 수 있는 게시판입니다.
```
**해결**: 게시판 권한 설정 확인 (카페 관리 → 메뉴 관리)

---

## 6️⃣ 자동화 설정

### 옵션 A: macOS cron 사용

#### 1. crontab 편집
```bash
crontab -e
```

#### 2. 매일 오전 9시 실행 설정
```cron
0 9 * * * cd /Users/sanghunbruceham/Documents/GitHub/FJ_Cafe/Currencexchangerate && /usr/bin/python3 main.py >> /tmp/exchange_rate.log 2>&1
```

#### 3. 설정 확인
```bash
crontab -l
```

#### 4. 로그 확인
```bash
tail -f /tmp/exchange_rate.log
```

### 옵션 B: GitHub Actions 사용

#### 1. GitHub Actions 워크플로우 생성

`.github/workflows/daily-exchange-rate.yml` 파일 생성:

```yaml
name: Daily Exchange Rate Post

on:
  schedule:
    # 매일 한국 시간 오전 9시 (UTC 0시)
    - cron: '0 0 * * *'
  workflow_dispatch: # 수동 실행 가능

jobs:
  post-exchange-rate:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.9'
    
    - name: Install dependencies
      run: |
        cd Currencexchangerate
        pip install -r requirements.txt
    
    - name: Create .env file
      run: |
        cd Currencexchangerate
        echo "ACCESS_TOKEN=${{ secrets.NAVER_ACCESS_TOKEN }}" >> .env
        echo "CLUBID=${{ secrets.NAVER_CLUBID }}" >> .env
        echo "MENUID=${{ secrets.NAVER_MENUID }}" >> .env
        echo "CLIENT_ID=${{ secrets.NAVER_CLIENT_ID }}" >> .env
        echo "CLIENT_SECRET=${{ secrets.NAVER_CLIENT_SECRET }}" >> .env
    
    - name: Run exchange rate posting
      run: |
        cd Currencexchangerate
        python3 main.py
```

#### 2. GitHub Secrets 설정

1. GitHub 저장소 → Settings → Secrets and variables → Actions
2. "New repository secret" 클릭
3. 다음 시크릿 추가:
   - `NAVER_ACCESS_TOKEN`: ACCESS_TOKEN 값
   - `NAVER_CLUBID`: CLUBID 값
   - `NAVER_MENUID`: MENUID 값
   - `NAVER_CLIENT_ID`: `5MzjxJnbfqza1vBR_wYm`
   - `NAVER_CLIENT_SECRET`: `W1EZIk5pU2`

#### 3. 워크플로우 활성화

```bash
git add .github/workflows/daily-exchange-rate.yml
git commit -m "Add daily exchange rate posting workflow"
git push
```

#### 4. 수동 테스트

GitHub 저장소 → Actions → "Daily Exchange Rate Post" → "Run workflow"

### 옵션 C: launchd 사용 (macOS 권장)

#### 1. plist 파일 생성

`~/Library/LaunchAgents/com.user.exchangerate.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.user.exchangerate</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/bin/python3</string>
        <string>/Users/sanghunbruceham/Documents/GitHub/FJ_Cafe/Currencexchangerate/main.py</string>
    </array>
    <key>StartCalendarInterval</key>
    <dict>
        <key>Hour</key>
        <integer>9</integer>
        <key>Minute</key>
        <integer>0</integer>
    </dict>
    <key>StandardOutPath</key>
    <string>/tmp/exchangerate.log</string>
    <key>StandardErrorPath</key>
    <string>/tmp/exchangerate.error.log</string>
</dict>
</plist>
```

#### 2. launchd 등록

```bash
launchctl load ~/Library/LaunchAgents/com.user.exchangerate.plist
```

#### 3. 상태 확인

```bash
launchctl list | grep exchangerate
```

#### 4. 제거 (필요시)

```bash
launchctl unload ~/Library/LaunchAgents/com.user.exchangerate.plist
```

---

## 추천 자동화 방법

| 방법 | 장점 | 단점 | 추천도 |
|------|------|------|--------|
| **cron** | 간단, 로컬 실행 | Mac이 꺼져있으면 실행 안됨 | ⭐⭐⭐ |
| **GitHub Actions** | 무료, 안정적, Mac 상관없음 | 설정 복잡 | ⭐⭐⭐⭐⭐ |
| **launchd** | macOS 네이티브, 안정적 | Mac이 꺼져있으면 실행 안됨 | ⭐⭐⭐⭐ |

**추천**: GitHub Actions (24시간 안정적 실행)

---

## 다음 단계 체크리스트

- [ ] ACCESS_TOKEN 발급
- [ ] CLUBID 확인
- [ ] MENUID 확인
- [ ] .env 파일 설정
- [ ] 테스트 실행 (`python3 main.py`)
- [ ] 자동화 설정 (GitHub Actions 또는 cron)
- [ ] 첫 게시글 확인

---

## 문의사항

문제가 발생하면 다음을 확인하세요:
1. `.env` 파일의 모든 값이 올바른지
2. 카페가 "공개" 카페인지
3. 게시판에 글쓰기 권한이 있는지
4. ACCESS_TOKEN이 만료되지 않았는지 (보통 1시간 유효)
