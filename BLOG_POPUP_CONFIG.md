# Blog Popup Configuration

## How to Update Your Blog URL

The blog popup is configured in `src/components/BlogPopup.jsx`.

To change the blog URL:

1. Open `src/components/BlogPopup.jsx`
2. Find this line (around line 7):
   ```javascript
   const BLOG_URL = 'https://your-blog-url.com'; // Replace with your actual blog URL
   ```
3. Replace `'https://your-blog-url.com'` with your actual blog URL
4. Save the file

## Example:
```javascript
const BLOG_URL = 'https://blog.mrwankhaled.com';
```

## How It Works

- The popup appears **1.5 seconds** after page load (first visit only)
- Three options:
  - **Yes** - Opens your blog in a new tab
  - **No** - Closes the popup (will show again on next visit)
  - **Don't Show Again** - Closes popup and saves preference to localStorage

## Testing

To test the popup again after clicking "Don't Show Again":
1. Open browser DevTools (F12)
2. Go to **Application** tab → **Local Storage**
3. Delete the `blog_popup_dismissed` entry
4. Refresh the page

## Customization

You can customize:
- **Delay** (line 20): Change `1500` (milliseconds)
- **Storage key** (line 5): Change `'blog_popup_dismissed'`
- **Text content** (lines 70-74): Update the heading and description

## Removing the Dashboard Route (Already Done)

✅ Dashboard button has been removed from the header
✅ Dashboard route still works if you navigate directly to `/dashboard`

If you want to completely block the dashboard route, you can:
1. Remove the route from `src/App.jsx`
2. Or add authentication checks
