# Specification

## Summary
**Goal:** Build "Sole Street," a full-featured shoes shop website with product browsing, a shopping cart, and an about/contact page, backed by a Motoko data store.

**Planned changes:**
- Homepage with a full-width hero section (tagline, CTA button) and a featured products grid (4–6 product cards)
- Product listing page with category tabs (Men, Women, Kids, Sport) and filter panel (size, color, price range) that dynamically updates the product grid
- Product detail page with image gallery/carousel, size selector, color selector, and Add to Cart button
- Shopping cart as a drawer/page with item list, quantity controls, subtotal per item, and running order total; cart icon in the nav shows item count badge; cart persists across navigation within the session
- About/Contact page with brand story section, contact form (name, email, message with basic validation), and store info (address, phone, hours)
- Motoko backend actor in `backend/main.mo` with stable variables storing shoe products (id, name, description, category, price, sizes, colors, image URLs); query methods to list all and get by ID; update methods to add/remove; at least 8 seed products across multiple categories
- Bold modern visual theme: off-white, charcoal, warm caramel accent palette; strong sans-serif headings; clean card layouts; smooth hover/transition states; responsive across mobile, tablet, and desktop

**User-visible outcome:** Visitors can browse shoes by category and filters, view product details, add items to a cart with quantity management, and reach the brand's contact/about page — all within a polished, premium-feeling storefront.
