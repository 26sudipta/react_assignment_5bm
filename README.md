# ShopHub - E-Commerce Store

A modern, fully-functional e-commerce application built with React, Firebase, and Tailwind CSS.

## 🎯 Features

### ✨ Authentication
- **Email/Password Sign Up & Login** - Create accounts and sign in securely
- **Google Authentication** - One-click login with Google
- **GitHub Authentication** - Sign in using your GitHub account
- **Protected Routes** - Only authenticated users can access checkout and dashboard

### 🛍️ Shopping Features
- **Product Catalog** - Browse 20+ products from FakeStore API
- **Category Filtering** - Filter products by category
- **Product Details** - View detailed information including ratings and descriptions
- **Shopping Cart** - Add/remove items, adjust quantities
- **Persistent Cart** - Cart data saved to localStorage
- **Checkout** - Complete order form with shipping and payment information

### 👤 User Features
- **User Profile** - Manage account information
- **Dashboard** - View order history and account statistics
- **Real-time Cart Updates** - See cart count in navbar

### 📱 Design & UX
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- **Professional UI** - Modern gradient colors and smooth animations
- **Loading States** - Beautiful loading spinners
- **Error Handling** - User-friendly error messages
- **Accessibility** - Semantic HTML and proper ARIA labels

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase project (for authentication)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ecommerce-store
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Firebase Configuration**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Get your Firebase config credentials
   - Update `src/config/firebase.js` with your credentials

4. **Enable Firebase Authentication Methods**
   - Email/Password
   - Google (requires Google OAuth credentials)
   - GitHub (requires GitHub OAuth App)

5. **Start the development server**
```bash
npm run dev
```

The app will open at `http://localhost:5173/`

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ProtectedRoute.jsx
│   └── product/
│       └── ProductCard.jsx
├── context/
│   ├── AuthContext.jsx
│   └── CartContext.jsx
├── hooks/
│   ├── useAuth.js
│   └── useCart.js
├── pages/
│   ├── Home.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Profile.jsx
│   └── Dashboard.jsx
├── config/
│   └── firebase.js
├── App.jsx
└── main.jsx
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore (for future features)
- **Styling**: Tailwind CSS v4
- **HTTP Client**: Axios
- **Icons**: React Icons
- **API**: FakeStore API

## 🔐 Authentication

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Add a web app to your project
4. Copy the Firebase config

### Authentication Methods

#### Email/Password
- Sign up with email and password
- Minimum 6 characters password

#### Google Login
- No additional setup required
- Just enable in Firebase Console

#### GitHub Login
1. Create GitHub OAuth App at [GitHub Settings](https://github.com/settings/developers)
2. Add credentials to Firebase Console

## 📊 API Integration

The app uses the **FakeStore API** for product data:
- **Base URL**: `https://fakestoreapi.com`
- **Endpoints Used**:
  - `GET /products` - All products
  - `GET /products/{id}` - Single product
  - `GET /products/category/{category}` - Products by category
  - `GET /products/categories` - List of categories

## 🎨 Design Features

### Color Scheme
- Primary: Blue (#2563EB)
- Secondary: Gray (#374151)
- Accent: Red (#EF4444) for actions

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 💾 Data Persistence

- **Cart**: Stored in localStorage (persists across sessions)
- **Auth State**: Managed by Firebase Authentication
- **Orders**: Can be stored in Firestore (future feature)

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

## 📝 Key Pages & Routes

| Route | Component | Protected |
|-------|-----------|-----------|
| `/` | Home | No |
| `/product/:id` | ProductDetail | No |
| `/cart` | Cart | No |
| `/login` | Login | No |
| `/signup` | Signup | No |
| `/checkout` | Checkout | Yes |
| `/profile` | Profile | Yes |
| `/dashboard` | Dashboard | Yes |

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 🐛 Troubleshooting

### Firebase Auth Not Working
- Ensure Firebase config is correct in `src/config/firebase.js`
- Check that authentication methods are enabled in Firebase Console
- Verify OAuth app credentials for Google/GitHub

### Products Not Loading
- Check network tab in browser DevTools
- Verify FakeStore API is accessible
- Clear browser cache and reload

### Cart Not Persisting
- Check if localStorage is enabled in browser
- Clear browser storage if corrupted

## 📚 Documentation

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com)

## 🤝 Contributing

Feel free to fork this project and submit pull requests with improvements!

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created with ❤️ by a React Senior Engineer

---

**Last Updated**: December 7, 2025

**Version**: 1.0.0

For questions or support, please contact: info@shophub.com

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
