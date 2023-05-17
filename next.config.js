module.exports = {
    // Target must be experimental-serverless-trace
    // Your build time will be longer with this option
    target: "experimental-serverless-trace",
    env: {
      NEXT_PUBLIC_WP_API_URL: process.env.NEXT_PUBLIC_WP_API_URL,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      WP_JWT_AUTH_SECRET_KEY: process.env.WP_JWT_AUTH_SECRET_KEY,
      NEXTAUTH_SECRET_KEY: process.env.NEXTAUTH_SECRET_KEY,
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    }
  };

