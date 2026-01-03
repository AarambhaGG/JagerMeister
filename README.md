# JägerMeister 🍹

A stunning, interactive landing page showcasing the iconic Jägermeister brand and its product lineup. This project features smooth scrolling animations, video backgrounds, and a modern, immersive design that captures the essence of "The Art of 56 Ingredients."

## 🌐 Live Demo

[View Live Site](https://jagermeister-lover.vercel.app/)

## ✨ Features

- **Immersive Video Backgrounds**: Each product section features custom video content
- **Smooth Scroll Animations**: Engaging parallax and fade-in effects as you scroll
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Product Showcase**: Highlights three Jägermeister variants:
  - Original (56 ingredients)
  - Orange (citrus burst variant)
  - Winter Edition (seasonal limited)
- **Modern UI/UX**: Clean navigation, elegant typography, and stunning visuals
- **Age Gate**: Responsible drinking message (21+ requirement)

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Custom styling, animations, and responsive design
- **JavaScript**: Interactive elements and scroll animations
- **Video Elements**: Background videos for immersive experience

## 📁 Project Structure

```
JagerMeister/
│
├── index.html          # Main HTML file
├── style.css           # Styling and animations
├── main.js             # JavaScript functionality
│
├── images/             # Image assets
│   └── [product images, logos, etc.]
│
└── video/              # Video assets
    ├── video of partying.mp4
    ├── jager original flavour video.mov
    ├── orange flavour video.mp4
    └── winter edition video.mp4
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of HTML/CSS/JavaScript (for modifications)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AarambhaGG/JagerMeister.git
```

2. Navigate to the project directory:
```bash
cd JagerMeister
```

3. Open `index.html` in your browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Or use a local development server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server
```

Then visit `http://localhost:8000` in your browser.

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `style.css`:
```css
:root {
  --primary-color: #1a1a1a;
  --secondary-color: #ff6b00;
  --text-color: #ffffff;
}
```

### Modifying Animations

Scroll animations are controlled in `main.js`. Adjust timing and effects:
```javascript
// Example: Change scroll speed
const scrollSpeed = 0.5; // Adjust this value
```

### Adding New Sections

Follow the existing section structure in `index.html`:
```html
<section class="product-section" id="your-section">
  <video autoplay muted loop>
    <source src="video/your-video.mp4" type="video/mp4">
  </video>
  <!-- Your content here -->
</section>
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🔧 Features to Implement

- [ ] Shopping cart functionality
- [ ] Product detail modals
- [ ] Store locator integration
- [ ] Newsletter signup
- [ ] Multi-language support
- [ ] Enhanced accessibility (ARIA labels)
- [ ] Loading animations
- [ ] Cookie consent banner

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is for educational and portfolio purposes. Jägermeister branding and assets are property of Mast-Jägermeister SE.

## ⚠️ Disclaimer

This is a fan-made project and is not affiliated with, endorsed by, or connected to Mast-Jägermeister SE. All product names, logos, and brands are property of their respective owners.

**Please drink responsibly. Must be 21+ to consume alcoholic beverages.**

## 👤 Author

**AarambhaGG**

- GitHub: [@AarambhaGG](https://github.com/AarambhaGG)
- Project Link: [https://github.com/AarambhaGG/JagerMeister](https://github.com/AarambhaGG/JagerMeister)

## 🙏 Acknowledgments

- Inspired by the official Jägermeister brand
- Video content for demonstration purposes
- Design inspired by modern spirits marketing websites
- Thanks to the web development community for inspiration

---

**Made with 🍹 and passion for great web design**
