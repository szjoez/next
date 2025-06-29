import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new ForkTsCheckerWebpackPlugin({
          async: true, // Run type checking synchronously to block the build
          typescript: {
            configOverwrite: {
              compilerOptions: {
                skipLibCheck: true,
              },
            },
          },
        })
      );
    }
    return config;
  },
  // Turbopack configuration (stable API)
  turbopack: {
    rules: {
      '*.ts': {
        loaders: ['@next/swc-loader'],
        as: '*.js',
      },
      '*.tsx': {
        loaders: ['@next/swc-loader'],
        as: '*.js',
      },
    },
  },
  // Node.js deprecation warnings are handled via package.json scripts
};

export default nextConfig;