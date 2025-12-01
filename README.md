# 💰 Spend Elon Musk's Fortune

An interactive web application where you can spend Elon Musk's fortune on various items. Built with React, TypeScript, Vite, and Chakra UI.

## 🚀 Features

- **Interactive Shopping Experience**: Browse and purchase various items with Elon's billions
- **Real-time Budget Tracking**: See your remaining balance and total spent in real-time
- **Beautiful UI**: Modern, gradient-rich design with smooth animations
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Shopping Cart**: Add items to your cart and checkout
- **Smart Affordability Indicators**: Visual cues showing what you can and cannot afford

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Chakra UI v3** - Component library
- **Framer Motion** - Animations
- **React Query** - Data fetching (ready for backend integration)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd elon-musk-money
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables (optional):
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🏗️ Build for Production

Build the project:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🌐 Deployment

This project is ready to be deployed on various platforms:

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Deploy with default settings (Vite will be auto-detected)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

### Netlify

1. Push your code to GitHub
2. Import the project in [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

### GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json scripts:
```json
"deploy": "gh-pages -d dist"
```

3. Update vite.config.ts with base path:
```typescript
export default defineConfig({
  base: '/elon-musk-money/',
  plugins: [react()],
})
```

4. Deploy:
```bash
npm run build
npm run deploy
```

### Other Platforms

The `dist` folder contains the production-ready static files that can be deployed to:
- AWS S3 + CloudFront
- Azure Static Web Apps
- Firebase Hosting
- Cloudflare Pages

## 📁 Project Structure

```
elon-musk-money/
├── src/
│   ├── components/       # React components
│   │   ├── Header.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── Cart.tsx
│   ├── context/          # React context (CartContext)
│   ├── data/             # Product data
│   ├── types/            # TypeScript types
│   ├── theme.ts          # Chakra UI theme
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── public/               # Static assets
├── dist/                 # Production build (generated)
└── package.json
```

## 🎨 Customization

### Adding New Products

Edit `src/data/products.ts` to add more items:

```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  price: 1000000,
  category: 'Category',
  description: 'Product description',
  image: 'image-url'
}
```

### Changing Theme Colors

Modify `src/theme.ts` to customize the color scheme.

### Adjusting Starting Money

Update the `initialMoney` in `src/context/CartContext.tsx`.

## 🧪 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💡 Future Enhancements

- [ ] Backend integration with Supabase
- [ ] User authentication
- [ ] Save/share shopping sessions
- [ ] Leaderboards
- [ ] More product categories
- [ ] Currency conversion
- [ ] Social sharing features

---

**Note**: This is a fun educational project. All prices and Elon Musk's fortune are fictional representations for entertainment purposes.
