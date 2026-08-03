import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "shikimori.io",
            },
            {
                protocol: "https",
                hostname: "shikimori.one",
            },
        ],
    },
};

export default nextConfig;
