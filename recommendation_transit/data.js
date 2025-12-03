const transitData = {
    osaka: {
        title: "오사카",
        questions: [
            {
                id: 1,
                question: "오사카 여행에서 가장 끌리는 포인트는 무엇인가요?",
                options: [
                    { text: "먹방·맛집 투어", scores: { amazing: 2, metro: 1 } },
                    { text: "시내 쇼핑·카페 중심", scores: { metro: 2, amazing: 1 } },
                    { text: "자연·풍경(교토 아라시야마/나라 등)", scores: { jr: 2, hankyu: 1 } },
                    { text: "근교 소도시 여행(교토/고베/나라)", scores: { jr: 2, hankyu: 1, hanshin: 1 } },
                    { text: "USJ 방문", scores: { jr: 2 } }
                ]
            },
            {
                id: 2,
                question: "자연 풍경은 어느 정도 좋아하세요?",
                options: [
                    { text: "자연 풍경 좋아함", scores: { jr: 2, hankyu: 1 } },
                    { text: "보통이에요", scores: { amazing: 1 } },
                    { text: "아니요, 도시가 더 좋아요", scores: { metro: 2, amazing: 1 } }
                ]
            },
            {
                id: 3,
                question: "이번 여행에서 꼭 가보고 싶은 곳은 어디인가요? (복수 선택 가능)",
                options: [
                    { text: "교토 기온 / 후시미이나리", scores: { keihan: 2, jr: 1 } },
                    { text: "교토 아라시야마", scores: { hankyu: 2, jr: 1 } },
                    { text: "나라(사슴공원)", scores: { jr: 2 } },
                    { text: "고베", scores: { hanshin: 2, jr: 1 } },
                    { text: "USJ", scores: { jr: 2 } },
                    { text: "오사카성 / 우메다 / 난바 / 신사이바시", scores: { metro: 2, amazing: 2 } }
                ]
            },
            {
                id: 4,
                question: "근교 여행은 계획하고 계신가요?",
                options: [
                    { text: "네, 교토/고베/나라 가요", scores: { jr: 2 } }, // Additional logic handled in options if needed, but simple score add is fine
                    { text: "교토(아라시야마)", scores: { hankyu: 1 } },
                    { text: "교토(기온/후시미)", scores: { keihan: 1 } },
                    { text: "나라", scores: { jr: 1 } },
                    { text: "고베", scores: { hanshin: 1 } },
                    { text: "아니요, 시내 위주예요", scores: { metro: 2, amazing: 2 } }
                ]
            },
            {
                id: 5,
                question: "인기 관광지는 많이 방문하실 것 같나요?",
                options: [
                    { text: "많이 갈 것 같아요", scores: { amazing: 3 } },
                    { text: "1~2곳 정도요", scores: { metro: 1 } },
                    { text: "관심 없어요", scores: { metro: 2 } }
                ]
            },
            {
                id: 6,
                question: "여행 일정은 며칠인가요?",
                options: [
                    { text: "1~2일", scores: { metro: 2, amazing: 2 } },
                    { text: "3일 이상", scores: { jr: 2 } }
                ]
            },
            {
                id: 7,
                question: "교통 예산 스타일은 어떤 편인가요?",
                options: [
                    { text: "최대한 아끼고 싶어요", scores: { metro: 2, hankyu: 1, hanshin: 1, keihan: 1 } },
                    { text: "적당히 쓰는 편이에요", scores: { amazing: 1, jr: 1 } },
                    { text: "편하면 OK! 가성비보다 편의성", scores: { jr: 2 } }
                ]
            },
            {
                id: 8,
                question: "누구와 함께 여행하시나요?",
                options: [
                    { text: "가족/아이와 함께", scores: { jr: 1 } },
                    { text: "연인/친구", scores: { amazing: 1, metro: 1 } },
                    { text: "혼자 여행", scores: { metro: 1, hankyu: 1 } }
                ]
            }
        ],
        results: {
            metro: {
                name: "오사카 메트로 1일 패스",
                title: "당신은 오사카 시내 감성 여행자!",
                desc: "난바–신사이바시–우메다–덴노지까지 도시의 템포를 따라 가볍게 움직이는 스타일이시군요. 핫플·쇼핑·카페를 중심으로 시내만 부드럽게 누비고 싶다면 메트로 패스 한 장이면 충분해요.",
                route: "신사이바시 → 난바 → 우메다 → 덴노지",
                link: "#"
            },
            amazing: {
                name: "오사카 Amazing Pass (어메이징 패스)",
                title: "당신은 ‘관광지 알차게 즐기는’ 타입이에요!",
                desc: "오사카성, 우메다스카이, 도톤보리 크루즈… 명소를 빠짐없이 채우고 싶은 여행자라면 어메이징 패스가 가장 강력한 선택이에요. 관광지 입장 + 지하철/버스까지 ‘한 번에’ 해결되니 여행의 템포가 훨씬 가벼워져요.",
                route: "오사카성 → 우메다스카이 → 난바 크루즈",
                link: "#"
            },
            jr: {
                name: "JR 간사이 에어리어 패스",
                title: "당신은 근교 도시까지 함께 즐기고 싶은 타입!",
                desc: "교토·고베·나라까지 오사카만 보기엔 아쉬운 분에게 딱 맞는 패스예요. JR은 이동 속도도 빠르고 USJ(유니버셜시티역)까지도 바로 연결돼서 일정이 자연스럽게 풀리는 장점이 있어요.",
                route: "오사카 → 교토 → 나라 또는 오사카 → 고베 → USJ",
                link: "#"
            },
            hankyu: {
                name: "한큐 패스 (Osaka ↔ Kyoto)",
                title: "당신은 교토 감성 산책자를 닮았어요.",
                desc: "아라시야마의 한적함, 가와라마치의 골목 감성… 교토 서부 중심 여행을 꿈꾼다면 한큐는 가장 자연스러운 흐름이에요. 조용한 분위기와 여유로운 이동을 좋아하는 감성 여행자에게 잘 어울리는 패스예요.",
                route: "우메다 → 아라시야마 → 가와라마치",
                link: "#"
            },
            keihan: {
                name: "케이한 패스 (Osaka ↔ Kyoto East)",
                title: "교토 동부를 사랑하는 당신에게 딱!",
                desc: "후시미이나리, 기온, 청수사… 교토의 ‘고전적인 매력’을 경험하고 싶다면 가성비·속도·편의성 모두 케이한이 가장 좋아요. 오사카–교토 간 가장 직관적이고 깔끔한 이동 루트예요.",
                route: "욘마에스지 → 후시미이나리 → 기온 → 청수사",
                link: "#"
            },
            hanshin: {
                name: "한신 패스 (Osaka ↔ Kobe)",
                title: "당신은 항구 도시의 여유를 사랑하는 타입!",
                desc: "고베 산노미야, 모자이크, 아리마온천… 고베 특유의 분위기를 느끼며 하루를 보내고 싶다면 한신 패스가 가장 잘 맞아요. 짧고 감각적인 근교 여행을 꿈꾼다면 이 패스가 여행의 흐름을 더 부드럽게 만들어줄 거예요.",
                route: "난바 → 산노미야 → 모자이크 → 아리마",
                link: "#"
            }
        }
    },
    fukuoka: {
        title: "후쿠오카",
        questions: [
            {
                id: 1,
                question: "후쿠오카 여행에서 가장 중요한 요소는 무엇인가요?",
                options: [
                    { text: "시내 카페·맛집, 쇼핑 중심", scores: { city: 2, nishitetsu: 1 } },
                    { text: "자연·힐링(온천·강변·공원)", scores: { jr_north: 2, jr_all: 1 } },
                    { text: "전통·사찰·마을 산책(다자이후·야나가와)", scores: { nishitetsu: 2, city: 1 } },
                    { text: "근교 소도시 방문(유후인·벳푸·모지코·고쿠라 등)", scores: { jr_north: 2, jr_all: 1 } },
                    { text: "규슈 전체를 넓게 여행하고 싶음", scores: { jr_all: 2, jr_north: 1 } }
                ]
            },
            {
                id: 2,
                question: "여행 분위기는 어떤 걸 좋아하나요?",
                options: [
                    { text: "도시의 편리함과 감성", scores: { city: 2, nishitetsu: 1 } },
                    { text: "고즈넉한 전통과 조용한 거리", scores: { nishitetsu: 2, city: 1 } },
                    { text: "자연 풍경 좋아함", scores: { jr_all: 2, jr_north: 1 } },
                    { text: "온천 여행이 너무 끌림(벳푸·유후인 등)", scores: { jr_north: 2, jr_all: 1 } }
                ]
            },
            {
                id: 3,
                question: "꼭 가고 싶은 장소가 있나요? (복수 선택 가능)",
                options: [
                    { text: "다자이후", scores: { nishitetsu: 2, city: 1 } },
                    { text: "야나가와 뱃놀이", scores: { nishitetsu: 2 } },
                    { text: "오호리공원/모모치해변/텐진·하카타", scores: { city: 2, nishitetsu: 1 } },
                    { text: "유후인", scores: { jr_north: 2, jr_all: 1 } },
                    { text: "벳푸 온천", scores: { jr_north: 2, jr_all: 1 } },
                    { text: "고쿠라·모지코 레트로", scores: { jr_north: 2 } },
                    { text: "구마모토/나가사키/가고시마", scores: { jr_all: 2 } }
                ]
            },
            {
                id: 4,
                question: "후쿠오카 근교 여행 계획이 있나요?",
                options: [
                    { text: "시내만 볼 예정", scores: { city: 2 } },
                    { text: "다자이후 정도는 갈 듯", scores: { nishitetsu: 2, city: 1 } },
                    { text: "유후인·벳푸 같은 유명 온천지 가고 싶음", scores: { jr_north: 2 } },
                    { text: "규슈 전체 돌고 싶음", scores: { jr_all: 2 } }
                ]
            },
            {
                id: 5,
                question: "여행 스타일을 고른다면?",
                options: [
                    { text: "빠르게 이동하며 부지런하게 여행", scores: { city: 2, jr_north: 1 } },
                    { text: "여유롭게 마을·자연 산책", scores: { nishitetsu: 2, jr_north: 1 } },
                    { text: "이동 자체(기차 타기)가 즐거움", scores: { jr_north: 2, jr_all: 1 } },
                    { text: "일정 동안 도시 중심에서 힐링", scores: { city: 2 } }
                ]
            }
        ],
        results: {
            city: {
                name: "City Pass (후쿠오카 시내 1일 버스/지하철)",
                title: "당신은 후쿠오카 시내 감성여행자!",
                desc: "작고 아기자기한 도시 속에서 카페–쇼핑–산책–야경을 자연스럽게 이어가는 스타일. 이동이 많지 않고, 한 지역을 깊게 즐기고 싶은 당신에게 가벼운 시내패스가 딱 맞아요.",
                link: "#"
            },
            nishitetsu: {
                name: "Nishitetsu Pass (다자이후/야나가와)",
                title: "당신은 전통 감성 파인더!",
                desc: "도시의 화려함보다 고즈넉한 거리, 신사, 물가 풍경에 더 끌리는 스타일. 다자이후와 야나가와는 당신 여행의 주인공이 될 장소예요.",
                link: "#"
            },
            jr_north: {
                name: "JR 북큐슈 레일패스",
                title: "근교기차 탐험가 타입!",
                desc: "유후인, 벳푸, 모지코… 이름만 들어도 여행 감성 터지는 지역들을 좋아하는 당신. 기차 시간표만 잘 맞추면 하루에도 여러 소도시를 만날 수 있는 확장형 여행자예요.",
                link: "#"
            },
            jr_all: {
                name: "JR 전큐슈 레일패스",
                title: "규슈 대 모험가 타입!",
                desc: "구마모토, 나가사키, 가고시마까지 규슈 전체가 당신의 여행지도. 넓은 이동도 전혀 부담 없고 도시마다 다른 매력을 즐기는 스타일이에요.",
                link: "#"
            }
        }
    },
    tokyo: {
        title: "도쿄",
        branching: true,
        startQuestion: {
            id: 0,
            question: "이번 도쿄 여행은 어떤 분위기로 떠나고 싶으세요?",
            options: [
                { text: "도심 중심 여행 (쇼핑·도심 관광)", next: "city" },
                { text: "자연·근교 여행 포함 (후지·하코네·닛코 등)", next: "suburb" }
            ]
        },
        city: {
            questions: [
                {
                    id: 1,
                    question: "도심에서 가장 기대되는 여행 스타일은 무엇인가요?",
                    options: [
                        { text: "쇼핑 / 트렌드", scores: { subway: 2 } },
                        { text: "카페 / 전시 / 힙플레이스", scores: { subway: 2 } },
                        { text: "스카이트리·아사쿠사 같은 시내 관광", scores: { subway: 2 } },
                        { text: "JR 중심 역(신주쿠·우에노 등) 많이 이용할 듯", scores: { tokunai: 2 } }
                    ]
                },
                {
                    id: 2,
                    question: "꼭 들르고 싶은 곳을 골라주세요. (복수 선택 가능)",
                    options: [
                        { text: "시부야 / 신주쿠 / 하라주쿠 / 오모테산도", scores: { subway: 2 } },
                        { text: "우에노 / 아키하바라", scores: { subway: 1, tokunai: 1 } },
                        { text: "아사쿠사 / 스카이트리", scores: { subway: 2 } },
                        { text: "디즈니", scores: { disney: 2, subway: 1 } }
                    ]
                },
                {
                    id: 3,
                    question: "하루 이동량은 어느 정도인가요?",
                    options: [
                        { text: "여러 지역을 빠르게 이동하는 편", scores: { subway: 2 } },
                        { text: "느긋하게 1~2곳만", scores: { subway: 1 } }
                    ]
                },
                {
                    id: 4,
                    question: "여행 일정은 며칠인가요?",
                    options: [
                        { text: "1일", scores: { subway: 2 } },
                        { text: "2일", scores: { subway: 2 } },
                        { text: "3일", scores: { subway: 2 } },
                        { text: "JR 중심 루트가 많음", scores: { tokunai: 1 } }
                    ]
                }
            ],
            results: {
                subway: {
                    name: "Tokyo Subway Ticket (도쿄 지하철 24/48/72시간권)",
                    title: "도쿄 시내를 가볍게, 자유롭게.",
                    desc: "도쿄메트로 + 도에이 지하철을 정해진 시간 동안 무제한으로 이용할 수 있어요. 시부야·신주쿠·하라주쿠·아사쿠사까지 핫플들을 하루에도 여러 번 드나들 수 있는, ‘도심 여행자’의 가장 든든한 패스예요.",
                    link: "#"
                },
                tokunai: {
                    name: "Tokunai Pass (JR 도쿄 1일권)",
                    title: "JR 중심으로 톡톡 튀게 움직이고 싶은 당신에게.",
                    desc: "야마노테선 포함 JR 노선 대부분을 하루 동안 자유롭게 이용할 수 있어요. 신주쿠·시부야·우에노·아키하바라처럼 JR로 이동하는 구간이 많은 여행자라면 가장 자연스럽게 여행이 흘러가는 패스예요.",
                    link: "#"
                },
                disney: {
                    name: "디즈니 리조트 라인 패스",
                    title: "꿈과 환상의 나라로!",
                    desc: "디즈니 리조트를 중심으로 여행하신다면 필수! 디즈니랜드와 디즈니씨를 연결하는 모노레일을 자유롭게 이용하세요.",
                    link: "#"
                }
            }
        },
        suburb: {
            questions: [
                {
                    id: 1,
                    question: "어떤 근교 지역을 방문할 계획인가요? (복수 선택 가능)",
                    options: [
                        { text: "후지산·가와구치코", scores: { fuji: 2, wide: 1 } },
                        { text: "하코네", scores: { hakone: 2 } },
                        { text: "닛코", scores: { nikko: 2, wide: 1 } },
                        { text: "가루이자와", scores: { wide: 2 } },
                        { text: "근교 없음", scores: {} } // Should ideally redirect to city, but for simplicity just no score
                    ]
                },
                {
                    id: 2,
                    question: "일정은 며칠인가요?",
                    options: [
                        { text: "1일 당일치기", scores: { wide: 1 } },
                        { text: "2~3일", scores: { wide: 2 } } // Simplified logic, adding point to wide
                    ]
                },
                {
                    id: 3,
                    question: "자연·온천은 좋아하시나요?",
                    options: [
                        { text: "매우 좋아함", scores: { hakone: 2, fuji: 2, nikko: 2 } },
                        { text: "보통", scores: { wide: 1 } },
                        { text: "별로", scores: {} }
                    ]
                },
                {
                    id: 4,
                    question: "도심 + 근교를 함께 여행하나요?",
                    options: [
                        { text: "네, 둘 다 해요", scores: { wide: 3 } },
                        { text: "근교만 1~2곳", scores: {} } // Specific pass gets boost from Q1/Q3
                    ]
                },
                {
                    id: 5,
                    question: "이동 스타일은 어떤가요?",
                    options: [
                        { text: "JR 중심이 편함", scores: { wide: 2 } },
                        { text: "버스·유람선·로프웨이 경험 좋아함", scores: { hakone: 2, fuji: 2 } },
                        { text: "전통·자연·온천 중심", scores: { nikko: 2 } }
                    ]
                }
            ],
            results: {
                wide: {
                    name: "JR Tokyo Wide Pass (JR 광역 3일권)",
                    title: "도쿄를 베이스로 근교까지 시원하게 확장하고 싶다면.",
                    desc: "후지·닛코·가루이자와·이즈 등 도쿄 주변의 자연을 3일 동안 자유롭게 여행할 수 있는 광역 JR 패스예요. 멀리 이동하는 일정이 1~2일이라도 포함된다면 가성비가 크게 올라가는 패스입니다.",
                    link: "#"
                },
                hakone: {
                    name: "Hakone Freepass",
                    title: "온천·자연·케이블카·유람선을 한 번에!",
                    desc: "하코네 지역의 버스·로프웨이·해적선 유람선 등 모든 주요 이동을 패스 하나로 해결할 수 있어요. 온천과 자연을 여유롭게 즐기고 싶은 여행자에게 딱 맞는 조합이죠.",
                    link: "#"
                },
                fuji: {
                    name: "Fuji Area Pass",
                    title: "후지산과 호수들의 매력을 온전히 느끼고 싶다면.",
                    desc: "후지 지역의 버스·전철·케이블카·유람선까지 패스 하나로 모두 연결돼요. 뷰 포인트 중심의 여행에 가장 적합해요.",
                    link: "#"
                },
                nikko: {
                    name: "Nikko Pass",
                    title: "닛코의 신사·자연·온천을 한 번에 이어주는 패스.",
                    desc: "닛코 국립공원, 도쇼구, 온천 마을까지 현지 버스·전철을 자유롭게 이용하며 닛코의 깊은 자연을 여유롭게 체험할 수 있는 패스예요.",
                    link: "#"
                }
            }
        }
    },
    sapporo: {
        title: "삿포로",
        questions: [
            {
                id: 1,
                question: "이번 여행의 중심은 어디인가요?",
                options: [
                    { text: "삿포로 시내 맛집/카페/공원", scores: { subway: 2, welcome: 1 } },
                    { text: "오타루 운하 감성 여행", scores: { welcome: 2, jr: 1 } },
                    { text: "온천·자연(노보리베츠·도야 등)", scores: { jr: 2 } },
                    { text: "여러 도시를 묶은 일정", scores: { jr: 2 } }
                ]
            },
            {
                id: 2,
                question: "좋아하는 여행 분위기를 골라주세요.",
                options: [
                    { text: "도시 감성 (오도리·스스키노)", scores: { subway: 2 } },
                    { text: "감성 소도시(오타루)", scores: { welcome: 2 } },
                    { text: "온천·자연", scores: { jr: 2 } },
                    { text: "설경·대자연", scores: { jr: 2 } }
                ]
            },
            {
                id: 3,
                question: "꼭 가고 싶은 장소는 어디인가요? (복수 선택)",
                options: [
                    { text: "오도리공원·신궁·스스키노", scores: { subway: 2 } },
                    { text: "오타루 운하", scores: { welcome: 2 } },
                    { text: "노보리베츠", scores: { jr: 2 } },
                    { text: "도야호", scores: { jr: 2 } },
                    { text: "아사히카와 동물원", scores: { jr: 2 } },
                    { text: "비에이·후라노(청의호수/라벤더)", scores: { bus: 2 } } // Bus tour logic
                ]
            },
            {
                id: 4,
                question: "이동 범위를 골라주세요.",
                options: [
                    { text: "삿포로 시내 위주", scores: { subway: 2 } },
                    { text: "삿포로↔오타루만", scores: { welcome: 2 } },
                    { text: "온천/자연 포함 근교 이동", scores: { jr: 2 } },
                    { text: "도시 간 이동 많은 일정", scores: { jr: 2 } }
                ]
            },
            {
                id: 5,
                question: "여행 스타일을 골라주세요.",
                options: [
                    { text: "시내 곳곳을 빠르게 도는 편", scores: { subway: 2 } },
                    { text: "오타루 같은 소도시 하루 여행 좋아함", scores: { welcome: 2 } },
                    { text: "온천·대자연을 꼭 넣고 싶음", scores: { jr: 2 } },
                    { text: "이동거리가 길어도 OK", scores: { jr: 2 } }
                ]
            }
        ],
        results: {
            subway: {
                name: "Subway Pass",
                title: "당신은 삿포로 시내 감성 여행자!",
                desc: "여행의 중심은 오도리·스스키노·마루야마 같은 삿포로의 핵심 동선이네요. 지하철 패스 한 장이면 카페 → 공원 → 맛집 → 쇼핑 완벽한 도시 여행 루트를 만들 수 있어요.",
                link: "#"
            },
            welcome: {
                name: "Welcome Pass (삿포로–오타루)",
                title: "당신은 감성 소도시 스위처!",
                desc: "낮에는 오타루 운하에서 바닷바람을, 밤에는 삿포로에서 도시 야경을 즐기는 두 분위기를 모두 좋아하는 스타일이에요. Welcome Pass가 가장 부드럽고 효율적으로 두 도시를 이어줘요.",
                link: "#"
            },
            jr: {
                name: "JR 홋카이도 레일패스",
                title: "당신은 홋카이도 대모험가!",
                desc: "노보리베츠·도야·아사히카와 같은 광역 이동이 포함된 일정이 딱 맞는 성향이에요. 도시 사이의 이동이 많을수록 JR 패스는 체감 효율이 극대화됩니다.",
                link: "#"
            }
        }
    },
    okinawa: {
        title: "오키나와",
        questions: [
            {
                id: 1,
                question: "이번 여행의 중심 동선은 어디인가요?",
                options: [
                    { text: "나하 시내(국제거리·맛집·쇼핑)", scores: { yuirail: 2 } },
                    { text: "시내 + 공항·슈리성", scores: { yuirail: 2, integrated: 1 } },
                    { text: "본섬(북부/중부/남부) 여기저기 이동", scores: { bus: 2 } },
                    { text: "하루에 여러 지역 묶어 다닐 예정", scores: { integrated: 2, bus: 1 } }
                ]
            },
            {
                id: 2,
                question: "가장 편하다고 느끼는 이동 방식은 무엇인가요?",
                options: [
                    { text: "모노레일이 제일 편함", scores: { yuirail: 2 } },
                    { text: "버스로 이동하는 여행 선호", scores: { bus: 2 } },
                    { text: "모노레일+버스 조합이 좋아 보임", scores: { integrated: 2 } },
                    { text: "운전이 더 편함 / 렌트카 생각 중", scores: { rent: 99 } } // Flag for rent
                ]
            },
            {
                id: 3,
                question: "꼭 가고 싶은 장소를 골라주세요 (복수 선택)",
                options: [
                    { text: "국제거리·슈리성·오모로마치(DFS)", scores: { yuirail: 2 } },
                    { text: "아메리칸 빌리지(자탄)", scores: { bus: 2 } },
                    { text: "츄라우미 수족관", scores: { bus: 2 } },
                    { text: "나고·온나촌·만좌모", scores: { bus: 2 } },
                    { text: "남부(평화기념공원 / 절 / 해변)", scores: { bus: 1, integrated: 1 } },
                    { text: "리조트에서 쉬면서 주변만 산책할 예정", scores: { rent: 99 } }
                ]
            },
            {
                id: 4,
                question: "여행 일정은 어떻게 구성되어 있나요?",
                options: [
                    { text: "1~2일 단기 + 나하 중심", scores: { yuirail: 2 } },
                    { text: "3일 이상 시내 중심", scores: { yuirail: 2 } },
                    { text: "3일 이상 본섬 곳곳 이동", scores: { bus: 2 } },
                    { text: "시내 + 해변 + 소도시 모두 가보고 싶음", scores: { integrated: 2 } }
                ]
            },
            {
                id: 5,
                question: "당신의 여행 스타일을 골라주세요",
                options: [
                    { text: "쇼핑·맛집·시내 중심", scores: { yuirail: 2 } },
                    { text: "해변·리조트·카페 위주", scores: { bus: 2 } },
                    { text: "본섬 넓은 지역을 하나씩 가보고 싶음", scores: { bus: 2 } },
                    { text: "렌트카로 자유롭게 다니고 싶음", scores: { rent: 99 } }
                ]
            }
        ],
        results: {
            yuirail: {
                name: "Yui Rail Pass (유이레일 패스)",
                title: "당신은 나하 시내 감성 여행자!",
                desc: "국제거리·슈리성·오모로마치 같은 나하 중심 여행이 계획 속 핵심이네요. 짧은 일정이거나 시내 중심으로 움직일수록 유이레일 패스의 효율은 탁월해요.",
                link: "#"
            },
            bus: {
                name: "Okinawa Route Bus Free Pass (노선버스 무제한)",
                title: "당신은 본섬 탐험가 스타일!",
                desc: "아메리칸 빌리지, 만좌모, 츄라우미 수족관… 오키나와 본섬 주요 스폿을 버스로 이동하며 즐기고 싶다면 이 패스가 정확해요. 시내 + 해변 + 소도시를 모두 포함한 일정에 가장 효율적!",
                link: "#"
            },
            integrated: {
                name: "Bus + Yui Rail 통합 패스",
                title: "당신은 균형형 여행자!",
                desc: "시내도 좋아하고, 자탄·남부 등 근교도 가고 싶고, 렌트 없이 대중교통으로 여행하고 싶은 타입이에요. 두 패스를 합친 통합 패스는 전 구간을 가장 스트레스 없이 연결해줘요.",
                link: "#"
            }
        }
    }
};
