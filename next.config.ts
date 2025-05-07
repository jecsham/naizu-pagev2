import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/wiki',
        destination: '/wiki/overview',
        permanent: true,
      },
      {
        source: '/rules',
        destination: '/wiki/rules',
        permanent: true,
      },
    ];
  },
  pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

export default withMDX(nextConfig);
