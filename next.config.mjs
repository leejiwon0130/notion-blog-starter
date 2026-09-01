/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 노션에 올린 이미지는 주소가 1시간 뒤 만료된다. (README의 ⚠️ 참고)
    remotePatterns: [
      { protocol: 'https', hostname: '**.amazonaws.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**' },
    ],
  },
};
export default nextConfig;
