// Advanced Animations and Visual Effects

// Particle System for Background
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.init();
    }
    
    init() {
        // Create canvas for particles
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.3';
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.createParticles();
        this.animate();
        
        // Handle resize
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const numParticles = Math.floor((window.innerWidth * window.innerHeight) / 15000);
        for (let i = 0; i < numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas) {
            this.canvas.remove();
        }
    }
}

// Initialize particle system
let particleSystem;

// Mouse trail effect
class MouseTrail {
    constructor() {
        this.points = [];
        this.maxPoints = 20;
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.init();
    }
    
    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '999';
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.animate();
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.addPoint(e.clientX, e.clientY);
        });
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    addPoint(x, y) {
        this.points.push({ x, y, age: 0 });
        if (this.points.length > this.maxPoints) {
            this.points.shift();
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.points.forEach((point, index) => {
            point.age++;
            const opacity = (1 - point.age / this.maxPoints) * 0.3;
            const size = (1 - point.age / this.maxPoints) * 10;
            
            if (opacity > 0) {
                this.ctx.beginPath();
                this.ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(79, 172, 254, ${opacity})`;
                this.ctx.fill();
            }
        });
        
        // Remove old points
        this.points = this.points.filter(point => point.age < this.maxPoints);
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas) {
            this.canvas.remove();
        }
    }
}

// Button interaction effects
function addButtonEffects() {
    document.querySelectorAll('.key').forEach(button => {
        // Add magnetic effect
        button.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            document.addEventListener('mousemove', function magneticEffect(e) {
                const deltaX = (e.clientX - centerX) * 0.1;
                const deltaY = (e.clientY - centerY) * 0.1;
                
                button.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
                
                button.addEventListener('mouseleave', function() {
                    document.removeEventListener('mousemove', magneticEffect);
                    button.style.transform = '';
                }, { once: true });
            });
        });
        
        // Add click wave effect
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const wave = document.createElement('div');
            wave.style.position = 'absolute';
            wave.style.left = x + 'px';
            wave.style.top = y + 'px';
            wave.style.width = '0';
            wave.style.height = '0';
            wave.style.borderRadius = '50%';
            wave.style.background = 'rgba(255, 255, 255, 0.6)';
            wave.style.transform = 'translate(-50%, -50%)';
            wave.style.pointerEvents = 'none';
            wave.style.zIndex = '10';
            
            this.style.position = 'relative';
            this.appendChild(wave);
            
            // Animate wave
            wave.animate([
                { width: '0', height: '0', opacity: 1 },
                { width: '200px', height: '200px', opacity: 0 }
            ], {
                duration: 600,
                easing: 'ease-out'
            }).onfinish = () => {
                wave.remove();
            };
        });
    });
}

// Calculator shake effect for errors
function shakeCalculator() {
    const calculator = document.getElementById('calculator');
    calculator.style.animation = 'none';
    calculator.offsetHeight; // Trigger reflow
    calculator.style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
        calculator.style.animation = '';
    }, 500);
}

// Number rain effect (for special occasions)
function createNumberRain() {
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '×', '÷', '='];
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '1';
    container.style.overflow = 'hidden';
    document.body.appendChild(container);
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const numberElement = document.createElement('div');
            numberElement.textContent = numbers[Math.floor(Math.random() * numbers.length)];
            numberElement.style.position = 'absolute';
            numberElement.style.left = Math.random() * 100 + '%';
            numberElement.style.top = '-50px';
            numberElement.style.color = 'rgba(255, 255, 255, 0.7)';
            numberElement.style.fontSize = Math.random() * 20 + 20 + 'px';
            numberElement.style.fontWeight = 'bold';
            numberElement.style.userSelect = 'none';
            
            container.appendChild(numberElement);
            
            // Animate falling
            numberElement.animate([
                { transform: 'translateY(-50px) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 50}px) rotate(360deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'linear'
            }).onfinish = () => {
                numberElement.remove();
            };
        }, i * 100);
    }
    
    // Remove container after animation
    setTimeout(() => {
        container.remove();
    }, 8000);
}

// Glitch effect for display
function glitchDisplay() {
    const display = document.getElementById('display');
    const originalValue = display.value;
    const glitchChars = ['█', '▓', '▒', '░', '▄', '▀', '▌', '▐'];
    
    let glitchInterval = setInterval(() => {
        let glitchedText = '';
        for (let i = 0; i < originalValue.length; i++) {
            if (Math.random() < 0.3) {
                glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
                glitchedText += originalValue[i];
            }
        }
        display.value = glitchedText;
    }, 50);
    
    setTimeout(() => {
        clearInterval(glitchInterval);
        display.value = originalValue;
    }, 500);
}

// Initialize effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle system
    particleSystem = new ParticleSystem();
    
    // Initialize mouse trail
    const mouseTrail = new MouseTrail();
    
    // Add button effects
    addButtonEffects();
    
    // Easter egg: number rain on calculator hover for 3 seconds
    const calculator = document.getElementById('calculator');
    let hoverTimeout;
    
    calculator.addEventListener('mouseenter', function() {
        hoverTimeout = setTimeout(() => {
            createNumberRain();
        }, 3000);
    });
    
    calculator.addEventListener('mouseleave', function() {
        clearTimeout(hoverTimeout);
    });
    
    // Add glitch effect to error states
    const originalCalculate = window.calculate;
    window.calculate = function() {
        try {
            originalCalculate();
        } catch (error) {
            glitchDisplay();
            shakeCalculator();
            throw error;
        }
    };
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (particleSystem) {
        particleSystem.destroy();
    }
});
