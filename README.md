# عقارات - Saudi Arabian Real Estate Platform

A modern, production-ready real estate platform built with React, TypeScript, and Vite. Designed specifically for the Saudi Arabian market with full RTL (Right-to-Left) Arabic language support.

## 🌟 Features

### Core Features

- **Advanced Property Search** - Filter by price, location, type, and amenities
- **Interactive Google Maps** - View property locations and nearby facilities
- **WhatsApp Integration** - Direct messaging with real estate agents
- **Property Listings** - Browse sale and rental properties with detailed information
- **User Authentication** - Secure login and registration system
- **Favorites System** - Save and manage favorite properties
- **Admin Dashboard** - Full CRUD operations for property management
- **Campaign Management** - Create and track advertising campaigns
- **Analytics Tracking** - Monitor property views and campaign performance

### Technical Features

- ✅ **TypeScript** - Full type safety throughout
- ✅ **Responsive Design** - Mobile, tablet, and desktop support
- ✅ **RTL Support** - Native Arabic language support
- ✅ **Lazy Loading** - Optimized performance with code splitting
- ✅ **Error Boundaries** - Comprehensive error handling
- ✅ **CI/CD Ready** - GitHub Actions workflow included
- ✅ **Docker Support** - Container-ready for deployment
- ✅ **Production Optimized** - Minified, tree-shaken, and optimized

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

```
# Clone the repository
git clone <repository-url>
cd saudi-real-estate-platform

# Install dependencies
npm install

# Create environment file
cp .env.development .env.local

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Development

```
# Start dev server
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint
npm run lint:fix

# Format code
npm run format

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test
npm run test:coverage
```

## 📁 Project Structure

```
src/
├── components/                 # UI components (Atomic Design)
│   ├── atoms/                 # Basic components (Button, Badge, Icon, etc.)
│   ├── molecules/             # Component combinations (FormField, PropertyCard, etc.)
│   ├── organisms/             # Complex components (Header, Footer, PropertyGrid, etc.)
│   └── templates/             # Page layouts (MainLayout, ErrorBoundary, etc.)
├── features/                  # Feature modules
│   ├── homepage/              # Homepage screen
│   ├── properties/            # Property listing and details
│   ├── contact/               # Contact page
│   ├── about/                 # About page
│   ├── auth/                  # Authentication (login, register)
│   └── admin/                 # Admin dashboard
├── design-system/             # Design tokens and context
│   ├── context/               # Theme and Auth providers
│   ├── hooks/                 # Custom hooks
│   ├── styles/                # Global styles
│   └── tokens/                # Design tokens (colors, spacing, etc.)
├── services/                  # API and storage services
│   ├── api/                   # API client and endpoints
│   └── storage/               # Local storage wrapper
├── utils/                     # Utility functions
│   ├── errorHandler.ts        # Error handling
│   ├── logger.ts              # Logging service
│   └── validators.ts          # Input validation
├── constants/                 # Application constants
│   ├── env.ts                 # Environment configuration
│   └── routes.ts              # Route definitions
├── config/                    # Configuration files
│   └── routes.tsx             # React Router configuration
├── types/                     # TypeScript type definitions
├── App.tsx                    # Root component
└── main.tsx                   # Entry point
```

## 🎨 Design System

### Colors

- **Primary**: `#0891b2` (Cyan)
- **Secondary**: `#f59e0b` (Gold)
- **Success**: `#10b981` (Green)
- **Error**: `#ef4444` (Red)
- **Warning**: `#f59e0b` (Amber)

### Typography

- **Font Family**: System fonts (var(--font-family-base))
- **Headings**: Bold weights for hierarchy
- **Body**: Regular weight for readability

### Spacing

- Uses CSS custom properties for consistent spacing
- Base unit: 4px increments
- Responsive adjustments for mobile

## 🌐 Environment Variables

Create `.env.local` file:

```
# API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000

# Third-party Services
VITE_GOOGLE_MAPS_KEY=your_google_maps_key
VITE_WHATSAPP_NUMBER=+966501234567

# Features
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_ERROR_REPORTING=false
VITE_DEBUG_MODE=true

# Analytics
VITE_GTAG_ID=
```

### Environment Files

- `.env.development` - Development environment
- `.env.staging` - Staging environment
- `.env.production` - Production environment

## 🔐 Security

- **JWT Authentication** - Secure token-based auth
- **HTTPS Ready** - SSL/TLS support
- **CORS Configured** - API security
- **Environment Variables** - Sensitive data protection
- **Input Validation** - All user inputs validated
- **Error Boundary** - Prevents information leakage

## 📦 Build & Deployment

### Development Build

```
npm run dev
```

### Production Build

```
npm run build
```

### Docker Deployment

```
# Build Docker image
docker build -t saudi-real-estate .

# Run container
docker run -p 3000:3000 saudi-real-estate
```

### GitHub Actions CI/CD

Automatic deployment on push to `main` branch:

```
git push origin main
```

Workflow includes:

- Type checking
- Linting
- Building
- Deployment

## 🛠 Tech Stack

### Frontend

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **CSS Modules** - Scoped styling

### State Management

- **React Context** - Authentication and Theme
- **Custom Hooks** - Component logic

### Development Tools

- **ESLint** - Code quality
- **Prettier** - Code formatting
- **Vitest** - Unit testing
- **GitHub Actions** - CI/CD

## 📱 Responsive Design

- **Mobile** (< 480px) - Optimized for phones
- **Tablet** (480px - 768px) - Tablet layout
- **Desktop** (> 768px) - Full experience

## 🌍 Internationalization

- **Arabic (ar)** - Primary language
- **RTL Support** - Full right-to-left layout
- **English (en)** - Ready for expansion

## 🧪 Testing

```
# Run all tests
npm run test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test -- --watch
```

## 📊 Performance

- **Code Splitting** - Lazy loading for routes
- **Tree Shaking** - Unused code removal
- **Minification** - Production builds optimized
- **Caching** - Browser caching configured
- **Image Optimization** - Placeholder images ready for CDN

## 🐛 Troubleshooting

### Chrome Extension Errors

If you see "Cannot convert object to primitive value" error:

**Solution 1: Run in Incognito Mode**

```
# Ctrl+Shift+N (Windows/Linux) or Cmd+Shift+N (Mac)
# Navigate to http://localhost:5173
```

**Solution 2: Disable Chrome Extensions**

1. Open `chrome://extensions/`
2. Disable React DevTools and similar extensions
3. Refresh the page

### Build Errors

```
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port Already in Use

```
# Use different port
npm run dev -- --port 3000
```

## 📝 API Integration

### Base Configuration

```
// src/services/api/client.ts
const apiClient = new ApiClient();
apiClient.setToken('your-jwt-token');
```

### Example Usage

```
// Get properties
const response = await apiClient.getProperties({ page: 1, limit: 10 });

// Create property
const formData = new FormData();
formData.append('title', 'Property Title');
await apiClient.createProperty(formData);

// Submit contact form
await apiClient.submitContact({ name, email, message });
```

## 🔗 API Endpoints

| Method | Endpoint          | Description             |
| ------ | ----------------- | ----------------------- |
| POST   | `/auth/login`     | User login              |
| POST   | `/auth/register`  | User registration       |
| GET    | `/properties`     | List all properties     |
| GET    | `/properties/:id` | Get property details    |
| POST   | `/properties`     | Create property (admin) |
| PUT    | `/properties/:id` | Update property (admin) |
| DELETE | `/properties/:id` | Delete property (admin) |
| POST   | `/contact`        | Submit contact form     |
| POST   | `/campaigns`      | Create campaign (admin) |

## 📚 Documentation

- [Component Documentation](./docs/COMPONENTS.md)
- [API Integration Guide](./docs/API.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 👥 Team

Developed by Ahmed Waleed - Senior Full-Stack Software Engineer

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, email: support@example.com

## 🎯 Roadmap

### Phase 1 (Current) ✅

- [x] Core real estate platform
- [x] Property listings and search
- [x] User authentication
- [x] Admin dashboard
- [x] Responsive design

### Phase 2 (Planned)

- [ ] Advanced property comparison
- [ ] 360° virtual tours
- [ ] Live bidding system
- [ ] Real-time notifications
- [ ] Electronic payment gateway

### Phase 3 (Future)

- [ ] iOS and Android mobile apps
- [ ] QR code scanning
- [ ] Dark mode
- [ ] Comprehensive analytics
- [ ] CRM integration
- [ ] Social media integration

## 🙏 Acknowledgments

- Saudi Arabian market insights
- Modern React best practices
- Atomic Design methodology
- Open source community

---

**Last Updated:** November 6, 2025

**Version:** 1.0.0

**Status:** ✅ Production Ready
