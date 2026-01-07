// Script compartido para manejar los cuestionarios de todas las materias

class QuizHandler {
    constructor(correctAnswers, quizName) {
        this.correctAnswers = correctAnswers;
        this.quizName = quizName;
    }

    checkAnswers() {
        let correct = 0;
        let incorrect = 0;
        const form = document.getElementById('quiz-form');
        const questions = form.querySelectorAll('.quiz-question');
        const totalQuestions = Object.keys(this.correctAnswers).length;

        // Resetear estilos previos
        questions.forEach(question => {
            question.classList.remove('correct', 'incorrect');
            const labels = question.querySelectorAll('label');
            labels.forEach(label => label.classList.remove('correct-answer', 'wrong-answer'));
        });

        // Verificar respuestas
        for (let i = 1; i <= totalQuestions; i++) {
            const selectedAnswer = form.querySelector(`input[name="q${i}"]:checked`);
            const questionDiv = questions[i - 1];
            
            if (selectedAnswer) {
                if (selectedAnswer.value === this.correctAnswers[`q${i}`]) {
                    correct++;
                    questionDiv.classList.add('correct');
                    selectedAnswer.parentElement.classList.add('correct-answer');
                } else {
                    incorrect++;
                    questionDiv.classList.add('incorrect');
                    selectedAnswer.parentElement.classList.add('wrong-answer');
                    // Mostrar la respuesta correcta
                    const correctLabel = questionDiv.querySelector(`input[value="${this.correctAnswers[`q${i}`]}"]`).parentElement;
                    correctLabel.classList.add('correct-answer');
                }
            } else {
                incorrect++;
                questionDiv.classList.add('incorrect');
            }
        }

        // Mostrar resultados
        this.displayResults(correct, incorrect, totalQuestions);
    }

    displayResults(correct, incorrect, total) {
        document.getElementById('correct-count').textContent = correct;
        document.getElementById('incorrect-count').textContent = incorrect;
        const percentage = (correct / total) * 100;
        document.getElementById('score-percentage').textContent = percentage.toFixed(0) + '%';

        // Mensaje de retroalimentación
        const feedbackDiv = document.getElementById('feedback-message');
        if (percentage === 100) {
            feedbackDiv.innerHTML = '<i class="fas fa-star"></i> ¡Excelente! Dominas perfectamente el tema.';
            feedbackDiv.className = 'feedback-message excellent';
        } else if (percentage >= 70) {
            feedbackDiv.innerHTML = '<i class="fas fa-thumbs-up"></i> ¡Muy bien! Buen dominio del contenido.';
            feedbackDiv.className = 'feedback-message good';
        } else if (percentage >= 50) {
            feedbackDiv.innerHTML = '<i class="fas fa-book"></i> Bien, pero puedes mejorar. Revisa los temas.';
            feedbackDiv.className = 'feedback-message average';
        } else {
            feedbackDiv.innerHTML = '<i class="fas fa-book-reader"></i> Necesitas repasar más. ¡Tú puedes!';
            feedbackDiv.className = 'feedback-message poor';
        }

        // Mostrar resultados y ocultar botón
        document.getElementById('quiz-result').style.display = 'block';
        document.querySelector('.submit-quiz-btn').style.display = 'none';
        
        // Scroll suave a resultados
        document.getElementById('quiz-result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    retry() {
        // Resetear formulario
        document.getElementById('quiz-form').reset();
        
        // Remover clases de resultados
        const questions = document.querySelectorAll('.quiz-question');
        questions.forEach(question => {
            question.classList.remove('correct', 'incorrect');
            const labels = question.querySelectorAll('label');
            labels.forEach(label => label.classList.remove('correct-answer', 'wrong-answer'));
        });

        // Ocultar resultados y mostrar botón
        document.getElementById('quiz-result').style.display = 'none';
        document.querySelector('.submit-quiz-btn').style.display = 'block';

        // Scroll al inicio del cuestionario
        document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
    }
}

// Smooth scroll para anclas
document.addEventListener('DOMContentLoaded', function() {
    const anchors = document.querySelectorAll('.topic-navigation a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Agregar efecto visual temporal
                targetElement.style.animation = 'highlight 1s ease';
                setTimeout(() => {
                    targetElement.style.animation = '';
                }, 1000);
            }
        });
    });
});

// Agregar animación de highlight
const style = document.createElement('style');
style.textContent = `
    @keyframes highlight {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); box-shadow: 0 10px 40px rgba(0,0,0,0.2); }
    }
`;
document.head.appendChild(style);
