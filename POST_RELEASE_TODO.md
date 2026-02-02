# Post-Release TODO List

## SEO & Social Media
- [x] Generate sitemap.xml (can use next-sitemap package or Next.js app router generateSitemaps)
- [x] Create Open Graph images for social media sharing
  - [x] Default OG image for the site
  - [x] Dynamic OG images for blog posts (deferred - using default OG image for now)
- [x] Add Twitter Card metadata to layout
- [x] Add app icons (icon.png, apple-touch-icon.png)
- [x] Consider adding JSON-LD structured data for better SEO

## Next.js Configuration
- [x] Add image optimization config for Sanity CDN
  - Configure remotePatterns for cdn.sanity.io
- [x] Review and optimize build settings

## Documentation
- [x] Update README.md (points to Teams for detailed docs)
- [x] Internal documentation maintained in Teams (not open source)

## Optional Enhancements
- [ ] Add analytics (Google Analytics, Plausible, etc.)
- [ ] Add error monitoring (Sentry, etc.)
- [x] Add proper 404 page with Volvo Friends branding
- [ ] Add loading states for better UX
- [ ] Add error boundaries
- [ ] Consider adding a changelog

## Already Fixed
- [x] Netlify Forms integration
- [x] Remove console.log statements
- [x] Update root metadata with proper title and description
- [x] Create .env.example file
- [x] Create robots.txt
