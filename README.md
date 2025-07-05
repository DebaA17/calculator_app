# Modern Calculator Web App

A sleek, responsive calculator web application built with vanilla HTML, CSS, and JavaScript. Features a modern UI with smooth animations, real-time IP detection, device information display, and comprehensive keyboard support.

## 🌟 Features

### Calculator Functionality
- **Basic Operations**: Addition, subtraction, multiplication, division
- **Decimal Support**: Floating-point calculations
- **Keyboard Navigation**: Full keyboard support for all operations
- **Error Handling**: Division by zero protection and input validation
- **Clear Function**: Reset calculator state
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### User Information Display
- **Real IP Detection**: Shows visitor's public IPv4 address using ipify API
- **Device Detection**: Displays browser and operating system information
- **Real-time Updates**: Information loads dynamically on page load

### Modern UI/UX
- **Sleek Design**: Clean, modern interface with gradient backgrounds
- **Smooth Animations**: Button hover effects, ripple animations, and transitions
- **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
- **Mobile-First**: Responsive design that adapts to all screen sizes
- **Visual Feedback**: Button press animations and focus states

## 🚀 Technologies Used

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **Vanilla JavaScript**: ES6+ features, async/await, DOM manipulation
- **External APIs**:
  - [ipify.org](https://api.ipify.org) - IP address detection
  - [UAParser.js](https://github.com/faisalman/ua-parser-js) - User agent parsing
- **Fonts**: Google Fonts (Poppins)
- **Icons**: Font Awesome 6

## 📁 Project Structure

```
calculator_app/
├── index.html          # Main calculator page
├── styles.css          # All styling and animations
├── script.js           # Calculator logic and functionality
├── 404.html           # Custom 404 error page
├── LICENSE            # MIT license
└── README.md          # Project documentation
```

## 🎯 Key Features Breakdown

### Calculator Logic
- State management for current input, operators, and previous values
- Chain calculation support (perform operations in sequence)
- Proper decimal handling and number formatting
- Scientific notation for very large/small numbers

### Responsive Design
- Mobile-first approach with breakpoints at 768px and 480px
- Flexible grid layout that adapts to different screen sizes
- Touch-friendly button sizes on mobile devices
- Optimized typography scaling

### Accessibility
- Full keyboard navigation support
- ARIA labels for screen readers
- Semantic HTML structure
- Focus management and visual indicators
- High contrast color scheme

### Performance
- Lightweight vanilla JavaScript (no frameworks)
- Optimized CSS with efficient selectors
- Minimal external dependencies
- Fast loading times

## 🛠️ Installation & Usage

1. **Clone or download** the project files
2. **Open** `index.html` in any modern web browser
3. **Start calculating!** Use mouse clicks or keyboard input

### Keyboard Shortcuts
- **Numbers (0-9)**: Input digits
- **Operators (+, -, *, /)**: Mathematical operations
- **Enter or =**: Calculate result
- **Escape or C**: Clear calculator
- **Backspace**: Delete last character
- **.**: Decimal point

## 🌐 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Customization

### Colors
The color scheme is defined in CSS custom properties at the top of `styles.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    /* ... more colors */
}
```

### Layout
- Modify the grid layout in `.buttons-grid` for different button arrangements
- Adjust spacing and sizing using the defined CSS variables
- Customize animations by modifying keyframe definitions

## 🔧 API Configuration

### IP Detection
The app uses the free ipify API. No configuration required, but you can replace it with any IP detection service:

```javascript
const response = await fetch('https://api.ipify.org?format=json');
```

### Device Detection
UAParser.js is loaded from CDN. The library automatically detects:
- Browser name and version
- Operating system
- Device type

## 📱 Mobile Optimization

- **Touch-friendly**: Large button targets (minimum 44px)
- **Responsive text**: Scales appropriately for different screen sizes
- **Optimized layout**: Stacked information bar on mobile
- **Fast loading**: Optimized assets for mobile networks

## 🚨 Error Handling

- **Division by zero**: Shows error message and resets
- **Invalid operations**: Input validation prevents errors
- **Network failures**: Graceful fallbacks for API calls
- **Large numbers**: Automatic scientific notation

## 🔒 Security Features

- **Input validation**: Prevents malicious input
- **Safe evaluation**: No use of `eval()` or similar dangerous functions
- **HTTPS ready**: All external resources use HTTPS
- **XSS protection**: Proper HTML escaping

## 🎉 Credits

**Developed by Debasis**
- Modern design patterns and best practices
- Vanilla JavaScript implementation
- Responsive CSS architecture
- Accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support or questions, visit [https://debasisbiswas](https://debasisbiswas)

---

**Built with ❤️ using vanilla web technologies**
