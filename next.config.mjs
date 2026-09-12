/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.137.1"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ycghmlieuhgjwsbdrpkh.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
