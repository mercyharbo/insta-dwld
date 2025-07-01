# InstaDWL - Instagram Photo & Video Downloader

InstaDWL is a modern web app built with Next.js that allows you to download Instagram photos, videos, reels, and stories easily and securely. Paste any Instagram post, reel, or story URL and instantly get high-quality media files for download.

## Features

- Download Instagram photos, videos, reels, and stories
- Supports both single and multiple media posts (albums)
- Fast, secure, and free
- Beautiful, responsive UI
- No watermarks
- Direct download to your device (no new tab)
- Video preview with thumbnail and player
- SEO optimized

## How It Works

1. Paste an Instagram URL into the input box.
2. Click the **Download** button.
3. The app fetches media info using a RapidAPI-powered backend.
4. All images and videos are displayed in a grid with preview and download buttons.
5. Click the download button to save the media directly to your device.

## Tech Stack

- [Next.js 14+](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [RapidAPI Instagram Downloader](https://rapidapi.com/)

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/insta-dwl.git
   cd insta-dwl
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or yarn install
   ```
3. **Set up environment variables:**
   - Create a `.env.local` file in the root directory.
   - Add your RapidAPI credentials:
     ```env
     NEXT_PUBLIC_API_URL=your_rapidapi_endpoint
     NEXT_PUBLIC_API_KEY=your_rapidapi_key
     NEXT_PUBLIC_HOSTNAME=your_rapidapi_hostname
     ```
4. **Run the development server:**
   ```bash
   npm run dev
   # or yarn dev
   ```
5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Deployment

Deploy easily on [Vercel](https://vercel.com/) or any platform that supports Next.js.

## Folder Structure

- `src/app/` - Main app directory
  - `page.js` - Main page logic and UI
  - `layout.js` - App layout and SEO
  - `api/proxy/route.js` - Proxy route for secure media downloads
  - `components/ui/` - UI components (Badge, Button, Card, Input)
  - `lib/utils.js` - Utility functions
- `public/` - Static assets (including `seo-image.png` for SEO)

## Security & Limitations

- All media is proxied through a secure API route to avoid CORS and CDN hostname issues.
- This project is for educational/personal use. Respect Instagram's terms of service.

## Credits

- UI inspired by modern design systems.
- Built by [Code With Mercy](https://github.com/your-profile).

---

Feel free to contribute or open issues for suggestions and improvements!
