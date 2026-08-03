/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "shikimori.io",
                pathname: "/system/**",
            },
            {
                protocol: "https",
                hostname: "shikimori.one",
                pathname: "/system/**",
            },
        ],
    },
};

export default nextConfig;