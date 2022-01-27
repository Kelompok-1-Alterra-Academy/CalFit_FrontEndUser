module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "unsplash.com",
      "img-s-msn-com.akamaized.net",
      "lh3.googleusercontent.com",
      "cdn.pixabay.com",
      "res.cloudinary.com",
    ],
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};
