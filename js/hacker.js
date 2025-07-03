// Hacker Panel System Info Collector
class HackerSystemInfo {
    constructor() {
        this.panel = document.getElementById('hacker-panel');
        this.trigger = document.getElementById('hacker-trigger');
        this.isActive = false;
        this.userInfo = {};
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.preloadUserInfo();
    }
    
    setupEventListeners() {
        // Trigger button
        this.trigger.addEventListener('click', () => {
            this.togglePanel();
        });
        
        // Close button
        document.getElementById('close-hacker-panel').addEventListener('click', () => {
            this.hidePanel();
        });
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isActive) {
                this.hidePanel();
            }
        });
        
        // Secret key combination (Ctrl + Shift + H)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'H') {
                e.preventDefault();
                this.togglePanel();
            }
        });
    }
    
    async preloadUserInfo() {
        // Get basic device info immediately
        this.userInfo.device = this.getDeviceInfo();
        this.userInfo.browser = this.getBrowserInfo();
        this.userInfo.os = this.getOSInfo();
        this.userInfo.screen = this.getScreenInfo();
        
        // Get IP and location info with fallback
        try {
            const ipInfo = await this.getIPInfo();
            this.userInfo.ip = ipInfo.ip;
            this.userInfo.location = ipInfo.location;
            this.userInfo.isp = ipInfo.isp;
            this.userInfo.vpn = ipInfo.vpn;
        } catch (error) {
            console.log('Using fallback data');
            // Fallback to mock data for demonstration
            this.userInfo.ip = this.generateMockIP();
            this.userInfo.location = 'Location Hidden';
            this.userInfo.isp = 'Unknown Provider';
            this.userInfo.vpn = 'NOT DETECTED';
        }
    }
    
    getDeviceInfo() {
        const ua = navigator.userAgent;
        if (/Mobile|Android|iPhone|iPad/.test(ua)) {
            if (/iPhone/.test(ua)) return 'iPhone';
            if (/iPad/.test(ua)) return 'iPad';
            if (/Android/.test(ua)) return 'Android Device';
            return 'Mobile Device';
        }
        if (/Mac/.test(ua)) return 'Mac Computer';
        if (/Windows/.test(ua)) return 'Windows PC';
        if (/Linux/.test(ua)) return 'Linux Machine';
        return 'Unknown Device';
    }
    
    getBrowserInfo() {
        const ua = navigator.userAgent;
        if (/Chrome/.test(ua) && !/Edge/.test(ua)) return 'Google Chrome';
        if (/Firefox/.test(ua)) return 'Mozilla Firefox';
        if (/Safari/.test(ua) && !/Chrome/.test(ua)) return 'Safari';
        if (/Edge/.test(ua)) return 'Microsoft Edge';
        if (/Opera/.test(ua)) return 'Opera';
        return 'Unknown Browser';
    }
    
    getOSInfo() {
        const ua = navigator.userAgent;
        if (/Windows NT 10/.test(ua)) return 'Windows 10/11';
        if (/Windows NT/.test(ua)) return 'Windows';
        if (/Mac OS X/.test(ua)) return 'macOS';
        if (/Linux/.test(ua)) return 'Linux';
        if (/Android/.test(ua)) return 'Android';
        if (/iOS/.test(ua)) return 'iOS';
        return 'Unknown OS';
    }
    
    getScreenInfo() {
        return {
            width: screen.width,
            height: screen.height,
            resolution: `${screen.width}x${screen.height}`,
            colorDepth: screen.colorDepth
        };
    }
    
    async getIPInfo() {
        try {
            // Try multiple IP services for better reliability
            const services = [
                'https://ipapi.co/json/',
                'https://ipinfo.io/json',
                'https://api.ipify.org?format=json'
            ];
            
            let ipData = null;
            
            for (const service of services) {
                try {
                    const response = await fetch(service, {
                        timeout: 5000,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    if (response.ok) {
                        ipData = await response.json();
                        if (ipData.ip) break;
                    }
                } catch (e) {
                    continue;
                }
            }
            
            if (!ipData || !ipData.ip) {
                // Generate mock data for demonstration
                ipData = {
                    ip: this.generateMockIP(),
                    city: 'Unknown',
                    country: 'Unknown',
                    org: 'Unknown ISP'
                };
            }
            
            return {
                ip: ipData.ip,
                location: ipData.city && ipData.country ? `${ipData.city}, ${ipData.country}` : 'Location Hidden',
                isp: ipData.org || ipData.isp || 'Unknown Provider',
                vpn: this.detectVPN(ipData)
            };
        } catch (error) {
            // Return mock data
            return {
                ip: this.generateMockIP(),
                location: 'Location Hidden',
                isp: 'Unknown Provider',
                vpn: 'NOT DETECTED'
            };
        }
    }
    
    detectVPN(ipData) {
        // Simple VPN detection heuristics
        const vpnIndicators = [
            'vpn', 'proxy', 'tor', 'anonymous', 'private',
            'masked', 'hidden', 'secure', 'tunnel'
        ];
        
        const orgLower = (ipData.org || ipData.isp || '').toLowerCase();
        const isVPN = vpnIndicators.some(indicator => orgLower.includes(indicator));
        
        return isVPN ? 'DETECTED' : 'NOT DETECTED';
    }
    
    togglePanel() {
        if (this.isActive) {
            this.hidePanel();
        } else {
            this.showPanel();
        }
    }
    
    showPanel() {
        this.isActive = true;
        this.panel.classList.remove('hidden');
        this.panel.classList.add('show');
        
        // Play hacker sound effect (optional)
        this.playHackerSound();
        
        // Start loading animation
        this.startLoadingAnimation();
        
        // Populate info with delays for dramatic effect
        setTimeout(() => this.populateInfo(), 1000);
    }
    
    hidePanel() {
        this.isActive = false;
        this.panel.classList.remove('show');
        this.panel.classList.add('hidden');
        
        // Reset loading states
        this.resetLoadingStates();
    }
    
    playHackerSound() {
        // Create audio context for beeping sound
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'square';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    }
    
    startLoadingAnimation() {
        const loadingElements = document.querySelectorAll('.value.loading');
        loadingElements.forEach(element => {
            element.textContent = 'Scanning...';
            element.classList.add('loading');
        });
    }
    
    resetLoadingStates() {
        const loadingElements = document.querySelectorAll('.value');
        loadingElements.forEach(element => {
            element.classList.remove('loading', 'danger');
            element.textContent = 'Loading...';
        });
    }
    
    populateInfo() {
        const delays = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000];
        const updates = [
            () => this.updateElement('user-ip', this.userInfo.ip, this.userInfo.ip !== 'Hidden'),
            () => this.updateElement('user-location', this.userInfo.location),
            () => this.updateElement('user-isp', this.userInfo.isp),
            () => this.updateElement('user-device', this.userInfo.device),
            () => this.updateElement('user-browser', this.userInfo.browser),
            () => this.updateElement('user-os', this.userInfo.os),
            () => this.updateElement('vpn-status', this.userInfo.vpn, this.userInfo.vpn === 'DETECTED'),
            () => this.updateElement('security-level', this.calculateSecurityLevel(), true)
        ];
        
        updates.forEach((update, index) => {
            setTimeout(update, delays[index]);
        });
        
        // Show warning after all info is loaded
        setTimeout(() => {
            this.showWarningMessage();
        }, 5000);
    }
    
    updateElement(elementId, value, isDanger = false) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = value;
            element.classList.remove('loading');
            if (isDanger) {
                element.classList.add('danger');
            }
            
            // Add typewriter effect
            this.typeWriterEffect(element, value);
        }
    }
    
    typeWriterEffect(element, text) {
        element.textContent = '';
        let index = 0;
        const interval = setInterval(() => {
            element.textContent += text[index];
            index++;
            if (index >= text.length) {
                clearInterval(interval);
            }
        }, 50);
    }
    
    calculateSecurityLevel() {
        let score = 0;
        
        // Check various security factors
        if (this.userInfo.vpn === 'DETECTED') score += 20;
        if (location.protocol === 'https:') score += 30;
        if (navigator.cookieEnabled) score -= 10;
        if (navigator.doNotTrack === '1') score += 15;
        
        // Random factor for dramatic effect
        score += Math.random() * 20;
        
        if (score > 60) return 'HIGH RISK';
        if (score > 30) return 'MEDIUM RISK';
        return 'CRITICAL RISK';
    }
    
    showWarningMessage() {
        const warningMessage = document.querySelector('.warning-message');
        if (warningMessage) {
            warningMessage.style.animation = 'warningPulse 0.5s infinite';
        }
    }
    
    // Easter egg: Konami code activation
    setupKonamiCode() {
        const konamiCode = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];
        
        let konamiIndex = 0;
        
        document.addEventListener('keydown', (e) => {
            if (e.code === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    this.showPanel();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
    }
    
    generateMockIP() {
        // Generate a realistic-looking IP address
        const segments = [];
        for (let i = 0; i < 4; i++) {
            segments.push(Math.floor(Math.random() * 255) + 1);
        }
        return segments.join('.');
    }
}

// Initialize hacker system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const hackerSystem = new HackerSystemInfo();
    hackerSystem.setupKonamiCode();
    
    // Populate system info bar
    updateSystemInfoBar();
    
    // Add glitch text effect
    const glitchElements = document.querySelectorAll('.glitch-text');
    glitchElements.forEach(element => {
        element.setAttribute('data-text', element.textContent);
    });
});

// Function to update system info bar
async function updateSystemInfoBar() {
    try {
        // Get device info immediately
        const deviceInfo = getQuickDeviceInfo();
        document.getElementById('nav-device').textContent = deviceInfo.device;
        
        // Get IP info
        const ipInfo = await getQuickIPInfo();
        document.getElementById('nav-ip').textContent = ipInfo.ip;
        
        // Update security status
        const securityStatus = ipInfo.vpn === 'DETECTED' ? 'VPN' : 'Direct';
        document.getElementById('nav-security').textContent = securityStatus;
        
    } catch (error) {
        // Fallback info
        document.getElementById('nav-ip').textContent = generateQuickMockIP();
        document.getElementById('nav-device').textContent = getQuickDeviceInfo().device;
        document.getElementById('nav-security').textContent = 'Unknown';
    }
}

function getQuickDeviceInfo() {
    const ua = navigator.userAgent;
    let device = 'PC';
    
    if (/Mobile|Android|iPhone|iPad/.test(ua)) {
        if (/iPhone/.test(ua)) device = 'iPhone';
        else if (/iPad/.test(ua)) device = 'iPad';
        else if (/Android/.test(ua)) device = 'Android';
        else device = 'Mobile';
    } else if (/Mac/.test(ua)) device = 'Mac';
    else if (/Windows/.test(ua)) device = 'Windows';
    else if (/Linux/.test(ua)) device = 'Linux';
    
    return { device };
}

async function getQuickIPInfo() {
    try {
        const response = await fetch('https://ipapi.co/json/', { timeout: 3000 });
        if (response.ok) {
            const data = await response.json();
            return {
                ip: data.ip || generateQuickMockIP(),
                vpn: detectQuickVPN(data)
            };
        }
    } catch (error) {
        // Fallback
    }
    
    return {
        ip: generateQuickMockIP(),
        vpn: 'NOT DETECTED'
    };
}

function generateQuickMockIP() {
    const segments = [];
    for (let i = 0; i < 4; i++) {
        segments.push(Math.floor(Math.random() * 255) + 1);
    }
    return segments.join('.');
}

function detectQuickVPN(data) {
    const vpnIndicators = ['vpn', 'proxy', 'tor', 'anonymous', 'private'];
    const org = (data.org || '').toLowerCase();
    return vpnIndicators.some(indicator => org.includes(indicator)) ? 'DETECTED' : 'NOT DETECTED';
}

// Additional hacker effects
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    canvas.style.opacity = '0.1';
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '0123456789ABCDEF';
    const columns = Math.floor(canvas.width / 20);
    const drops = Array(columns).fill(0);
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff00';
        ctx.font = '15px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * 20, drops[i] * 20);
            
            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const interval = setInterval(draw, 50);
    document.body.appendChild(canvas);
    
    // Remove after 10 seconds
    setTimeout(() => {
        clearInterval(interval);
        canvas.remove();
    }, 10000);
}

// Global function to trigger hacker mode (for testing)
window.triggerHackerMode = function() {
    const hackerSystem = new HackerSystemInfo();
    hackerSystem.showPanel();
    createMatrixRain();
};
