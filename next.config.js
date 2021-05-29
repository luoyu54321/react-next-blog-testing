const debug = process.env.NODE_ENV !== "production";

module.exports = {
  basePath: 'https://blog.kkluo.com/',
  assetPrefix: !debug ? 'https://blog.kkluo.com/' : '',
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