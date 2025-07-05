class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = null;
        this.waitingForOperand = false;
        this.init();
    }

    init() {
        this.fetchUserInfo();
        this.setupEventListeners();
        this.updateDisplay();
    }

    async fetchUserInfo() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            document.getElementById('user-ip').textContent = data.ip;
        } catch (error) {
            document.getElementById('user-ip').textContent = 'Unknown';
        }

        try {
            const parser = new UAParser();
            const result = parser.getResult();
            const deviceInfo = `${result.browser.name} on ${result.os.name}`;
            document.getElementById('device-info').textContent = deviceInfo;
        } catch (error) {
            document.getElementById('device-info').textContent = 'Unknown Device';
        }
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn')) {
                this.handleButtonClick(e.target);
                this.createRipple(e.target, e);
            }
        });

        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });

        this.display.addEventListener('focus', () => {
            this.display.style.borderColor = 'var(--primary-color)';
        });

        this.display.addEventListener('blur', () => {
            this.display.style.borderColor = 'var(--border-color)';
        });
    }

    handleButtonClick(button) {
        const { action, number } = button.dataset;

        if (number) {
            this.inputNumber(number);
        } else if (action) {
            this.handleAction(action);
        }
    }

    handleKeyboard(e) {
        const key = e.key;
        e.preventDefault();

        if (key >= '0' && key <= '9') {
            this.inputNumber(key);
        } else if (key === '.') {
            this.inputDecimal();
        } else if (key === '+') {
            this.inputOperator('add');
        } else if (key === '-') {
            this.inputOperator('subtract');
        } else if (key === '*') {
            this.inputOperator('multiply');
        } else if (key === '/') {
            this.inputOperator('divide');
        } else if (key === 'Enter' || key === '=') {
            this.calculate();
        } else if (key === 'Escape' || key === 'c' || key === 'C') {
            this.clear();
        } else if (key === 'Backspace') {
            this.backspace();
        }
    }

    handleAction(action) {
        switch (action) {
            case 'clear':
                this.clear();
                break;
            case 'decimal':
                this.inputDecimal();
                break;
            case 'equals':
                this.calculate();
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                this.inputOperator(action);
                break;
        }
    }

    inputNumber(number) {
        if (this.waitingForOperand) {
            this.currentInput = number;
            this.waitingForOperand = false;
        } else {
            this.currentInput = this.currentInput === '0' ? number : this.currentInput + number;
        }
        this.updateDisplay();
    }

    inputDecimal() {
        if (this.waitingForOperand) {
            this.currentInput = '0.';
            this.waitingForOperand = false;
        } else if (this.currentInput.indexOf('.') === -1) {
            this.currentInput += '.';
        }
        this.updateDisplay();
    }

    inputOperator(nextOperator) {
        const inputValue = parseFloat(this.currentInput);

        if (this.previousInput === '') {
            this.previousInput = inputValue;
        } else if (this.operator) {
            const currentValue = this.previousInput || 0;
            const newValue = this.performCalculation(this.operator, currentValue, inputValue);

            this.currentInput = String(newValue);
            this.previousInput = newValue;
            this.updateDisplay();
        }

        this.waitingForOperand = true;
        this.operator = nextOperator;
    }

    calculate() {
        const inputValue = parseFloat(this.currentInput);

        if (this.previousInput !== '' && this.operator) {
            const currentValue = this.previousInput || 0;
            const newValue = this.performCalculation(this.operator, currentValue, inputValue);

            this.currentInput = String(newValue);
            this.previousInput = '';
            this.operator = null;
            this.waitingForOperand = true;
            this.updateDisplay();
        }
    }

    performCalculation(operator, firstValue, secondValue) {
        switch (operator) {
            case 'add':
                return firstValue + secondValue;
            case 'subtract':
                return firstValue - secondValue;
            case 'multiply':
                return firstValue * secondValue;
            case 'divide':
                if (secondValue === 0) {
                    this.showError('Cannot divide by zero');
                    return 0;
                }
                return firstValue / secondValue;
            default:
                return secondValue;
        }
    }

    clear() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = null;
        this.waitingForOperand = false;
        this.updateDisplay();
    }

    backspace() {
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
        this.updateDisplay();
    }

    updateDisplay() {
        const value = parseFloat(this.currentInput);
        const displayValue = this.formatNumber(value);
        this.display.value = displayValue;
    }

    formatNumber(num) {
        if (isNaN(num)) return '0';
        
        const str = num.toString();
        if (str.length <= 12) return str;
        
        if (Math.abs(num) >= 1e12 || Math.abs(num) < 1e-6) {
            return num.toExponential(6);
        }
        
        return parseFloat(num.toFixed(8)).toString();
    }

    showError(message) {
        this.display.value = 'Error';
        setTimeout(() => {
            this.clear();
        }, 2000);
    }

    createRipple(button, event) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('btn-ripple');

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((button, index) => {
        button.style.animationDelay = `${index * 0.1}s`;
    });
});
