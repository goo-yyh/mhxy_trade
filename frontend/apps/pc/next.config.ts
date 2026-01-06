import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ['@mhxy/shared', '@mhxy/api', '@mhxy/ui'],
};

export default nextConfig;
