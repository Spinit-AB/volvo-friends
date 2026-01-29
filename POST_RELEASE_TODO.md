# Post-Release TODO List

## SEO & Social Media
- [ ] Generate sitemap.xml (can use next-sitemap package or Next.js app router generateSitemaps)
- [ ] Create Open Graph images for social media sharing
  - Default OG image for the site
  - Dynamic OG images for blog posts
- [ ] Add Twitter Card metadata to layout
- [ ] Add app icons (icon.png, apple-touch-icon.png)
- [ ] Consider adding JSON-LD structured data for better SEO

## Next.js Configuration
- [ ] Add image optimization config for Sanity CDN
  - Configure remotePatterns for cdn.sanity.io
  - Example:
    ```typescript
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.sanity.io',
        },
      ],
    }
    ```
- [ ] Review and optimize build settings

## Documentation
- [ ] Update README.md with:
  - Project description
  - Prerequisites
  - Setup instructions
  - Environment variables
  - Sanity Studio setup
  - Development workflow
  - Deployment guide
  - Project structure
- [ ] Add CONTRIBUTING.md if open source
- [ ] Consider adding architecture documentation

## Optional Enhancements
- [ ] Add analytics (Google Analytics, Plausible, etc.)
- [ ] Add error monitoring (Sentry, etc.)
- [ ] Add proper 404 page with Volvo Friends branding
- [ ] Add loading states for better UX
- [ ] Add error boundaries
- [ ] Consider adding a changelog

## Already Fixed
- [x] Netlify Forms integration
- [x] Remove console.log statements
- [x] Update root metadata with proper title and description
- [x] Create .env.example file
- [x] Create robots.txt
