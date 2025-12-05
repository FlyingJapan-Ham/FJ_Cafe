"""
네이버 카페 환율 자동 게시 메인 스크립트
"""
import os
import sys
from dotenv import load_dotenv
from exchange_rate import fetch_exchange_rates, format_exchange_rate_post
from naver_cafe import NaverCafeAPI


def main(dry_run=False):
    """
    메인 실행 함수
    
    Args:
        dry_run (bool): True일 경우 실제 포스팅하지 않고 내용만 출력
    """
    # .env 파일 로드
    load_dotenv()
    
    # 환경 변수 확인
    access_token = os.getenv('ACCESS_TOKEN')
    clubid = os.getenv('CLUBID')
    menuid = os.getenv('MENUID')
    
    if not all([access_token, clubid, menuid]):
        print("❌ 오류: .env 파일에 필수 정보가 없습니다.")
        print("ACCESS_TOKEN, CLUBID, MENUID를 설정해주세요.")
        sys.exit(1)
    
    print("=" * 50)
    print("📊 네이버 카페 환율 자동 게시 시작")
    print("=" * 50)
    
    # 1. 환율 정보 가져오기
    print("\n1️⃣ 환율 정보 가져오는 중...")
    rates = fetch_exchange_rates()
    
    if not rates:
        print("❌ 환율 정보를 가져오지 못했습니다.")
        sys.exit(1)
    
    print("✅ 환율 정보 가져오기 성공!")
    for currency, data in rates.items():
        print(f"   - {currency}: {data['value']:,.2f} 원 ({data['change']})")
    
    # 2. 게시글 포맷팅
    print("\n2️⃣ 게시글 포맷팅 중...")
    subject, content = format_exchange_rate_post(rates)
    
    if not subject or not content:
        print("❌ 게시글 포맷팅 실패")
        sys.exit(1)
    
    print(f"✅ 제목: {subject}")
    
    # Dry run 모드
    if dry_run:
        print("\n" + "=" * 50)
        print("🔍 DRY RUN 모드 - 실제 포스팅하지 않음")
        print("=" * 50)
        print(f"\n제목:\n{subject}")
        print(f"\n내용:\n{content}")
        print("\n" + "=" * 50)
        return
    
    # 3. 네이버 카페에 게시
    print("\n3️⃣ 네이버 카페에 게시 중...")
    cafe_api = NaverCafeAPI(access_token, clubid)
    
    result = cafe_api.post_article(
        menuid=menuid,
        subject=subject,
        content=content,
        openyn=True,      # 전체 공개
        searchopen=True,  # 검색 허용
        replyyn=True,     # 댓글 허용
    )
    
    if result:
        print("\n" + "=" * 50)
        print("✅ 완료!")
        print("=" * 50)
    else:
        print("\n" + "=" * 50)
        print("❌ 게시 실패")
        print("=" * 50)
        sys.exit(1)


if __name__ == "__main__":
    # 명령줄 인자로 --dry-run 전달 가능
    dry_run = '--dry-run' in sys.argv
    
    main(dry_run=dry_run)
