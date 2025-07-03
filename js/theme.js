// Theme Management System
class ThemeManager {
    constructor() {
        this.themes = [
            {
                name: 'Ocean',
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                colors: {
                    primary: '#667eea',
                    secondary: '#764ba2'
                }
            },
            {
                name: 'Sunset',
                gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                colors: {
                    primary: '#f093fb',
                    secondary: '#f5576c'
                }
            },
            {
                name: 'Ice',
                gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                colors: {
                    primary: '#4facfe',
                    secondary: '#00f2fe'
                }
            },
            {
                name: 'Forest',
                gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                colors: {
                    primary: '#43e97b',
                    secondary: '#38f9d7'
                }
            },
            {
                name: 'Dawn',
                gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                colors: {
                    primary: '#fa709a',
                    secondary: '#fee140'
                }
            },
            {
                name: 'Space',
                gradient: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                colors: {
                    primary: '#2c3e50',
                    secondary: '#34495e'
                }
            },
            {
                name: 'Aurora',
                gradient: 'linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)',
                colors: {
                    primary: '#8e2de2',
                    secondary: '#4a00e0'
                }
            },
            {
                name: 'Fire',
                gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                colors: {
                    primary: '#ff9a9e',
                    secondary: '#fecfef'
                }
            }
        ];
        
        this.currentThemeIndex = 0;
        this.isTransitioning = false;
        this.init();
    }
    
    init() {
        this.loadSavedTheme();
        this.setupThemeToggle();
        this.createThemeIndicator();
    }
    
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('calculatorTheme');
        if (savedTheme !== null) {
            this.currentThemeIndex = parseInt(savedTheme);
        }
        this.applyTheme(this.currentThemeIndex, false);
    }
    
    setupThemeToggle() {
        const toggleButton = document.getElementById('theme-toggle');
        toggleButton.addEventListener('click', () => {
            this.nextTheme();
        });
        
        // Add tooltip
        toggleButton.setAttribute('title', 'Change Theme');
    }
    
    createThemeIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'theme-indicator';
        indicator.innerHTML = `
            <div class="theme-name">${this.themes[this.currentThemeIndex].name}</div>
            <div class="theme-dots">
                ${this.themes.map((_, index) => 
                    `<div class="theme-dot ${index === this.currentThemeIndex ? 'active' : ''}" data-theme="${index}"></div>`
                ).join('')}
            </div>
        `;
        
        // Add styles for indicator
        const style = document.createElement('style');
        style.textContent = `
            .theme-indicator {
                position: fixed;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                background: rgba(255, 255, 255, 0.1);
                padding: 20px;
                border-radius: 15px;
                backdrop-filter: blur(10px);
                border: 2px solid rgba(255, 255, 255, 0.2);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 1001;
                text-align: center;
                min-width: 120px;
            }
            
            .theme-indicator.show {
                opacity: 1;
                visibility: visible;
            }
            
            .theme-name {
                color: white;
                font-weight: bold;
                margin-bottom: 15px;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .theme-dots {
                display: flex;
                flex-direction: column;
                gap: 8px;
                align-items: center;
            }
            
            .theme-dot {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                cursor: pointer;
                transition: all 0.3s ease;
                border: 2px solid transparent;
            }
            
            .theme-dot:hover {
                transform: scale(1.2);
                background: rgba(255, 255, 255, 0.6);
            }
            
            .theme-dot.active {
                background: white;
                border: 2px solid rgba(255, 255, 255, 0.5);
                box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            }
            
            @media (max-width: 768px) {
                .theme-indicator {
                    right: 10px;
                    padding: 15px;
                    min-width: 100px;
                }
                
                .theme-name {
                    font-size: 12px;
                    margin-bottom: 10px;
                }
                
                .theme-dot {
                    width: 10px;
                    height: 10px;
                }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(indicator);
        
        this.indicator = indicator;
        
        // Add click handlers to dots
        indicator.querySelectorAll('.theme-dot').forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.applyTheme(index);
            });
        });
    }
    
    showIndicator() {
        this.indicator.classList.add('show');
        this.updateIndicator();
        
        // Hide after 3 seconds
        clearTimeout(this.indicatorTimeout);
        this.indicatorTimeout = setTimeout(() => {
            this.indicator.classList.remove('show');
        }, 3000);
    }
    
    updateIndicator() {
        const nameElement = this.indicator.querySelector('.theme-name');
        const dots = this.indicator.querySelectorAll('.theme-dot');
        
        nameElement.textContent = this.themes[this.currentThemeIndex].name;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentThemeIndex);
        });
    }
    
    nextTheme() {
        if (this.isTransitioning) return;
        
        this.currentThemeIndex = (this.currentThemeIndex + 1) % this.themes.length;
        this.applyTheme(this.currentThemeIndex);
    }
    
    applyTheme(themeIndex, animate = true) {
        if (this.isTransitioning && animate) return;
        
        this.currentThemeIndex = themeIndex;
        const theme = this.themes[themeIndex];
        
        if (animate) {
            this.isTransitioning = true;
            this.animateThemeTransition(theme);
        } else {
            this.setThemeProperties(theme);
        }
        
        // Save theme preference
        localStorage.setItem('calculatorTheme', themeIndex.toString());
        
        // Show indicator
        this.showIndicator();
    }
    
    setThemeProperties(theme) {
        document.body.style.background = theme.gradient;
        
        // Update CSS custom properties
        document.documentElement.style.setProperty('--primary-bg', theme.gradient);
    }
    
    animateThemeTransition(theme) {
        // Create overlay for smooth transition
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${theme.gradient};
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.5s ease;
            pointer-events: none;
        `;
        
        document.body.appendChild(overlay);
        
        // Fade in overlay
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
        });
        
        // Apply theme and fade out overlay
        setTimeout(() => {
            this.setThemeProperties(theme);
            overlay.style.opacity = '0';
            
            setTimeout(() => {
                overlay.remove();
                this.isTransitioning = false;
            }, 500);
        }, 250);
        
        // Add particle burst effect
        this.createThemeChangeEffect();
    }
    
    createThemeChangeEffect() {
        const colors = this.themes[this.currentThemeIndex].colors;
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: ${Math.random() > 0.5 ? colors.primary : colors.secondary};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: 50%;
                top: 50%;
            `;
            
            document.body.appendChild(particle);
            
            // Animate particle
            const angle = (i / particleCount) * Math.PI * 2;
            const velocity = Math.random() * 200 + 100;
            const deltaX = Math.cos(angle) * velocity;
            const deltaY = Math.sin(angle) * velocity;
            
            particle.animate([
                {
                    transform: 'translate(-50%, -50%) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => {
                particle.remove();
            };
        }
    }
    
    // Auto theme change (optional)
    enableAutoThemeChange(interval = 30000) {
        this.autoChangeInterval = setInterval(() => {
            this.nextTheme();
        }, interval);
    }
    
    disableAutoThemeChange() {
        if (this.autoChangeInterval) {
            clearInterval(this.autoChangeInterval);
            this.autoChangeInterval = null;
        }
    }
}

// Initialize theme manager
let themeManager;

document.addEventListener('DOMContentLoaded', function() {
    themeManager = new ThemeManager();
    
    // Add keyboard shortcut for theme change (T key)
    document.addEventListener('keydown', function(event) {
        if (event.key.toLowerCase() === 't' && !event.ctrlKey && !event.altKey && !event.metaKey) {
            // Don't trigger if user is typing in display
            if (event.target !== document.getElementById('display')) {
                event.preventDefault();
                themeManager.nextTheme();
            }
        }
    });
    
    // Add double-click on calculator to change theme
    const calculator = document.getElementById('calculator');
    let clickCount = 0;
    
    calculator.addEventListener('click', function() {
        clickCount++;
        if (clickCount === 1) {
            setTimeout(() => {
                if (clickCount === 2) {
                    themeManager.nextTheme();
                }
                clickCount = 0;
            }, 300);
        }
    });
});

// Theme persistence across page refreshes
window.addEventListener('beforeunload', function() {
    if (themeManager) {
        themeManager.disableAutoThemeChange();
    }
});
