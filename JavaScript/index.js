const questions = {
    question1: ["Nous serons présents à la foire de rouen, envisagez-vous de venir ?", 0, ["a. Oui", "a. Non"]],
    question2: ["Si vous avez un jardin, avez-vous un potager ?", 0, ["a. Oui", "b. Non", "c. Je n'ai pas de jardin"]],
    question3: ["Sur une échelle de 0 à 10, quelle importance accordez-vous au caractère écologique ?", 1],
    question4: ["Sur une échelle de 0 à 10, seriez-vous interressé par l'achat de décrorations interieures (petit terrarium) ?", 1],
    question5: ["Et quel est le prix maximum que vous seriez prêt à mettre pour ce type de produit ?", 0, ["a. 5 à 15 €", "a. 15 à 25 €", "a. 25 à 35 €", "a. 35 à 45 €"]],
    question6: ["Préféreriez-vous un terrarium tout fait ou un kit pour l'assembler vous même ?", 0, ["1. Kit", "2. Tout fait"]],
};
let dataAnswers = {
    question1: ["Nous serons présents à la foire de rouen, envisagez-vous de venir ?", ""],
    question2: ["Si vous avez un jardin, avez-vous un potager ?", ""],
    question3: ["Sur une échelle de 0 à 10, quelle importance accordez-vous au caractère écologique ?", ""],
    question4: ["Sur une échelle de 0 à 10, seriez-vous interressé par l'achat de décrorations interieures (petit terrarium) ?", ""],
    question5: ["Et quel est le prix maximum que vous seriez prêt à mettre pour ce type de produit ?", ""],
    question6: ["Préféreriez-vous un terrarium tout fait ou un kit pour l'assembler vous même ?", ""],
};

let questionLevel = 1;
let buttonPosition = 0;
let answers = [];

window.addEventListener("load", () => {
    newQuestion();
});

const newQuestion = () => {
    injectQuestion.textContent = questions["question"+questionLevel][0];
    if (questions["question"+questionLevel][1] === 0) {
        if (questions["question"+questionLevel][2][2] == undefined) {
            injectAnswer.innerHTML = `
            <div class="answer-type-1">
                <ul>
                    <li class="test">${questions["question"+questionLevel][2][0]}</li>
                    <li>${questions["question"+questionLevel][2][1]}</li>
                </ul>
            </div>`;
        } else if (questions["question"+questionLevel][2][3] == undefined) {
            injectAnswer.innerHTML = `
            <div class="answer-type-1">
                <ul>
                    <li class="test">${questions["question"+questionLevel][2][0]}</li>
                    <li>${questions["question"+questionLevel][2][1]}</li>
                    <li>${questions["question"+questionLevel][2][2]}</li>
                </ul>
            </div>`;
        } else {
            injectAnswer.innerHTML = `
            <div class="answer-type-1">
                <ul>
                    <li class="test">${questions["question"+questionLevel][2][0]}</li>
                    <li>${questions["question"+questionLevel][2][1]}</li>
                    <li>${questions["question"+questionLevel][2][2]}</li>
                    <li>${questions["question"+questionLevel][2][3]}</li>
                </ul>
            </div>`;
        };
        answers = document.querySelectorAll(".answer-type-1 ul li");
    } else if (questions["question"+questionLevel][1] === 1) {
        injectAnswer.innerHTML = `
        <div class="answer-type-2">
            <ul>
                <li>0</li>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li>10</li>
            </ul>
        </div>`
        answers = document.querySelectorAll(".answer-type-2 ul li");
    };
    newAnswers();
};

const newAnswers = () => {
    answers.forEach(answer => {
        answer.addEventListener("click", () => {
            answers.forEach(answer2 => {
                answer2.classList.remove("answer-clicked");
            });
            dataAnswers["question"+questionLevel][1] = answer.textContent;
            answer.classList.add("answer-clicked");
            nextButton.classList.add("approved-button");
            buttonPosition = 1;
        });
    });
};

nextButton.addEventListener("click" , () => {
    if (buttonPosition === 1) {
        questionLevel++;
        answers.forEach(answer2 => {
            answer2.classList.remove("answer-clicked");
        });
        buttonPosition = 0;
        nextButton.classList.remove("approved-button");
        
        if (questionLevel <= 6) {
            newQuestion();
        } else {
            sendAnswers();
            injectQuestion.textContent = "Merci ! Vos réponses sont envoyées.";
            injectAnswer.innerHTML = ``;
            nextButton.remove();
        }
    };
});

const sendAnswers = () => {
    const webhookUrl = 'https://discord.com/api/webhooks/1161646434291032124/8VPUuE0Z66yg64Xih1OTdj9HWAFJPdQGuvK26BhdK9Q7eVfNL7bIznrmRDv3wYZ558uT';
    const message = `
    Answers :
    Question1 : ${dataAnswers.question1[1]};
    Question2 : ${dataAnswers.question2[1]};
    Question3 : ${dataAnswers.question3[1]};
    Question4 : ${dataAnswers.question4[1]};
    Question5 : ${dataAnswers.question5[1]};
    Question6 : ${dataAnswers.question6[1]};
    `;
    fetch(webhookUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: message }),
    })
    .then(response => {
        if (response.ok) {
        console.log('Réponses envoyées');
        } else {
        console.error('Erreur lors de l\'envoi des réponses:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi des réponses:', error);
    });
};