"""
환율 정보를 가져오는 모듈
"""
import requests
from bs4 import BeautifulSoup
from datetime import datetime


def fetch_exchange_rates():
    """
    네이버 금융에서 주요 환율 정보를 스크래핑합니다.
    
    Returns:
        dict: 통화별 환율 정보 (예: {'USD': 1300.50, 'JPY': 900.30, ...})
    """
    url = "https://finance.naver.com/marketindex/"
    
    try:
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        rates = {}
        
        # 주요 환율 정보 추출
        exchange_list = soup.select('.market_data .data_lst li')
        
        for item in exchange_list[:4]:  # USD, JPY, EUR, CNY
            try:
                currency = item.select_one('.h_lst').text.strip()
                value = item.select_one('.value').text.strip().replace(',', '')
                change = item.select_one('.change').text.strip()
                
                rates[currency] = {
                    'value': float(value),
                    'change': change
                }
            except (AttributeError, ValueError) as e:
                print(f"환율 파싱 오류: {e}")
                continue
        
        return rates
    
    except Exception as e:
        print(f"환율 정보 가져오기 실패: {e}")
        return None


def format_exchange_rate_post(rates):
    """
    환율 정보를 카페 게시글 형식으로 포맷팅합니다.
    
    Args:
        rates (dict): 환율 정보
    
    Returns:
        tuple: (제목, 내용)
    """
    if not rates:
        return None, None
    
    today = datetime.now().strftime("%Y년 %m월 %d일")
    
    subject = f"📊 {today} 환율 정보"
    
    content = f"""<div style='font-family: Arial, sans-serif;'>
<h2>💱 오늘의 환율 ({today})</h2>
<br>
<table border='1' cellpadding='10' cellspacing='0' style='border-collapse: collapse; width: 100%;'>
<tr style='background-color: #f0f0f0;'>
    <th>통화</th>
    <th>매매기준율</th>
    <th>전일대비</th>
</tr>
"""
    
    currency_names = {
        'USD': '미국 달러',
        'JPY': '일본 엔 (100엔)',
        'EUR': '유럽연합 유로',
        'CNY': '중국 위안'
    }
    
    for currency, data in rates.items():
        currency_name = currency_names.get(currency, currency)
        value = f"{data['value']:,.2f}"
        change = data['change']
        
        # 변동 방향에 따라 색상 지정
        if '상승' in change or '▲' in change:
            change_color = 'red'
        elif '하락' in change or '▼' in change:
            change_color = 'blue'
        else:
            change_color = 'black'
        
        content += f"""<tr>
    <td><strong>{currency_name}</strong></td>
    <td>{value} 원</td>
    <td style='color: {change_color};'>{change}</td>
</tr>
"""
    
    content += """</table>
<br>
<p style='color: #666; font-size: 12px;'>
※ 본 환율 정보는 네이버 금융에서 제공하는 정보이며, 실제 거래 환율과 다를 수 있습니다.<br>
※ 자동으로 매일 업데이트됩니다.
</p>
</div>"""
    
    return subject, content


if __name__ == "__main__":
    # 테스트
    rates = fetch_exchange_rates()
    if rates:
        print("환율 정보:")
        for currency, data in rates.items():
            print(f"{currency}: {data['value']} ({data['change']})")
        
        subject, content = format_exchange_rate_post(rates)
        print(f"\n제목: {subject}")
        print(f"\n내용:\n{content}")
