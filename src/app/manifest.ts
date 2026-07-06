import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Carlos Chnouda — Full Stack Engineer",
    short_name: "Carlos Chnouda",
    description:
      "Full Stack Engineer building scalable web & mobile apps, CMS systems, and e-commerce platforms.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d0e26",
    theme_color: "#0d0e26",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "16x16 32x32",
        type: "image/x-icon",
      },
    ],
  };
}
