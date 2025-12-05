"""
네이버 카페 API 연동 모듈
"""
import requests
import urllib.parse


class NaverCafeAPI:
    """네이버 카페 API 클라이언트"""
    
    BASE_URL = "https://openapi.naver.com/v1/cafe"
    
    def __init__(self, access_token, clubid):
        """
        Args:
            access_token (str): OAuth 2.0 접근 토큰
            clubid (str): 카페 ID
        """
        self.access_token = access_token
        self.clubid = clubid
        self.headers = {
            "Authorization": f"Bearer {access_token}"
        }
    
    def post_article(self, menuid, subject, content, **kwargs):
        """
        카페 게시판에 글을 작성합니다.
        
        Args:
            menuid (str): 게시판 ID
            subject (str): 게시글 제목
            content (str): 게시글 내용 (HTML 가능)
            **kwargs: 추가 옵션 (openyn, searchopen, replyyn, etc.)
        
        Returns:
            dict: API 응답 결과
        """
        url = f"{self.BASE_URL}/{self.clubid}/menu/{menuid}/articles"
        
        # URL 인코딩 (네이버 공식 예제 방식)
        subject_encoded = urllib.parse.quote(subject)
        content_encoded = urllib.parse.quote(content)
        
        # 기본 파라미터
        data = {
            'subject': subject_encoded,
            'content': content_encoded
        }
        
        # 추가 옵션 파라미터
        optional_params = [
            'openyn', 'searchopen', 'replyyn', 'scrapyn',
            'metoo', 'autosourcing', 'rclick', 'ccl'
        ]
        
        for param in optional_params:
            if param in kwargs:
                data[param] = str(kwargs[param]).lower()
        
        try:
            response = requests.post(url, headers=self.headers, data=data)
            response.raise_for_status()
            
            result = response.json()
            
            # 응답 확인
            if 'message' in result:
                message = result['message']
                status = message.get('status', '500')
                
                if status == '200':
                    print("✅ 게시글 작성 성공!")
                    if 'result' in message:
                        article_url = message['result'].get('articleUrl', '')
                        print(f"게시글 URL: {article_url}")
                    return result
                else:
                    error = message.get('error', {})
                    error_code = error.get('code', 'Unknown')
                    error_msg = error.get('msg', 'Unknown error')
                    print(f"❌ 게시글 작성 실패: [{error_code}] {error_msg}")
                    return result
            
            return result
            
        except requests.exceptions.RequestException as e:
            print(f"❌ API 요청 실패: {e}")
            return None
        except Exception as e:
            print(f"❌ 오류 발생: {e}")
            return None
    
    def join_cafe(self, nickname):
        """
        카페에 가입합니다.
        
        Args:
            nickname (str): 카페 별명
        
        Returns:
            dict: API 응답 결과
        """
        url = f"{self.BASE_URL}/{self.clubid}/members"
        
        # URL 인코딩 (네이버 공식 예제 방식)
        nickname_encoded = urllib.parse.quote(nickname)
        
        data = {'nickname': nickname_encoded}
        
        try:
            response = requests.post(url, headers=self.headers, data=data)
            response.raise_for_status()
            
            result = response.json()
            
            if 'message' in result:
                message = result['message']
                status = message.get('status', '500')
                
                if status == '200':
                    print("✅ 카페 가입 성공!")
                else:
                    error = message.get('error', {})
                    error_msg = error.get('msg', 'Unknown error')
                    print(f"❌ 카페 가입 실패: {error_msg}")
            
            return result
            
        except requests.exceptions.RequestException as e:
            print(f"❌ API 요청 실패: {e}")
            return None
        except Exception as e:
            print(f"❌ 오류 발생: {e}")
            return None


if __name__ == "__main__":
    # 테스트용 코드
    print("네이버 카페 API 모듈")
    print("실제 사용은 main.py를 통해 진행하세요.")
