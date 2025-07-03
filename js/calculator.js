// Calculator Core Functionality
const display = document.getElementById("display");
let currentInput = "";
let shouldResetDisplay = false;

// Display Functions
function appendToDisplay(input) {
    if (shouldResetDisplay) {
        clearDisplay();
        shouldResetDisplay = false;
    }
    
    // Prevent multiple decimal points
    if (input === "." && display.value.includes(".")) {
        return;
    }
    
    // Prevent multiple operators in a row
    if (["+", "-", "*", "/"].includes(input) && ["+", "-", "*", "/"].includes(display.value.slice(-1))) {
        return;
    }
    
    display.value += input;
    animateDisplayValue();
}

function clearDisplay() {
    display.value = "";
    animateDisplayClear();
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
    animateDisplayDelete();
}

function calculate() {
    try {
        if (display.value === "") {
            return;
        }
        
        // Replace display symbols with actual operators for calculation
        let expression = display.value
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/−/g, "-");
        
        const result = math.evaluate(expression);
        
        // Handle division by zero and other edge cases
        if (!isFinite(result)) {
            throw new Error("Invalid calculation");
        }
        
        display.value = formatResult(result);
        shouldResetDisplay = true;
        animateDisplayResult();
        
    } catch (error) {
        display.value = "Error";
        shouldResetDisplay = true;
        animateDisplayError();
        
        // Clear error after 2 seconds
        setTimeout(() => {
            if (display.value === "Error") {
                clearDisplay();
            }
        }, 2000);
    }
}

// Format result to handle long decimals
function formatResult(result) {
    // Convert to string to check length
    let resultStr = result.toString();
    
    // If result is too long, use scientific notation or round
    if (resultStr.length > 12) {
        if (Math.abs(result) >= 1e12 || Math.abs(result) < 1e-6) {
            return result.toExponential(6);
        } else {
            return Math.round(result * 1e8) / 1e8; // Round to 8 decimal places
        }
    }
    
    return result;
}

// Animation Functions
function animateDisplayValue() {
    display.style.transform = "scale(1.02)";
    setTimeout(() => {
        display.style.transform = "scale(1)";
    }, 150);
}

function animateDisplayClear() {
    display.style.transform = "scale(0.98)";
    display.style.opacity = "0.7";
    setTimeout(() => {
        display.style.transform = "scale(1)";
        display.style.opacity = "1";
    }, 200);
}

function animateDisplayDelete() {
    display.style.transform = "translateX(-5px)";
    setTimeout(() => {
        display.style.transform = "translateX(0)";
    }, 150);
}

function animateDisplayResult() {
    display.style.transform = "scale(1.05)";
    display.style.boxShadow = "0 0 20px rgba(78, 205, 196, 0.5)";
    setTimeout(() => {
        display.style.transform = "scale(1)";
        display.style.boxShadow = "";
    }, 500);
}

function animateDisplayError() {
    display.style.transform = "translateX(-10px)";
    display.style.color = "#ff4757";
    display.style.boxShadow = "0 0 20px rgba(255, 71, 87, 0.5)";
    
    setTimeout(() => {
        display.style.transform = "translateX(10px)";
    }, 100);
    
    setTimeout(() => {
        display.style.transform = "translateX(0)";
        display.style.color = "";
        display.style.boxShadow = "";
    }, 200);
}

// Keyboard Support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Prevent default behavior for calculator keys
    if (/[0-9+\-*/.=]/.test(key) || key === 'Enter' || key === 'Escape' || key === 'Backspace') {
        event.preventDefault();
    }
    
    // Handle number and operator keys
    if (/[0-9]/.test(key)) {
        appendToDisplay(key);
        animateKeyPress(`[data-key="${key}"]`);
    } else if (key === '+') {
        appendToDisplay('+');
        animateKeyPress('[data-key="add"]');
    } else if (key === '-') {
        appendToDisplay('-');
        animateKeyPress('[data-key="subtract"]');
    } else if (key === '*') {
        appendToDisplay('*');
        animateKeyPress('[data-key="multiply"]');
    } else if (key === '/') {
        appendToDisplay('/');
        animateKeyPress('[data-key="divide"]');
    } else if (key === '.') {
        appendToDisplay('.');
        animateKeyPress('[data-key="decimal"]');
    } else if (key === 'Enter' || key === '=') {
        calculate();
        animateKeyPress('[data-key="equals"]');
    } else if (key === 'Escape') {
        clearDisplay();
        animateKeyPress('[data-key="clear"]');
    } else if (key === 'Backspace') {
        deleteLast();
        animateKeyPress('[data-key="delete"]');
    }
});

// Animate key press for keyboard input
function animateKeyPress(selector) {
    const key = document.querySelector(selector);
    if (key) {
        key.style.transform = "scale(0.95)";
        key.style.opacity = "0.8";
        setTimeout(() => {
            key.style.transform = "";
            key.style.opacity = "";
        }, 150);
    }
}

// Enhanced button click animations
document.querySelectorAll('.key').forEach(button => {
    button.addEventListener('click', function() {
        // Create ripple effect
        const ripple = this.querySelector('.key-ripple');
        ripple.style.animation = 'none';
        ripple.offsetHeight; // Trigger reflow
        ripple.style.animation = null;
        
        // Add click feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
    });
    
    // Add hover sound effect simulation
    button.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
});

// Initialize display
display.value = "";

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
