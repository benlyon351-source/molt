import { createRequire } from "module"
const require = createRequire(import.meta.url)

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    // Deduplicate Three.js — both `shaders` and `@paper-design/shaders-react`
    // bundle their own copy, causing the "Multiple instances" warning.
    config.resolve.alias = {
      ...config.resolve.alias,
      three: require.resolve("three"),
    }
    return config
  },
}

export default nextConfig
