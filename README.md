# DBY | Fashion Store

A modern fashion e-commerce storefront built with React and Supabase. DBY features a Persian, right-to-left shopping experience with product discovery, authentication, cart management, wishlist, checkout, and order tracking.

## Features

- **Product Catalog:** Browse fashion products with categories, brands, product details, images, sizes, colors, and stock availability.
- **Product Discovery:** Explore featured and trending products, new arrivals, best sellers, and discounted items.
- **Search & Filtering:** Find products and narrow results based on relevant shopping criteria.
- **Authentication:** Sign up, sign in, sign out, and manage user sessions with Supabase Auth.
- **Shopping Cart:** Add products, update quantities, remove items, and apply promotional codes.
- **Guest Cart Support:** Maintain a cart before signing in and merge guest cart items with the authenticated user's cart.
- **Wishlist:** Save favorite products and manage your personal wishlist.
- **Checkout Flow:** Complete a multi-step checkout with shipping information, delivery selection, payment method selection, and order review.
- **Order Management:** Create orders, view order history, and track order statuses.
- **User Profile:** Manage personal information and access profile settings and order history.
- **Responsive Design:** Shop across desktop and mobile screen sizes.
- **Persian RTL Interface:** A right-to-left shopping experience designed for Persian-speaking users.

## Tech Stack

| Technology      | Purpose                                                   |
| --------------- | --------------------------------------------------------- |
| React 19        | UI development                                            |
| Vite            | Development server and production builds                  |
| React Router 7  | Client-side routing and nested routes                     |
| Redux Toolkit   | Application state management                              |
| RTK Query       | Server data fetching, caching, and mutations              |
| Supabase        | Backend services, PostgreSQL database, and authentication |
| Tailwind CSS 4  | Styling and responsive layouts                            |
| shadcn/ui       | UI component foundation                                   |
| React Hook Form | Form state management                                     |
| Zod             | Form validation and schemas                               |
| Lucide React    | Icons                                                     |
| Swiper          | Interactive carousels                                     |
| Sonner          | Toast notifications                                       |
| Oxlint          | Code linting                                              |

## Getting Started

### Prerequisites

- Node.js and npm
- A Supabase account and project
- Git

### 1. Clone the repository

```bash
git clone https://github.com/bardia-asd/fashion-store.git
cd fashion-store
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add your Supabase project credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Use the exact environment variable names expected by the Supabase client configuration in the source code. If the project uses a publishable key instead of an anonymous key, configure that variable accordingly.

**Security:** Never expose your Supabase service role key or other privileged secrets in frontend environment variables. Configure Row Level Security (RLS) policies to protect database access.

### 4. Configure Supabase

Set up the Supabase database, authentication, tables, relationships, and Row Level Security policies required by the application.

The data model supports the main e-commerce workflows, including:

- Products, categories, and brands
- Product images, colors, sizes, and stock variants
- User profiles
- Shopping carts and cart items
- Wishlist items
- Promotional codes
- Orders and order items
- Product reviews

Ensure that the database schema and access policies match the queries and mutations used by the application.

### 5. Start the development server

```bash
npm run dev
```

Vite will print the local development URL in your terminal, typically `http://localhost:5173`.

### 6. Create a production build

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

### 7. Run the linter

```bash
npm run lint
```

## Application Architecture

DBY separates client-side application state from server-backed data and authentication.

- **Routing:** React Router manages public storefront pages, protected routes, and nested profile and checkout pages.
- **Global State:** Redux Toolkit manages application state, including authentication and checkout data.
- **Server State:** RTK Query handles Supabase data requests, mutations, and cache updates.
- **Authentication:** Supabase Auth manages user identity and sessions.
- **Database:** Supabase PostgreSQL stores product catalog data, carts, profiles, wishlists, and orders.
- **Forms:** React Hook Form and Zod provide form handling and validation.
- **UI:** Reusable components and Tailwind CSS provide a consistent, responsive interface.

## Shopping & Checkout Flow

1. Browse products and open product details.
2. Add products to the cart or save them to the wishlist.
3. Review the cart and apply a promotional code when available.
4. Sign in when authentication is required.
5. Enter shipping information.
6. Select a delivery method and payment method.
7. Review the order and submit it.
8. View the order confirmation and access the order from the profile.

Guest cart data and authenticated cart data are handled separately, with a merge step after sign-in to preserve the shopping experience.

## Project Goals

This project is built to demonstrate practical frontend development skills through a realistic e-commerce application, including:

- Component-based UI architecture
- Client-side routing and protected routes
- Global state and server-state management
- REST-style data operations through Supabase
- Authentication and database access control
- Form validation and multi-step workflows
- Relational data modeling
- Responsive design and reusable UI components
- Managing asynchronous operations and cache invalidation

## Future Improvements

Potential areas for further development include:

- Payment gateway integration
- Automated testing for cart, authentication, and checkout workflows
- Improved accessibility and keyboard navigation
- Performance optimization and image loading improvements
- Enhanced filtering, sorting, and product discovery
- Deployment documentation and a live demo

## License

No license has been specified for this repository. Unless a license is added, the project should not be assumed to be open source or freely reusable.

---

**Built with React, Redux Toolkit, and Supabase.**
