# SEO Quick Reference Guide

## Update Sitemap When Adding New Projects

When you add a new project, update `public/sitemap.xml`:

```xml
<url>
  <loc>https://mrwankhaled.vercel.app/projects/YOUR-PROJECT-SLUG</loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.6</priority>
</url>
```

## Meta Tags Per Page (For React Router)

If you want different meta tags for different pages, use `react-helmet` or similar:

```bash
npm install react-helmet-async
```

Then in each page component:

```jsx
import { Helmet } from 'react-helmet-async';

function ProjectPage() {
  return (
    <>
      <Helmet>
        <title>Project Name - Marwan Khaled</title>
        <meta name="description" content="Specific project description" />
        <meta property="og:title" content="Project Name - Marwan Khaled" />
        <meta property="og:description" content="Specific project description" />
        <link rel="canonical" href="https://mrwankhaled.vercel.app/projects/project-name" />
      </Helmet>
      {/* Page content */}
    </>
  );
}
```

## Image Optimization Best Practices

1. **Use WebP format** for modern browsers
2. **Recommended sizes:**
   - OG Image: 1200x630px
   - Favicon: 512x512px (will scale down)
   - Project thumbnails: 800x600px
3. **Always include alt text**
4. **Use lazy loading:** `loading="lazy"`

## SEO-Friendly URLs

✅ Good:
- `/projects/vbstem-education-platform`
- `/projects/aero-portfolio-template`

❌ Avoid:
- `/projects/123`
- `/project?id=vbstem`

## Heading Structure

Each page should have:
- **One `<h1>`** - Main page title
- **Multiple `<h2>`** - Section headings
- **`<h3>` and below** - Sub-sections

Example:
```html
<h1>Marwan Khaled - Full Stack Developer</h1>
  <h2>Featured Projects</h2>
    <h3>VBstem Education Platform</h3>
  <h2>Skills & Technologies</h2>
    <h3>Frontend Development</h3>
```

## Link Best Practices

✅ Good:
```html
<a href="/projects">View my web development projects</a>
```

❌ Avoid:
```html
<a href="/projects">Click here</a>
```

## Performance Checklist

- [ ] Images optimized and compressed
- [ ] Fonts preloaded
- [ ] Code split by route
- [ ] Lazy load images below the fold
- [ ] Minimize CSS/JS
- [ ] Use CDN for assets

## Monthly SEO Tasks

1. Check Google Search Console for errors
2. Update sitemap lastmod dates if content changed
3. Review and update meta descriptions
4. Check for broken links
5. Monitor page speed with Lighthouse
6. Review analytics for popular content

## Tools Bookmarks

- Google Search Console: https://search.google.com/search-console
- PageSpeed Insights: https://pagespeed.web.dev/
- Rich Results Test: https://search.google.com/test/rich-results
- Facebook Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
