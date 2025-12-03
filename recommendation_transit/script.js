document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const regionPage = document.getElementById('region-page');
    const introPage = document.getElementById('intro-page');
    const quizPage = document.getElementById('quiz-page');
    const resultPage = document.getElementById('result-page');

    const introTitle = document.getElementById('intro-title');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const restartBtn = document.getElementById('restart-btn');
    const homeBtn = document.getElementById('home-btn');

    const progressBar = document.getElementById('progress-bar');
    const qNumSpan = document.getElementById('q-num');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const quizContent = document.getElementById('quiz-content');

    // Result Elements
    const resultName = document.getElementById('result-name');
    const resultTitle = document.getElementById('result-title');
    const resultDesc = document.getElementById('result-desc');
    const resultRouteContainer = document.getElementById('result-route-container');
    const resultRoute = document.getElementById('result-route');
    const resultLink = document.getElementById('result-link');
    const extraInfo = document.getElementById('extra-info');

    // State
    let currentRegion = null;
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let scores = {};
    let rentFlag = false; // For Okinawa
    let isTransitioning = false; // Prevent double clicks

    // Event Listeners
    document.querySelectorAll('.region-btn').forEach(btn => {
        btn.addEventListener('click', () => selectRegion(btn.dataset.region));
    });

    startQuizBtn.addEventListener('click', startQuiz);
    restartBtn.addEventListener('click', () => selectRegion(currentRegion)); // Restart same region
    homeBtn.addEventListener('click', goHome);

    function selectRegion(region) {
        currentRegion = region;
        const data = transitData[region];

        // Reset State
        scores = {};
        rentFlag = false;
        currentQuestionIndex = 0;

        // Setup Intro
        introTitle.innerHTML = `${data.title} 여행 스타일을<br>알려주세요`;

        // Transition
        regionPage.classList.remove('active');
        regionPage.classList.add('hidden');

        resultPage.classList.remove('active');
        resultPage.classList.add('hidden');

        introPage.classList.remove('hidden');
        setTimeout(() => {
            introPage.classList.add('active');
        }, 10);
    }

    function startQuiz() {
        introPage.classList.remove('active');
        introPage.classList.add('hidden');

        quizPage.classList.remove('hidden');
        setTimeout(() => {
            quizPage.classList.add('active');
        }, 10);

        // Handle Tokyo Branching Logic
        if (currentRegion === 'tokyo' && transitData.tokyo.branching) {
            loadTokyoStartQuestion();
        } else {
            currentQuestions = transitData[currentRegion].questions;
            loadQuestion();
        }
    }

    function loadTokyoStartQuestion() {
        const q0 = transitData.tokyo.startQuestion;
        qNumSpan.textContent = "0"; // Special case
        questionText.textContent = q0.question;
        optionsContainer.innerHTML = '';

        q0.options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option.text;
            btn.addEventListener('click', () => {
                if (isTransitioning) return;
                // Set the question set based on selection
                currentQuestions = transitData.tokyo[option.next].questions;
                // Animate and load first real question
                animateNextQuestion();
            });
            optionsContainer.appendChild(btn);
        });
    }

    function loadQuestion() {
        const question = currentQuestions[currentQuestionIndex];

        // Safety check
        if (!question) {
            console.error("Question not found!");
            return;
        }

        // Update Progress
        const progress = ((currentQuestionIndex) / currentQuestions.length) * 100;
        progressBar.style.width = `${progress}%`;

        // Update Text
        qNumSpan.textContent = question.id;
        questionText.textContent = question.question;

        // Clear previous options
        optionsContainer.innerHTML = '';

        // Check if multiple choice
        const isMultiple = question.question.includes('복수 선택');
        let tempScores = {}; // To track selections for multiple choice

        // Create new options
        question.options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option.text;

            if (isMultiple) {
                btn.addEventListener('click', () => {
                    btn.classList.toggle('selected');
                    // We don't add scores yet, just visual toggle
                });
            } else {
                btn.addEventListener('click', () => {
                    if (isTransitioning) return;
                    handleAnswer(option.scores);
                });
            }
            optionsContainer.appendChild(btn);
        });

        // If multiple choice, add a Next button
        if (isMultiple) {
            const nextBtn = document.createElement('button');
            nextBtn.className = 'primary-btn';
            nextBtn.style.marginTop = '20px';
            nextBtn.textContent = '다음';
            nextBtn.addEventListener('click', () => {
                if (isTransitioning) return;

                // Aggregate scores from selected options
                const selectedBtns = optionsContainer.querySelectorAll('.option-btn.selected');
                if (selectedBtns.length === 0) {
                    alert("하나 이상 선택해주세요.");
                    return;
                }

                selectedBtns.forEach(btn => {
                    // Find the option data that matches the button text
                    const optData = question.options.find(o => o.text === btn.textContent);
                    if (optData) {
                        for (const [key, score] of Object.entries(optData.scores)) {
                            if (key === 'rent') {
                                rentFlag = true;
                            } else {
                                scores[key] = (scores[key] || 0) + score;
                            }
                        }
                    }
                });

                animateNextQuestion();
            });
            optionsContainer.appendChild(nextBtn);
        }
    }

    function handleAnswer(points) {
        // Add scores
        for (const [key, score] of Object.entries(points)) {
            if (key === 'rent') {
                rentFlag = true;
            } else {
                scores[key] = (scores[key] || 0) + score;
            }
        }

        animateNextQuestion();
    }

    function animateNextQuestion() {
        if (isTransitioning) return;
        isTransitioning = true;

        quizContent.classList.add('fade-out');

        setTimeout(() => {
            currentQuestionIndex++;

            if (currentQuestionIndex < currentQuestions.length) {
                loadQuestion();
                quizContent.classList.remove('fade-out');
                quizContent.classList.add('fade-in');

                setTimeout(() => {
                    quizContent.classList.remove('fade-in');
                    isTransitioning = false;
                }, 300);
            } else {
                showResult();
                isTransitioning = false;
            }
        }, 300);
    }

    function showResult() {
        quizPage.classList.remove('active');
        quizPage.classList.add('hidden');

        // Calculate Winner
        // Sort scores descending
        const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);

        let winnerKey;
        if (sortedScores.length > 0) {
            winnerKey = sortedScores[0][0];
        } else {
            // Fallback if no scores (unlikely)
            winnerKey = Object.keys(transitData[currentRegion].results || transitData[currentRegion].city.results)[0];
        }

        // Get Result Data
        let resultData;
        if (currentRegion === 'tokyo') {
            // Check which branch we are in by checking if the winnerKey exists in city or suburb results
            if (transitData.tokyo.city.results[winnerKey]) {
                resultData = transitData.tokyo.city.results[winnerKey];
            } else {
                resultData = transitData.tokyo.suburb.results[winnerKey];
            }
        } else {
            resultData = transitData[currentRegion].results[winnerKey];
        }

        // Populate Result Page
        resultName.textContent = resultData.name;
        resultTitle.textContent = resultData.title;
        resultDesc.textContent = resultData.desc;
        resultLink.href = resultData.link;

        if (resultData.route) {
            resultRouteContainer.classList.remove('hidden');
            resultRoute.textContent = resultData.route;
        } else {
            resultRouteContainer.classList.add('hidden');
        }

        // Extra Info (Rent-a-car for Okinawa)
        extraInfo.innerHTML = '';
        extraInfo.classList.add('hidden');

        if (currentRegion === 'okinawa' && rentFlag) {
            extraInfo.classList.remove('hidden');
            extraInfo.innerHTML = `
                <h4>+ 렌트카 부가 안내</h4>
                <p>“렌트카가 더 편한 스타일이시군요!”<br>
                오키나와는 이동 거리가 길고, 해변·리조트·카페가 곳곳에 흩어져 있어 렌트카가 가장 효율적인 선택일 때도 많아요.
                이번 결과는 대중교통 중심 기준의 추천이며, 특히 본섬을 넓게 여행하거나 리조트 중심 일정이라면 “렌트카 + 부분적 패스조합”도 고려해보세요.</p>
            `;
        }

        // Sapporo Bus Tour Logic (simplified: check if 'bus' score exists and is high, or just hardcode for now based on prompt)
        // Prompt says: "Additional Recommendation (Auto-exposed when Nature choice is high)"
        // I'll check if 'bus' score > 0 for Sapporo
        if (currentRegion === 'sapporo' && scores['bus'] > 0) {
            extraInfo.classList.remove('hidden');
            extraInfo.innerHTML = `
                <h4>🌲 부가 추천</h4>
                <p>“비에이·후라노도 고민 중이신가요?”<br>
                청의 호수, 패치워크 로드, 라벤더 농장은 JR 단독 이동이 힘든 지역이에요.
                버스투어를 함께 고려하시면 사진 스팟을 가장 효율적으로 방문할 수 있어요.</p>
            `;
        }


        // Show page
        resultPage.classList.remove('hidden');
        setTimeout(() => {
            resultPage.classList.add('active');
        }, 10);
    }

    function goHome() {
        resultPage.classList.remove('active');
        resultPage.classList.add('hidden');

        regionPage.classList.remove('hidden');
        setTimeout(() => {
            regionPage.classList.add('active');
        }, 10);
    }
});
