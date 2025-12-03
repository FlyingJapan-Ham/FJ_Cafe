document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const landingPage = document.getElementById('landing-page');
    const quizPage = document.getElementById('quiz-page');
    const resultPage = document.getElementById('result-page');

    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');

    const progressBar = document.getElementById('progress-bar');
    const qNumSpan = document.getElementById('q-num');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const quizContent = document.getElementById('quiz-content'); // Animation wrapper

    // Result Elements
    const resultName = document.getElementById('result-name');
    const resultTitle = document.getElementById('result-title');
    const resultTags = document.getElementById('result-tags');
    const resultFeatures = document.getElementById('result-features');
    const resultReason = document.getElementById('result-reason');
    const resultLink = document.getElementById('result-link');

    // State
    let currentQuestionIndex = 0;
    let scores = {
        tokyo: 0,
        osaka: 0,
        kyoto: 0,
        hokkaido: 0,
        okinawa: 0,
        fukuoka: 0
    };

    // Event Listeners
    startBtn.addEventListener('click', startQuiz);
    restartBtn.addEventListener('click', resetQuiz);

    function startQuiz() {
        landingPage.classList.remove('active');
        landingPage.classList.add('hidden'); // Ensure it's hidden

        quizPage.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        setTimeout(() => {
            quizPage.classList.add('active');
        }, 10);

        loadQuestion();
    }

    function loadQuestion() {
        const question = quizData.questions[currentQuestionIndex];

        // Update Progress
        const progress = ((currentQuestionIndex) / quizData.questions.length) * 100;
        progressBar.style.width = `${progress}%`;

        // Update Text
        qNumSpan.textContent = question.id;
        questionText.textContent = question.question;

        // Clear previous options
        optionsContainer.innerHTML = '';

        // Create new options
        question.options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option.text;
            btn.addEventListener('click', () => handleAnswer(option.scores));
            optionsContainer.appendChild(btn);
        });
    }

    function handleAnswer(points) {
        // Add scores
        for (const [city, score] of Object.entries(points)) {
            if (scores[city] !== undefined) {
                scores[city] += score;
            }
        }

        // Animate out
        quizContent.classList.add('fade-out');

        setTimeout(() => {
            // Next question or finish
            currentQuestionIndex++;

            if (currentQuestionIndex < quizData.questions.length) {
                loadQuestion();
                // Animate in
                quizContent.classList.remove('fade-out');
                quizContent.classList.add('fade-in');

                setTimeout(() => {
                    quizContent.classList.remove('fade-in');
                }, 300); // Match CSS transition duration
            } else {
                showResult();
            }
        }, 300); // Match CSS transition duration
    }

    function showResult() {
        quizPage.classList.remove('active');
        quizPage.classList.add('hidden');

        // Calculate winner
        const sortedCities = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        const winnerKey = sortedCities[0][0];
        const winnerData = quizData.results[winnerKey];

        // Populate Result Page
        resultName.textContent = winnerData.name;
        resultTitle.textContent = winnerData.title;
        resultReason.textContent = winnerData.reason;
        resultLink.textContent = winnerData.linkText;
        resultLink.href = winnerData.linkUrl;

        // Tags
        resultTags.innerHTML = '';
        winnerData.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = `#${tag}`;
            resultTags.appendChild(span);
        });

        // Features
        resultFeatures.innerHTML = '';
        winnerData.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            resultFeatures.appendChild(li);
        });

        // Show page
        resultPage.classList.remove('hidden');
        setTimeout(() => {
            resultPage.classList.add('active');
        }, 10);

        // Render Chart
        renderChart(scores);
    }

    let myChart = null;

    function renderChart(scores) {
        const ctx = document.getElementById('radarChart').getContext('2d');

        // Data preparation
        // Order: Tokyo, Osaka, Kyoto, Hokkaido, Okinawa, Fukuoka
        const labels = ['도쿄', '오사카', '교토', '홋카이도', '오키나와', '후쿠오카'];
        const data = [
            scores.tokyo,
            scores.osaka,
            scores.kyoto,
            scores.hokkaido,
            scores.okinawa,
            scores.fukuoka
        ];

        if (myChart) {
            myChart.destroy();
        }

        myChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [{
                    label: '나의 여행 성향',
                    data: data,
                    backgroundColor: 'rgba(59, 130, 246, 0.2)', // Primary color with opacity
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(59, 130, 246, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 10, // Adjust based on max possible score
                        ticks: {
                            stepSize: 2,
                            backdropColor: 'transparent' // Hide white background behind numbers
                        },
                        pointLabels: {
                            font: {
                                size: 12,
                                family: "'Noto Sans KR', sans-serif",
                                weight: 'bold'
                            },
                            color: '#1F2937'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    function resetQuiz() {
        // Reset State
        currentQuestionIndex = 0;
        scores = {
            tokyo: 0,
            osaka: 0,
            kyoto: 0,
            hokkaido: 0,
            okinawa: 0,
            fukuoka: 0
        };

        // UI Reset
        resultPage.classList.remove('active');
        resultPage.classList.add('hidden');

        landingPage.classList.remove('hidden');
        setTimeout(() => {
            landingPage.classList.add('active');
        }, 10);

        // Reset quiz content styles just in case
        quizContent.classList.remove('fade-out', 'fade-in');
    }
});
