/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                port: '',
                pathname: '/ByMykel/**',
            },
            {
                protocol: 'https',
                hostname: 'flagsapi.com',
                port: '',
                pathname: '/**',
            },
            // {
            //     protocol: 'https',
            //     hostname: 'image.gametracker.com',
            //     port: '',
            //     pathname: '/images/maps/**',
            // },
        ],
    },
};

export default nextConfig;
