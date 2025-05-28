document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const steps = document.querySelectorAll('.step');
    const sendCodeBtn = document.getElementById('send-code-btn');
    const verifyCodeBtn = document.getElementById('verify-code-btn');
    const changePasswordBtn = document.getElementById('change-password-btn');
    const resendCodeLink = document.getElementById('resend-code');
    const codeInputs = document.querySelectorAll('.code-input input');
    const passwordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordError = document.getElementById('password-error');
    const successMessage = document.getElementById('success-message');
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');
    
    // Переключение видимости пароля
    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });
    
    // Маска для телефона
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '') + (x[4] ? '-' + x[4] : '');
    });
    
    // Отправка кода (шаг 1)
    sendCodeBtn.addEventListener('click', function() {
        // Здесь должна быть реальная отправка кода
        startTimer();
        goToStep(2);
    });
    
    // Ввод кода (шаг 2)
    codeInputs.forEach((input, index) => {
        // Обработка ввода
        input.addEventListener('input', function() {
            if (this.value.length === 1) {
                if (index < codeInputs.length - 1) {
                    codeInputs[index + 1].focus();
                }
            }
            
            // Проверка заполненности всех полей
            const allFilled = Array.from(codeInputs).every(input => input.value.length === 1);
            verifyCodeBtn.disabled = !allFilled;
        });
        
        // Обработка удаления
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
                codeInputs[index - 1].focus();
            }
        });
    });
    
    // Подтверждение кода (шаг 2)
    verifyCodeBtn.addEventListener('click', function() {
        // Здесь должна быть проверка кода
        goToStep(3);
    });
    
    // Повторная отправка кода
    resendCodeLink.addEventListener('click', function(e) {
        e.preventDefault();
        startTimer();
        this.style.display = 'none';
        document.getElementById('countdown').style.display = 'block';
    });
    
    // Проверка пароля (шаг 3)
    passwordInput.addEventListener('input', checkPassword);
    confirmPasswordInput.addEventListener('input', checkPassword);
    
    function checkPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        // Проверка длины пароля
        if (password.length < 8) {
            passwordError.textContent = 'Пароль должен содержать минимум 8 символов';
            passwordError.style.display = 'block';
            changePasswordBtn.disabled = true;
            return;
        }
        
        // Проверка совпадения паролей
        if (password !== confirmPassword) {
            passwordError.textContent = 'Пароли не совпадают';
            passwordError.style.display = 'block';
            changePasswordBtn.disabled = true;
            return;
        }
        
        // Если все ок
        passwordError.style.display = 'none';
        changePasswordBtn.disabled = false;
        
        // Обновляем индикатор сложности
        updatePasswordStrength(password);
    }
    
    // Изменение пароля (шаг 3)
    changePasswordBtn.addEventListener('click', function() {
        // Здесь должно быть сохранение нового пароля
        showSuccess();
    });
    
    // Функция таймера
    function startTimer() {
        let timeLeft = 60;
        const countdown = document.getElementById('countdown');
        countdown.style.display = 'block';
        resendCodeLink.style.display = 'none';
        
        const timer = setInterval(() => {
            timeLeft--;
            countdown.textContent = `00:${timeLeft < 10 ? '0' + timeLeft : timeLeft}`;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                countdown.style.display = 'none';
                resendCodeLink.style.display = 'inline';
            }
        }, 1000);
    }
    
    // Обновление индикатора сложности пароля
    function updatePasswordStrength(password) {
        const strengthBars = document.querySelectorAll('.strength-bar');
        const strengthText = document.querySelector('.strength-text');
        
        // Сброс
        strengthBars.forEach(bar => bar.style.backgroundColor = '#eee');
        
        let strength = 0;
        
        // Проверки
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        // Визуализация
        for (let i = 0; i < strength; i++) {
            let color;
            if (strength === 1) color = '#e74c3c';
            else if (strength === 2) color = '#f39c12';
            else if (strength === 3) color = '#3498db';
            else color = '#2ecc71';
            
            strengthBars[i].style.backgroundColor = color;
        }
        
        // Текст
        const texts = ['Очень слабый', 'Слабый', 'Средний', 'Надежный'];
        strengthText.textContent = texts[strength - 1] || 'Надежность пароля';
    }
    
    // Переход между шагами
    function goToStep(stepNumber) {
        document.querySelector('.step.active').classList.remove('active');
        document.getElementById(`step-${stepNumber}`).classList.add('active');
    }
    
    // Показать сообщение об успехе
    function showSuccess() {
        document.querySelector('.reset-steps').style.display = 'none';
        successMessage.style.display = 'block';
    }
});