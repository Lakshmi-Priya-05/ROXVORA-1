# ROXVORA - Premium Fashion & Lifestyle E-commerce

A modern, responsive e-commerce frontend built with React 18, Vite, Redux Toolkit, and Tailwind CSS.

## Features

- 🛍️ **Modern E-commerce UI** - Beautiful, responsive design
- 📱 **Fully Responsive** - Mobile, tablet, and desktop optimized
- ⚡ **Fast Performance** - Vite + React 18 + Code Splitting
- 🎨 **Design System** - Consistent theming with CSS variables
- 🛒 **Shopping Cart** - Real-time cart management
- ❤️ **Wishlist** - Save favorite products
- 👤 **User Authentication** - Login, register, password reset
- 📦 **Order Management** - Checkout, order history, tracking
- 🔍 **Advanced Search** - Filters, sorting, suggestions
- 🎛️ **Admin Dashboard** - Products, orders, customers, analytics

## Tech Stack

- **Framework**: React 18 + Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: CSS Modules + CSS Variables
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Yup
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Carousels**: Swiper
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, icons, fonts
│   ├── components/        # Reusable components
│   │   ├── common/        # Basic UI components
│   │   ├── layout/        # Header, Footer, Layouts
│   │   ├── home/          # Home page sections
│   │   ├── product/       # Product components
│   │   ├── shop/          # Shop page components
│   │   ├── cart/          # Cart components
│   │   ├── wishlist/      # Wishlist components
│   │   ├── checkout/      # Checkout components
│   │   ├── auth/          # Auth components
│   │   ├── account/       # Account components
│   │   ├── search/        # Search components
│   │   ├── contact/       # Contact components
│   │   └── admin/         # Admin components
│   ├── pages/             # Page components
│   ├── routes/            # Routing configuration
│   ├── api/               # API layer
│   ├── store/             # Redux store & slices
│   ├── hooks/             # Custom hooks
│   ├── context/           # React context providers
│   ├── theme/             # Theme configuration
│   ├── constants/         # App constants
│   ├── utils/             # Utility functions
│   ├── validations/       # Form validations
│   ├── config/            # App configuration
│   ├── styles/            # Global styles
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

## License

MIT