import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
    // Next.js 16 rejects upstreams whose DNS resolves to non-unicast ranges.
    // Some networks return NAT64 (RFC 6052, 64:ff9b::/96) for IPv4-only hosts,
    // which ipaddr.js flags as non-unicast and the optimizer treats as private.
    // Sanity / Unsplash / picsum are public CDNs, so allow the optimizer to
    // fetch them regardless of the resolved address family.
    dangerouslyAllowLocalIP: true,
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@fortawesome/react-fontawesome",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/free-brands-svg-icons",
    ],
  },
  async redirects() {
    return [
      {
        source: "/pdfnest/privacy",
        destination: "/privacy/pdfnest",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
