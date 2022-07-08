let currentQuestion = 0;
let currentAnswer = 0;

showQuestion();

document.querySelector('.reset').addEventListener('click', reset);

function showQuestion () {
    
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];
        
        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.bar--progress').style.width = `${pct}%`;
        
        document.querySelector('.question--field').style.display = 'flex';
        document.querySelector('.score--field').style.display = 'none'; 
        
        document.querySelector('.questions').innerHTML = q.question;

        let optionsHtml = '';

        for(let i in q.options) {
            optionsHtml += 
            `<div class="mb-2 list-group option" data-op="${i}">
                <div class="list-group-item list-group-item-action d-flex align-items-center">
                    <span class="badge bg-primary rounded-pill me-2">${(parseInt(i) + 1)}</span>
                    ${q.options[i]}
                </div>
            </div>`; 
        }

        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(e => {
            e.addEventListener('click', selectOption);
        });
    } else {
        finishQuiz();
    }
}

function selectOption (e) {
    let clickedOption = parseInt(e.currentTarget.getAttribute('data-op'));    

    if(questions[currentQuestion].answer === clickedOption) {
        currentAnswer++;
    }

    currentQuestion++;
    showQuestion();    
}

function finishQuiz () {
    let points = Math.floor((currentAnswer / questions.length) * 100);

    if(points < 40) {
        document.querySelector('.score--text--1').innerHTML = 'Tá ruim em?!';
        document.querySelector('.score--pct').style.color = '#DF0101';
    } else if(points >= 40 && points < 70) {
        document.querySelector('.score--text--1').innerHTML = 'Muito bom!';
        document.querySelector('.score--pct').style.color = '#FFFF00';
    } else if(points > 70) {
        document.querySelector('.score--text--1').innerHTML = 'Você é um alienígena!';
        document.querySelector('.score--pct').style.color = '#00FF40';
    }

    document.querySelector('.score--pct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.score--text--2'). innerHTML = `Você respondeu ${questions.length} e acertou ${currentAnswer}`;    

    document.querySelector('.question--field').style.display = 'none';
    document.querySelector('.score--field').style.display = 'flex';    

    document.querySelector('.bar--progress').style.width = '100%';
}

function reset () {
    currentQuestion = 0;
    currentAnswer = 0;
    showQuestion();
}
