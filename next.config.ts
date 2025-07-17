import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.littfair.kr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cnu.nhi.go.kr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Ensure all necessary environment variables are available to the client-side code.
  env: {
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'construction-safety-dashboard',
    NEXT_PUBLIC_APP_TITLE: 'Construction Safety Dashboard',
    NEXT_PUBLIC_APP_SUBTITLE: 'AI-Powered Construction Accident Analysis',
    NEXT_PUBLIC_FIRESTORE_COLLECTION: 'incidents',
    NEXT_PUBLIC_CNU_LOGO_URL: 'https://i.postimg.cc/d1x9rV9G/CSI-Logo-removebg.png',
    NEXT_PUBLIC_NINETYNINE_LOGO_URL: 'https://i.postimg.cc/x80mN6S0/NN01.png',
    // Manually include other Firebase config values needed for initialization.
    // Replace these with your actual new project's config values if they differ.
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'construction-safety-dashboard.firebaseapp.com',
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: 'construction-safety-dashboard.appspot.com',
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  },
};

export default nextConfig;
