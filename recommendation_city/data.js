const quizData = {
    questions: [
        {
            id: 1,
            question: "이번 일본 여행에서 가장 기대하는 것은 무엇인가요?",
            options: [
                { text: "쇼핑과 트렌드 경험", scores: { tokyo: 2, osaka: 1 } },
                { text: "먹방 / 다양한 먹거리", scores: { osaka: 2, fukuoka: 2, hokkaido: 1 } },
                { text: "자연 풍경 & 대자연 감상", scores: { hokkaido: 2, okinawa: 1 } },
                { text: "바다 & 휴양", scores: { okinawa: 2 } },
                { text: "전통 & 감성 거리", scores: { kyoto: 2 } },
                { text: "일본 테마파크 경험", scores: { osaka: 2, tokyo: 2 } }
            ]
        },
        {
            id: 2,
            question: "가고 싶은 계절은?",
            options: [
                { text: "봄(벚꽃)", scores: { kyoto: 2, tokyo: 1 } },
                { text: "여름(바다/액티비티)", scores: { okinawa: 2 } },
                { text: "가을(단풍)", scores: { kyoto: 2, hokkaido: 1 } },
                { text: "겨울(눈/스키/설경)", scores: { hokkaido: 2 } },
                { text: "계절 상관없음", scores: { tokyo: 1, osaka: 1 } }
            ]
        },
        {
            id: 3,
            question: "선호하는 여행 스타일은 어떤가요?",
            options: [
                { text: "바쁘고 효율적으로!", scores: { tokyo: 2 } },
                { text: "적당히 여유 + 적당히 관광", scores: { osaka: 1, fukuoka: 1 } },
                { text: "여유롭게 쉬는 여행", scores: { okinawa: 2, hokkaido: 1 } },
                { text: "조용한 힐링 여행", scores: { kyoto: 2 } }
            ]
        },
        {
            id: 4,
            question: "여행지 분위기 취향은?",
            options: [
                { text: "도시적 & 현대적인 분위기", scores: { tokyo: 2, osaka: 1 } },
                { text: "전통적 & 감성적인 분위기", scores: { kyoto: 2 } },
                { text: "자연 & 풍경 중심", scores: { hokkaido: 2 } },
                { text: "해변/열대 느낌", scores: { okinawa: 2 } },
                { text: "콤팩트하고 소도시 같은 분위기", scores: { fukuoka: 2 } }
            ]
        },
        {
            id: 5,
            question: "기대하는 음식 스타일은?",
            options: [
                { text: "다양한 디저트·레스토랑", scores: { tokyo: 2 } },
                { text: "길거리 음식·맛집 탐방", scores: { osaka: 2, fukuoka: 1 } },
                { text: "신선한 해산물", scores: { hokkaido: 2 } },
                { text: "라멘 중심", scores: { fukuoka: 2 } },
                { text: "리조트·해변 음식", scores: { okinawa: 2 } }
            ]
        },
        {
            id: 6,
            question: "이동 스타일은?",
            options: [
                { text: "지하철로 빠르게 이동하는 도시 여행", scores: { tokyo: 2, osaka: 1 } },
                { text: "걷기 + 대중교통", scores: { kyoto: 1, tokyo: 1 } },
                { text: "자동차 드라이브 선호", scores: { hokkaido: 2 } },
                { text: "리조트 안에서 쉬기", scores: { okinawa: 2 } },
                { text: "간단한 동선·콤팩트 이동", scores: { fukuoka: 2 } }
            ]
        },
        {
            id: 7,
            question: "누구와 여행하나요?",
            options: [
                { text: "친구/연인", scores: { tokyo: 1, osaka: 1, okinawa: 1 } },
                { text: "가족단위 여행", scores: { okinawa: 2, hokkaido: 1 } },
                { text: "혼자 여행", scores: { kyoto: 1, tokyo: 1 } },
                { text: "부모님과 함께", scores: { kyoto: 2, fukuoka: 1 } },
                { text: "아이와 함께", scores: { okinawa: 2, osaka: 1 } }
            ]
        },
        {
            id: 8,
            question: "예산 스타일은?",
            options: [
                { text: "최대한 아끼는 편", scores: { fukuoka: 2, osaka: 1 } },
                { text: "적당히 쓰는 편", scores: { osaka: 1, fukuoka: 1 } },
                { text: "즐길 때는 쓰는 편", scores: { tokyo: 2, hokkaido: 1 } },
                { text: "숙소/휴양에 투자하는 편", scores: { okinawa: 2 } },
                { text: "플렉스 OK", scores: { tokyo: 2 } }
            ]
        }
    ],
    results: {
        tokyo: {
            name: "도쿄",
            title: "일본의 중심, 도시의 모든 것을 담은 여행지",
            tags: ["팝컬처", "최신 트렌드", "야경", "팀랩", "테마파크(디즈니)", "쇼핑 다양성"],
            features: [
                "최신 트렌드와 팝컬처를 좋아한다면",
                "쇼핑·전시·카페 투어가 중요하다면",
                "밤까지 즐길 거리 가득한 여행을 원한다면"
            ],
            reason: "도쿄는 일본의 모든 ‘지금’을 경험할 수 있는 도시예요. 화려한 시티뷰, 팀랩 같은 인기 전시, 도쿄타워·스카이트리의 야경, 디즈니까지. 쇼핑, 맛집, 카페, 문화—원하는 모든 테마를 한 번에 즐길 수 있는 여행지입니다.",
            linkText: "도쿄에서 사용 가능한 교통패스/+ 맛집 정보 보러가기!",
            linkUrl: "#" // Placeholder
        },
        osaka: {
            name: "오사카",
            title: "먹고 즐기고 돌아다니는 알찬 여행지",
            tags: ["먹방", "활기찬 도시", "USJ(테마파크)", "근교 이동 용이", "가성비"],
            features: [
                "제대로 된 먹방 여행을 꿈꾼다면",
                "짧은 일정에도 알차게 보내고 싶다면",
                "USJ 포함 근교까지 다양하게 즐기고 싶다면"
            ],
            reason: "오사카는 맛집의 천국이자 친근한 분위기의 활기찬 도시예요. 신사이바시·도톤보리 먹방부터 USJ 액티비티까지 하루가 금방 지나갑니다. 교토·나라·고베까지 근교 여행도 매우 쉬워 선택의 폭이 넓어요.",
            linkText: "오사카 에서 사용 가능한 교통패스/+ 맛집 정보 보러가기!",
            linkUrl: "#"
        },
        kyoto: {
            name: "교토",
            title: "일본 감성과 전통이 흐르는 도시",
            tags: ["전통거리", "사계절 감성", "조용함", "기온·신사", "일본다운 여행"],
            features: [
                "일본다운 감성과 분위기를 느끼고 싶다면",
                "조용하고 여유로운 여행을 원한다면",
                "전통거리·신사 등 사진 감성 여행이 좋다면"
            ],
            reason: "교토는 일본 전통의 정수가 담긴 도시입니다. 기온 거리의 감성, 후시미이나리와 전통 신사들, 사계절 아름다운 풍경까지. 바쁜 여행보다 ‘천천히 머무는 여행’을 하고 싶은 사람에게 딱 맞아요.",
            linkText: "교토에서 사용 가능한 교통패스/+ 맛집 정보 보러가기!",
            linkUrl: "#"
        },
        hokkaido: {
            name: "홋카이도",
            title: "자연과 감성, 그리고 여유의 여행지",
            tags: ["자연 절경", "겨울 설경", "감성 드라이브", "해산물", "여유로운 일정"],
            features: [
                "자연·풍경 중심 여행을 좋아한다면",
                "겨울 설경이나 감성 드라이브를 좋아한다면",
                "여유롭고 넓은 여행을 원한다면"
            ],
            reason: "홋카이도는 자연 그 자체가 여행의 주인공이에요. 비에이·후라노의 드라이브, 눈 덮인 겨울 풍경, 오타루의 감성 거리까지. 해산물·유제품 등 먹거리도 수준이 매우 높아요.",
            linkText: "홋카이도에서 사용 가능한 교통패스/+ 맛집 정보 보러가기!",
            linkUrl: "#"
        },
        okinawa: {
            name: "오키나와",
            title: "푸른 바다와 리조트에서 쉬는 힐링 여행",
            tags: ["바다", "리조트", "여름 분위기", "해양스포츠", "가족·커플 여행"],
            features: [
                "바다·휴양 중심의 여행을 원한다면",
                "커플·가족 단위로 편하게 쉬고 싶다면",
                "해양 액티비티를 즐기는 타입이라면"
            ],
            reason: "투명한 바다, 여유로운 리조트, 스노클링·카약 등 해양 액티비티까지. 일본이지만 일본 같지 않은 이국적 분위기—오키나와만의 매력이에요. “진짜 쉬는 여행”이 필요할 때 가장 적합한 여행지입니다.",
            linkText: "오키나와 여행 꿀팁과 + 맛집 정보 보러가기!",
            linkUrl: "#"
        },
        fukuoka: {
            name: "후쿠오카",
            title: "가볍지만 맛있고 만족도 높은 여행",
            tags: ["식도락", "짧은 일정", "도시 콤팩트", "온천 근교 접근성", "라멘"],
            features: [
                "가벼운 일정으로 식도락 여행을 하고 싶다면",
                "온천 포함 소도시 여행에도 매력을 느낀다면",
                "동선이 편한 도시 여행이 좋다면"
            ],
            reason: "도시 규모가 작아 동선이 매우 편하고 여행이 부담 없어요. 하카타 라멘·모츠나베·멘타이코 등 먹거리 레벨이 체감되게 뛰어나고, 유후인·벳푸 같은 온천 소도시 접근성도 뛰어나 짧은 일정에도 알찹니다.",
            linkText: "후쿠오카에서 사용 가능한 교통패스/+ 맛집 정보 보러가기!",
            linkUrl: "#"
        }
    }
};
