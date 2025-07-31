# 📝 Modern Blog Application

A sleek and modern blog application built with React, featuring a responsive design, mobile-friendly sidebar navigation, and a rich text editor for creating beautiful blog posts.


## ✨ Features

- 🎨 Modern, minimalist design
- 📱 Responsive layout with mobile-first approach
- 🎯 Intuitive navigation with mobile sidebar
- 📝 Rich text editor for blog creation
- 💾 Local storage persistence
- 🌙 Dark mode support
- 🚀 Fast and smooth transitions
- ♿ Accessible design

## 🛠️ Tech Stack

- **React** - Frontend framework
- **React Router** - Navigation
- **React Quill** - Rich text editor
- **CSS Variables** - Theming
- **LocalStorage** - Data persistence

## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/khawarrustam/Blog-Website.git
cd my-blog-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📁 Project Structure

```
modern-blog-app/
├── src/
│   ├── components/        # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── BlogCard.jsx
│   ├── pages/            # Page components
│   │   ├── BlogList.jsx
│   │   ├── CreateBlog.jsx
│   │   └── BlogDetail.jsx
│   ├── App.jsx          # Main app component
│   └── index.css        # Global styles
└── package.json
```

## 🎨 Design Features

- **Modern Typography** - Clean and readable font hierarchy
- **Subtle Animations** - Smooth transitions and hover effects
- **Consistent Spacing** - Following 8-point grid system
- **Color System** - Carefully chosen color palette with CSS variables
- **Shadow System** - Layered shadows for depth
- **Responsive Grid** - Fluid grid system for blog cards

## 📱 Mobile Features

- **Hamburger Menu** - Easy access to navigation
- **Slide-out Sidebar** - Smooth mobile navigation
- **Touch Friendly** - Optimized for touch interactions
- **Responsive Images** - Properly scaled images
- **Mobile Typography** - Adjusted font sizes for mobile

## 💻 Desktop Features

- **Sticky Navigation** - Easy access to menu items
- **Grid Layout** - Efficient use of space
- **Hover Effects** - Interactive elements
- **Widescreen Support** - Optimized for large displays

## 🔧 Customization

### Colors
Modify the CSS variables in `index.css` to change the color scheme:

```css
:root {
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --background: #f8fafc;
  --surface: #ffffff;
  /* ... other variables */
}
```

### Typography
The app uses 'Inter' as the primary font. To change it, modify:

```css
body {
  font-family: 'Your-Font', 'Segoe UI', 'Roboto', sans-serif;
}
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👏 Acknowledgments

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [React Quill](https://github.com/zenoamaro/react-quill)
- [Inter Font](https://rsms.me/inter/)

---

Made with ❤️ by [Rana Khawar Ali]