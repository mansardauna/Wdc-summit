import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "World Disaster Center · Youth Leader Summit 2027",
    short_name: "WDC Summit",
    description: "The first global edition of the World Disaster Center Youth Leader Summit in Cape Town, South Africa (10–14 October 2027).",
    start_url: "/",
    display: "standalone",
    background_color: "#061322",
    theme_color: "#FCE46D",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon",
      },
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
