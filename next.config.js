module.exports = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    domains: ["m.media-amazon.com", "ia.media-imdb.com"],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
