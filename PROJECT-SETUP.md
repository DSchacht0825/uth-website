# UTH Candles - E-Commerce & Booking Platform

Modern, fast, and scalable e-commerce site built with Next.js, React, TypeScript, and TailwindCSS.

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS
- **Zustand** - State management (cart)
- **React Hot Toast** - Notifications

### Backend & Services
- **Netlify** - Hosting & deployment
- **Netlify Functions** - Serverless API
- **Stripe** - Payment processing
- **Supabase** - Database for bookings/reservations
- **Git-based Content** - Product catalog in JSON

## Project Structure

```
uth-candles-new/
├── data/                    # Content management (git-based)
│   ├── products.json       # Product catalog
│   └── site-config.json    # Site settings, shipping, tax
│
├── public/
│   └── images/            # Optimized images (109 files, 13MB)
│
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── api/          # API routes (Netlify Functions)
│   │   ├── products/     # Product pages
│   │   ├── cart/         # Shopping cart
│   │   └── checkout/     # Checkout flow
│   │
│   ├── components/       # React components
│   │   ├── product/     # Product card, gallery, etc.
│   │   ├── cart/        # Cart drawer, cart item
│   │   ├── layout/      # Header, footer, navigation
│   │   └── booking/     # Booking form, calendar
│   │
│   ├── lib/             # Utilities & helpers
│   │   ├── stripe.ts    # Stripe client setup
│   │   ├── supabase.ts  # Supabase client
│   │   └── products.ts  # Product data helpers
│   │
│   ├── store/           # State management
│   │   └── cart.ts      # Zustand cart store
│   │
│   └── types/           # TypeScript types
│       └── index.ts     # Product, Cart, Booking types
│
└── .env.local           # Environment variables (create this!)
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create `.env.local` file:

```bash
cp .env.local.example .env.local
```

Then fill in your API keys:

#### Get Stripe Keys
1. Go to https://dashboard.stripe.com/apikeys
2. Copy your **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Copy your **Secret key** → `STRIPE_SECRET_KEY`

#### Get Supabase Keys
1. Create a project at https://supabase.com
2. Go to Settings → API
3. Copy **URL** → `NEXT_PUBLIC_SUPABASE_URL`
4. Copy **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Set Up Supabase Database

Run this SQL in your Supabase SQL Editor to create the bookings table:

```sql
-- Create bookings table
create table bookings (
  id uuid default uuid_generate_v4() primary key,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  slot_id text not null,
  number_of_people integer not null,
  notes text,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table bookings enable row level security;

-- Create policy to allow anyone to insert bookings
create policy "Anyone can create bookings"
  on bookings for insert
  with check (true);

-- Create policy to allow reading bookings
create policy "Anyone can view bookings"
  on bookings for select
  using (true);
```

## What's Built So Far

### ✅ Completed

1. **Project Setup**
   - Next.js 15 with TypeScript
   - TailwindCSS configuration
   - ESLint configuration

2. **Content Management**
   - Product catalog (3 candles: Lily of the Valley, Gardenia, Patchouli)
   - Site configuration (shipping, tax, contact info)
   - Git-based content (easy to edit, version controlled)

3. **Images**
   - 109 optimized images (13MB total)
   - WebP format for large product images (95% size reduction!)
   - Responsive image sizes
   - All images in `/public/images/`

4. **Type Safety**
   - TypeScript types for Products, Cart, Bookings, Orders
   - Full type coverage

5. **State Management**
   - Zustand cart store with persistence
   - Add/remove items, update quantities
   - Calculate subtotal, shipping, tax, total

6. **Utilities**
   - Stripe client setup
   - Supabase client setup
   - Product data helpers (get all, get by slug, calculate totals)

7. **Dependencies**
   - ✅ Stripe & Stripe.js
   - ✅ Supabase client
   - ✅ Zustand (state management)
   - ✅ React Hot Toast (notifications)

### 🚧 Next Steps (What You Need to Build)

#### Phase 1: Core UI Components
1. **Layout Components**
   - Header with logo and cart icon
   - Footer with contact info and links
   - Navigation menu

2. **Product Components**
   - ProductCard component
   - ProductGallery component
   - AddToCart button

3. **Cart Components**
   - CartDrawer (slide-out cart)
   - CartItem component
   - Cart summary with totals

#### Phase 2: Pages
1. **Homepage** (`/`)
   - Hero section
   - Featured products grid
   - About section

2. **Products Page** (`/products`)
   - Product grid
   - Filter by category/scent

3. **Product Detail Page** (`/products/[slug]`)
   - Image gallery
   - Product details
   - Add to cart functionality
   - Related products

4. **Cart Page** (`/cart`)
   - Full cart view
   - Update quantities
   - Checkout button

5. **Checkout Page** (`/checkout`)
   - Shipping address form
   - Order summary
   - Stripe payment integration

#### Phase 3: API Routes (Netlify Functions)
1. **Stripe Checkout** (`/api/checkout`)
   - Create Stripe Checkout session
   - Handle line items
   - Set success/cancel URLs

2. **Stripe Webhook** (`/api/webhook`)
   - Handle successful payments
   - Update order status
   - Send confirmation email (optional)

3. **Bookings API** (`/api/booking`)
   - Create booking in Supabase
   - Validate availability
   - Send confirmation

4. **Get Available Slots** (`/api/slots`)
   - Query available booking slots
   - Return available times

#### Phase 4: Booking System
1. **Booking Page** (`/booking`)
   - Calendar component
   - Time slot selection
   - Booking form
   - Confirmation

2. **Supabase Integration**
   - Store bookings
   - Check availability
   - Update slot capacity

#### Phase 5: Deployment
1. **Netlify Setup**
   - Connect GitHub repo
   - Configure build settings
   - Set environment variables
   - Set up custom domain

2. **Stripe Production**
   - Switch to live keys
   - Set up webhook endpoints
   - Test live payments

3. **SEO & Performance**
   - Meta tags
   - Open Graph images
   - Sitemap
   - Analytics

## Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## Deployment to Netlify

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial UTH Candles setup"
git remote add origin your-repo-url
git push -u origin main
```

### 2. Deploy on Netlify

1. Go to [Netlify](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repo
4. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
5. Add environment variables (same as `.env.local`)
6. Deploy!

### 3. Configure Netlify Functions

Netlify will automatically detect Next.js API routes and deploy them as serverless functions.

## Managing Content

### Adding Products

Edit `data/products.json`:

```json
{
  "id": "new-candle",
  "name": "New Candle",
  "slug": "new-candle",
  "description": "Description here",
  "price": 28.00,
  "images": {
    "main": "/images/candle-main.webp",
    "gallery": ["/images/candle-1.webp"],
    "thumbnail": "/images/candle-thumb.png"
  },
  "category": "candles",
  "scent": "Floral",
  "featured": false,
  "inStock": true,
  "inventory": 50
}
```

Commit and push - Netlify will automatically rebuild!

### Updating Site Config

Edit `data/site-config.json` to change:
- Shipping rates
- Tax rate
- Contact information
- Social media links

## Testing Stripe

Use Stripe test card numbers:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Any future expiry date, any CVC

## Support & Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Netlify Docs](https://docs.netlify.com)

## Current Product Catalog

1. **Lily of the Valley** - Fresh & Clean Floral - $28
2. **Gardenia** - Rich & Creamy Floral - $28
3. **Patchouli** - Earthy, Musky & Warm - $28

All candles:
- 8 oz soy wax
- 40-50 hour burn time
- Cotton wick
- Premium fragrance oils

---

**Built with ❤️ for UTH Candles - Under The Heavens Collection**
