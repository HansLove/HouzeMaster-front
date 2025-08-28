# Taloon Studio - Premium Real Estate Website

A modern, high-performance real estate website built with Next.js 14, TypeScript, and Tailwind CSS. This project showcases luxury properties in Mexico's most beautiful destinations with advanced caching, animations, and a responsive design.

## 🚀 Features

### Performance & Caching
- **Zustand State Management**: Efficient client-side state management with persistent caching
- **Smart Property Caching**: Only 10 properties cached for ultra-fast loading
- **Cache Expiry Management**: 5-minute cache validity with automatic refresh
- **Optimized Image Loading**: Progressive image loading with fallbacks
- **Lazy Loading**: Components load only when needed

### Modern UI/UX
- **Framer Motion Animations**: Smooth, professional animations throughout
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Glass Morphism**: Modern backdrop blur effects and transparency
- **Gradient Design**: Beautiful color gradients and visual hierarchy
- **Interactive Elements**: Hover effects, micro-interactions, and smooth transitions

### Real Estate Features
- **Advanced Property Search**: Multi-criteria filtering (price, location, type, etc.)
- **Property Gallery**: High-quality image displays with thumbnails
- **Featured Properties**: Priority highlighting for premium listings
- **Contact Forms**: Integrated lead capture and agent communication
- **Property Details**: Comprehensive property information pages

### Technical Excellence
- **TypeScript**: Full type safety and better development experience
- **Next.js 14**: Latest React framework with App Router
- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **Lucide Icons**: Modern, consistent iconography
- **SEO Optimized**: Meta tags, structured data, and performance metrics

## 🏗️ Architecture

### State Management
```
src/stores/
├── propertyStore.ts          # Zustand store for property caching
└── cache management          # 10-property limit with expiry
```

### Services Layer
```
src/services/
├── enhancedPropertyService.ts # Enhanced property service with caching
└── propertyService.ts        # Legacy service (maintained for compatibility)
```

### Hooks & Data
```
src/hooks/
├── useEnhancedProperties.ts  # Main hook for property management
└── useFilteredProperties.ts  # Filtered properties hook
```

### Components
```
src/app/components/
├── ModernNavigation.tsx      # Responsive navigation with animations
├── ModernHero.tsx           # Hero section with search functionality
├── ModernPropertyCard.tsx   # Property display cards
├── ModernListings.tsx       # Property listings with cache status
├── ModernPropertyFilters.tsx # Advanced filtering system
├── ModernFooter.tsx         # Comprehensive footer with links
└── [legacy components]      # Original components maintained
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd celeste
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📱 Pages & Routes

- **Home** (`/`): Hero section, featured properties, company overview
- **Listings** (`/listings`): All properties with advanced filtering
- **Property Details** (`/details/[slug]`): Individual property information
- **About** (`/about`): Company story, team, and values
- **Contact** (`/contact`): Contact forms and company information

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb) - Trust and professionalism
- **Secondary**: Cyan (#0891b2) - Modern and fresh
- **Accent**: Purple (#7c3aed) - Luxury and sophistication
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Headings**: Geist Sans - Modern and readable
- **Body**: Geist Sans - Clean and professional
- **Mono**: Geist Mono - For technical content

### Components
- **Cards**: Rounded corners (2xl), subtle shadows, hover effects
- **Buttons**: Gradient backgrounds, rounded corners, smooth transitions
- **Forms**: Clean inputs with focus states and validation
- **Navigation**: Transparent to solid background on scroll

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_CSV_URL=your_csv_url_here
NEXT_PUBLIC_SITE_URL=your_site_url_here
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Extended color palette
- Custom animations
- Responsive breakpoints
- Component utilities

### Cache Configuration
- **Cache Limit**: 10 properties maximum
- **Cache Expiry**: 5 minutes
- **Persistence**: Local storage with Zustand persist middleware

## 📊 Performance Features

### Caching Strategy
1. **Initial Load**: First 10 properties cached immediately
2. **Smart Refresh**: Cache expires after 5 minutes
3. **Background Updates**: Non-blocking property refresh
4. **Fallback Support**: Expired cache used if API fails

### Image Optimization
- **Next.js Image Component**: Automatic optimization
- **Progressive Loading**: Blur placeholders and smooth transitions
- **Responsive Images**: Multiple sizes for different devices
- **Lazy Loading**: Images load as they enter viewport

### Bundle Optimization
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Unused code elimination
- **Dynamic Imports**: Components loaded on demand

## 🧪 Development

### Code Quality
- **ESLint**: Code linting and formatting
- **TypeScript**: Strict type checking
- **Prettier**: Code formatting (if configured)

### Testing
```bash
npm run lint        # Run ESLint
npm run type-check  # TypeScript type checking
```

### File Structure
```
src/
├── app/                    # Next.js App Router
│   ├── components/         # Reusable components
│   ├── [routes]/          # Page routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── hooks/                  # Custom React hooks
├── services/               # API and business logic
├── stores/                 # Zustand state stores
└── types/                  # TypeScript type definitions
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Static site generation
- **AWS Amplify**: Full-stack deployment
- **Docker**: Containerized deployment

## 📈 SEO & Analytics

### SEO Features
- **Meta Tags**: Comprehensive meta information
- **Open Graph**: Social media optimization
- **Structured Data**: Property schema markup
- **Sitemap**: Automatic sitemap generation

### Performance Metrics
- **Core Web Vitals**: Optimized for Google metrics
- **Lighthouse Score**: Target 90+ performance
- **Mobile First**: Responsive design priority

## 🔒 Security

### Best Practices
- **Input Validation**: Form data sanitization
- **XSS Protection**: Content Security Policy
- **HTTPS Only**: Secure connections required
- **Rate Limiting**: API request throttling

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Follow linting rules
- **Components**: Functional components with hooks
- **Styling**: Tailwind CSS utilities

## 📄 License

This project is proprietary software developed for Taloon Studio. All rights reserved.

## 🆘 Support

For technical support or questions:
- **Email**: dev@taloonstudio.com
- **Documentation**: [Internal Wiki]
- **Issues**: GitHub Issues (if public)

---

**Built with ❤️ by Taloon Studio Development Team**

*Last updated: December 2024*
