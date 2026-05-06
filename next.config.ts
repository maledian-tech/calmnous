import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

// Payload hooks Next HMR and reloads when server components change, which can race with Next 16
// Turbopack RSC refresh and show client-side "Failed to fetch". Prefer off in dev unless you
// explicitly set DISABLE_PAYLOAD_HMR=false in the environment.
if (
  process.env.NODE_ENV !== "production" &&
  process.env.DISABLE_PAYLOAD_HMR === undefined
) {
  process.env.DISABLE_PAYLOAD_HMR = "true";
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default withPayload(nextConfig);
