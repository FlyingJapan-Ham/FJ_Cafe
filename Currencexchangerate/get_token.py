"""
네이버 OAuth 2.0 ACCESS_TOKEN 발급 헬퍼 스크립트
"""
import webbrowser
import urllib.parse
import requests

# 네이버 애플리케이션 정보
CLIENT_ID = "5MzjxJnbfqza1vBR_wYm"
CLIENT_SECRET = "W1EZIk5pU2"
REDIRECT_URI = "http://localhost"
STATE = "RANDOM_STATE"

print("=" * 60)
print("🔑 네이버 ACCESS_TOKEN 발급 도구")
print("=" * 60)

# 1. 로그인 URL 생성 및 브라우저 열기
auth_url = (
    f"https://nid.naver.com/oauth2.0/authorize?"
    f"response_type=code&"
    f"client_id={CLIENT_ID}&"
    f"redirect_uri={REDIRECT_URI}&"
    f"state={STATE}"
)

print("\n1️⃣ 브라우저에서 네이버 로그인 페이지를 엽니다...")
print(f"\nURL: {auth_url}\n")

try:
    webbrowser.open(auth_url)
    print("✅ 브라우저가 열렸습니다.")
except:
    print("⚠️  브라우저를 자동으로 열 수 없습니다.")
    print("위 URL을 복사하여 브라우저에서 직접 열어주세요.")

print("\n" + "=" * 60)
print("2️⃣ 네이버 로그인 및 권한 동의")
print("=" * 60)
print("- 카페 관리자 계정으로 로그인하세요")
print("- '동의하기' 버튼을 클릭하세요")
print("- 리다이렉트된 URL을 복사하세요")
print("  (예: http://localhost?code=XXXXX&state=RANDOM_STATE)")

# 2. 리다이렉트된 URL에서 code 입력받기
print("\n" + "=" * 60)
redirected_url = input("리다이렉트된 전체 URL을 붙여넣으세요: ").strip()

try:
    parsed = urllib.parse.urlparse(redirected_url)
    query_params = urllib.parse.parse_qs(parsed.query)
    
    if 'code' not in query_params:
        print("❌ 오류: URL에 'code' 파라미터가 없습니다.")
        print("올바른 리다이렉트 URL을 입력했는지 확인하세요.")
        exit(1)
    
    code = query_params['code'][0]
    print(f"\n✅ 인증 코드 추출 성공: {code[:20]}...")
    
except Exception as e:
    print(f"❌ URL 파싱 오류: {e}")
    exit(1)

# 3. ACCESS_TOKEN 발급
print("\n" + "=" * 60)
print("3️⃣ ACCESS_TOKEN 발급 중...")
print("=" * 60)

token_url = "https://nid.naver.com/oauth2.0/token"
data = {
    "grant_type": "authorization_code",
    "client_id": CLIENT_ID,
    "client_secret": CLIENT_SECRET,
    "code": code,
    "state": STATE
}

try:
    response = requests.post(token_url, data=data)
    response.raise_for_status()
    result = response.json()
    
    if 'access_token' in result:
        access_token = result['access_token']
        refresh_token = result.get('refresh_token', 'N/A')
        expires_in = result.get('expires_in', 'N/A')
        
        print("\n✅ ACCESS_TOKEN 발급 성공!\n")
        print("=" * 60)
        print("📋 발급된 토큰 정보")
        print("=" * 60)
        print(f"ACCESS_TOKEN: {access_token}")
        print(f"REFRESH_TOKEN: {refresh_token}")
        print(f"유효 시간: {expires_in}초 ({expires_in/3600:.1f}시간)")
        print("=" * 60)
        
        print("\n📝 다음 단계:")
        print("1. 위의 ACCESS_TOKEN을 복사하세요")
        print("2. .env 파일을 열어 ACCESS_TOKEN 값을 붙여넣으세요:")
        print(f"\n   ACCESS_TOKEN={access_token}")
        print("\n3. CLUBID와 MENUID도 설정하세요")
        print("4. python3 main.py 로 테스트하세요")
        
        # .env 파일 자동 업데이트 제안
        print("\n" + "=" * 60)
        update_env = input(".env 파일을 자동으로 업데이트하시겠습니까? (y/n): ").strip().lower()
        
        if update_env == 'y':
            try:
                with open('.env', 'r') as f:
                    env_content = f.read()
                
                # ACCESS_TOKEN 업데이트
                if 'ACCESS_TOKEN=' in env_content:
                    lines = env_content.split('\n')
                    new_lines = []
                    for line in lines:
                        if line.startswith('ACCESS_TOKEN='):
                            new_lines.append(f'ACCESS_TOKEN={access_token}')
                        else:
                            new_lines.append(line)
                    env_content = '\n'.join(new_lines)
                else:
                    env_content = f'ACCESS_TOKEN={access_token}\n' + env_content
                
                with open('.env', 'w') as f:
                    f.write(env_content)
                
                print("✅ .env 파일이 업데이트되었습니다!")
                
            except FileNotFoundError:
                print("⚠️  .env 파일을 찾을 수 없습니다.")
                print("수동으로 .env 파일을 생성하고 ACCESS_TOKEN을 입력하세요.")
            except Exception as e:
                print(f"❌ .env 파일 업데이트 실패: {e}")
        
    else:
        print("❌ 토큰 발급 실패")
        print(f"응답: {result}")
        
except requests.exceptions.RequestException as e:
    print(f"❌ API 요청 실패: {e}")
    exit(1)
except Exception as e:
    print(f"❌ 오류 발생: {e}")
    exit(1)

print("\n" + "=" * 60)
print("✅ 완료!")
print("=" * 60)
