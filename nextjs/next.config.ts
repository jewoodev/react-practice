import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    experimental: {
        typedRoutes: true,
    },
    eslint: {
        dirs: ['app'],
    },
}

export default nextConfig
