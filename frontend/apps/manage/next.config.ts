import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ['@mhxy/shared', '@mhxy/api'],
};

export default nextConfig;
