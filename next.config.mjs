/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ESLint during `next build` can stall under OneDrive/long paths on Windows; use `npm run lint` separately.
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
