class PersonalTest {
    constructor(target) {
        this.container = document.querySelector(target);
        this.page = 0;
        this.progress = 0;
        this.questions = [
            {
                question: "우리가 처음 만난 날 처음 먹은 술은?",
                options: ["카스", "테라", "참이슬", "처음처럼", "연태고량주"],
                answer: 2
            },
            {
                question: "우리가 처음 사귄 날은?",
                options: ["9월 16일", "9월 17일", "9월 18일", "9월 19일", "9월 20일"],
                answer: 1
            },
            {
                question: "우리가 크리스마스때 먹은 것은?",
                options: ["소고기 스테이크", "해물 알리오올리오 파스타", "칵테일", "처음처럼", "탕후루"],
                answer: 2
            },
            {
                question: "다음중 김예준 설명으로 틀린 것은?",
                options: ["2월 생이다.", "재은이를 좋아한다.", "마음속에 재은이 밖에 없다.", "자기 전에 거울을 보며 춤을 꼭 추고 잔다."],
                answer: 3
            }
        ];
        this.results = [];
        this.init();
    }

    init() {
        this.render();

        const startButton = this.container.querySelector('button[data-action="start"]');
        const restartButton = this.container.querySelector('button[data-action="restart"]');
        
        startButton.addEventListener('click', this.start.bind(this));
        restartButton.addEventListener('click', this.restart.bind(this));

        this.questions.forEach((question, index) => {
            const answerButtons = this.container.querySelectorAll(`button[data-question="${index}"]`);
            answerButtons.forEach((button, buttonIndex) => {
                button.addEventListener('click', () => this.submitAnswer(index, buttonIndex));
            });
        });
    }

    start() {
        if (this.progress !== 0) return;
        this.page = 1;
        this.render();
    }

    restart() {
        this.page = 0;
        this.progress = 0;
        this.results = [];
        this.render();
    }

    submitAnswer(questionIndex, selectedOptionIndex) {
        const correctAnswer = this.questions[questionIndex].answer;
        this.results.push(selectedOptionIndex === correctAnswer ? 1 : 0);

        if (this.progress < this.questions.length - 1) {
            this.progress++;
        } else {
            this.page = 2;
        }
        this.render();
    }

    render() {
        // 기존 렌더링 로직 유지

        if (this.page === 2) {
            const score = this.results.reduce((acc, curr) => acc + curr, 0);
            const totalQuestions = this.questions.length;
            const scorePercentage = (score / totalQuestions) * 100;
            let resultMessage = "";

            switch (true) { // 점수에 따른 메시지 분기 처리
                case (scorePercentage === 100):
                    resultMessage = "당신은 예준 전문가!";
                    break;
                case (scorePercentage >= 75):
                    resultMessage = "아쉬워요...";
                    break;
                case (scorePercentage >= 50):
                    resultMessage = "좀 더 분발하세요!";
                    break;
                case (scorePercentage >= 25):
                    resultMessage = "좀 실망인데요..?";
                    break;
                default:
                    resultMessage = "잠시 시간을 갖자..";
            }

            const resultContainer = this.container.querySelector('.result_container');
            resultContainer.innerHTML = `당신의 점수는 ${scorePercentage.toFixed(2)}점입니다. ${resultMessage}`;
        }
    }

    // 기존 메소드 유지
}