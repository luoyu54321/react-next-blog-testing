const debug = process.env.NODE_ENV !== "production";

module.exports = {
  basePath: '/react-next-blog-with-tracking-test',
  assetPrefix: !debug ? '/react-next-blog-with-tracking-test' : '',
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  }
}