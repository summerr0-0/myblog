/** @type {import('next').NextConfig} */
const nextConfig = {
    // Next.js 정적 페이지 빌드를 위한 설정
    output: 'export',
    images: {
        // 정적 이미지 최적화를 위한 기본 설정
        formats: ['image/avif', 'image/webp'],
        dangerouslyAllowSVG: true, // SVG 이미지를 허용
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    exportPathMap: async function (defaultPathMap) {
        // 기본 경로에서 /og 제거
        delete defaultPathMap['/og'];
        return defaultPathMap;
    },
    reactStrictMode: true, // React의 엄격한 모드 활성화
    swcMinify: true, // SWC 기반 코드 최소화 활성화
};

module.exports = nextConfig;